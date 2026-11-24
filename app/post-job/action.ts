"use server";

import { revalidatePath } from "next/cache";
import { and, count, eq, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { makeRef } from "@/lib/ref";
import { jobDetailsSchema, type JobFormState } from "@/lib/validation";

export async function submitJob(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }

  // The real gate. Pages can be bypassed, this cannot.
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", errors: { form: "loginRequired" }, values };
  }

  // Honeypot: pretend it worked so bots learn nothing
  if (values.fax) {
    return { status: "success", errors: {}, values: {}, jobRef: makeRef("KM") };
  }

  const parsed = jobDetailsSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values };
  }

  const d = parsed.data;

  try {
    // Max 3 jobs per account per 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [{ value: recent }] = await db
      .select({ value: count() })
      .from(jobs)
      .where(and(eq(jobs.userId, user.id), gt(jobs.createdAt, since)));

    if (recent >= 3) {
      return { status: "error", errors: { form: "rateLimited" }, values };
    }

    const [row] = await db
      .insert(jobs)
      .values({
        ref: makeRef("KM"),
        userId: user.id,
        category: d.category,
        title: d.title,
        description: d.description,
        estate: d.estate,
        timing: d.when,
        budget: d.budget,
        customerName: user.name,
        customerPhone: user.phone,
      })
      .returning({ ref: jobs.ref });

    revalidatePath("/find-work");
    return { status: "success", errors: {}, values: {}, jobRef: row.ref };
  } catch (error) {
    console.error("submitJob failed:", error);
    return { status: "error", errors: { form: "saveFailed" }, values };
  }
}
