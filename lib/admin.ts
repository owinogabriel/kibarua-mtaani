import { notFound } from "next/navigation";
import { getCurrentUser } from "./auth/session";
import { normalizeKenyanPhone } from "./phone";

function adminPhones(): Set<string> {
  return new Set(
    (process.env.ADMIN_PHONES ?? "")
      .split("")
      .map((p) => normalizeKenyanPhone(p.trim()))
      .filter((p): p is string => p !== null),
  );
}

// Returned the logged-in user only if they are an admin, otherwise null
export async function getAdmin() {
  const user = await getCurrentUser();
  if (!user) return null;
  return adminPhones().has(user.phone) ? user : null;
}

// For pages: non-admins get a plain 404, so the page's existence isn't revealed
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) notFound();
  return admin;
}
