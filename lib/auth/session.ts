import { createHash, randomBytes } from "node:crypto";
import { sessions, users } from "../db/schema";
import { db } from "../db";
import { cookies } from "next/headers";
import { cache } from "react";
import { and, eq, gt } from "drizzle-orm";

/**
 * Database-backed session management.
 *
 * Design overview:
 * - The browser holds a random opaque token in an httpOnly cookie.
 * - The database stores only a SHA-256 hash of that token, so a leaked
 *   database (backup, SQL injection, etc.) doesn't expose usable session
 *   tokens.
 * - Sessions are validated on every request by looking up the hash and
 *   checking expiry, which also lets us revoke sessions server-side.
 */

const COOKIE = "session";
const MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days

// Fast, unsalted hash is fine here: the token is 256 bits of random data,
// so it can't be brute-forced or looked up in a rainbow table the way a
const sha256 = (value: string) =>
  createHash("sha256").update(value).digest("hex");

/**
 * Creates a new session for the given user and sets the session cookie.
 * Call this after the user has been successfully authenticated.
 */
export async function createSession(userId: string) {

  const token = randomBytes(32).toString("base64url");

  // Persist only the hash. The raw token exists solely in the cookie.
  await db.insert(sessions).values({
    tokenHash: sha256(token),
    userId,
    expiresAt: new Date(Date.now() + MAX_AGE_S * 1000),
  });

  (await cookies()).set(COOKIE, token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S, // Keep cookie lifetime in sync with DB expiry
  });
}

/**
 * Returns the currently logged-in user, or null if there's no valid session.
 */
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;

  // No cookie means the visitor isn't logged in.
  if (!token) return null;

  // Hash the incoming token and look it up, joining to the user in one query.
  // Only selecting the fields we need avoids leaking extra columns to callers.
  const [row] = await db
    .select({ id: users.id, name: users.name, phone: users.phone })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.tokenHash, sha256(token)),
        gt(sessions.expiresAt, new Date()), // Ignore expired sessions
      ),
    )
    .limit(1);

  // Unknown, expired, or revoked tokens all resolve to "not logged in".
  return row ?? null;
});

/**
 * Logs the user out by deleting the session from the database and
 * clearing the cookie.
 */
export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;

  // Delete server-side first so the token is invalid even if the
  // cookie somehow survives on the client.
  if (token) {
    await db.delete(sessions).where(eq(sessions.tokenHash, sha256(token)));
  }

  jar.delete(COOKIE);
}