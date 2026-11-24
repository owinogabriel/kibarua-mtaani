"use server";

import {
  AuthState,
  loginSchema,
  signupSchema,
} from "@/lib/auth/authValidation";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { safeNext } from "@/lib/auth/redirect";
import { createSession, destroySession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { loginAttempts, users } from "@/lib/db/schema";
import { and, count, eq, gt } from "drizzle-orm";
import { redirect } from "next/navigation";

// string formdata values
const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

// Brute-force protection: lock a phone number after MAX_FAILED failed
// logins within the last WINDOW_MS (5 failures in 15 minutes).
const MAX_FAILED = 5;
const WINDOW_MS = 15 * 60 * 1000;

// Used so a wrong phone number takes as long as wrong password.
// Without this, "no such user" would return noticeably faster than
let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"));

/**
 * Flattens Zod issues into a { field: message } map for the form.
 * Only the first error per field is kept, so each input shows one message.
 */
function collectErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const field = String(issue.path[0]);
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

/**
 * Creates a new account, starts a session, and redirects to the dashboard.
 * Designed for use with useActionState: returns an AuthState on failure
 * and never returns on success (redirect throws).
 */
export async function signupAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  // The password is deliberately excluded so it is never sent back to the client.
  const values = {
    name: str(formData.get("name")),
    phone: str(formData.get("phone")),
  };

  // Honeypot: "fax" is hidden from real users, so only bots fill it in.
  // Return a generic error so bots get no hint about why they failed.
  if (str(formData.get("fax"))) {
    return { status: "error", errors: { form: "saveFailed" }, values };
  }

  const parsed = signupSchema.safeParse({
    ...values,
    password: str(formData.get("password")),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: collectErrors(parsed.error.issues),
      values,
    };
  }

  const d = parsed.data;

  try {
    const passwordHash = await hashPassword(d.password);

    // Let the unique index on phone settle duplicates atomically. A
    // "check then insert" would race when two signups arrive at once.
    // If the phone exists, nothing is inserted and .returning() is empty.
    const inserted = await db
      .insert(users)
      .values({ name: d.name, phone: d.phone, passwordHash })
      .onConflictDoNothing({ target: users.phone })
      .returning({ id: users.id });

    if (inserted.length === 0) {
      return { status: "error", errors: { phone: "phoneTaken" }, values };
    }

    // Log the user in immediately after signup.
    await createSession(inserted[0].id);
  } catch (error) {
    return { status: "error", errors: { form: "saveFailed" }, values };
  }

  // redirect() works by throwing, so it must stay outside the try/catch
  redirect(safeNext(str(formData.get("next"))));
}

/**
 * Authenticates a user by phone + password, starts a session, and
 * redirects to the dashboard. Includes brute-force lockout and
 * timing-attack mitigation.
 */
export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  // No name on login; the empty string just satisfies the AuthState shape.
  const values = { name: "", phone: str(formData.get("phone")) };

  // Honeypot check (see signupAction).
  if (str(formData.get("fax"))) {
    return { status: "error", errors: { form: "saveFailed" }, values };
  }

  const parsed = loginSchema.safeParse({
    phone: values.phone,
    password: str(formData.get("password")),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: collectErrors(parsed.error.issues),
      values,
    };
  }

  const d = parsed.data;

  try {
    // Lockout check runs BEFORE touching the user or password. This keeps
    // locked-out attackers from getting more guesses, and because it is
    // keyed on the submitted phone (not on whether the user exists), it
    // behaves identically for registered and unregistered numbers.
    const since = new Date(Date.now() - WINDOW_MS);
    const [{ value: failures }] = await db
      .select({ value: count() })
      .from(loginAttempts)
      .where(
        and(
          eq(loginAttempts.phone, d.phone),
          gt(loginAttempts.createdAt, since),
        ),
      );
    if (failures >= MAX_FAILED) {
      return { status: "error", errors: { form: "locked" }, values };
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.phone, d.phone))
      .limit(1);

    // Always run a password verification, against a dummy hash when the
    // user doesn't exist, so both failure paths cost the same time.
    const ok = await verifyPassword(
      d.password,
      user?.passwordHash ?? (await getDummyHash()),
    );

    // Same error for "unknown phone" and "wrong password" so the response
    // doesn't reveal which numbers have accounts. Failures are recorded
    // even for unknown phones, to keep the lockout behavior uniform.
    if (!user || !ok) {
      await db.insert(loginAttempts).values({ phone: d.phone });
      return { status: "error", errors: { form: "invalidLogin" }, values };
    }

    // Success: clear the failure counter so past typos don't count
    // toward a future lockout.
    await db.delete(loginAttempts).where(eq(loginAttempts.phone, d.phone));
    await createSession(user.id);
  } catch (error) {
    console.error("loginAction failed", error);
    return { status: "error", errors: { form: "saveFailed" }, values };
  }

  // Outside the try/catch because redirect() throws (see signupAction).
  redirect(safeNext(str(formData.get("next"))));
}

/**
 * Ends the current session and sends the user home.
 */
export async function logout() {
  await destroySession();
  redirect("/");
}
