"use server";

import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { makeRef } from "@/lib/ref";
import { jobSchema, type JobFormState } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function submitJob(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  // Collect only string fields from the form
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }

  const parsed = jobSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!errors[field]) errors[field] = issue.message; // first error per field
    }
    return { status: "error", errors, values };
  }

  const d = parsed.data;
  try {
    const [row] = await db
      .insert(jobs)
      .values({
        ref: makeRef("KM"),
        category: d.category,
        title: d.title,
        description: d.description,
        estate: d.estate,
        timing: d.when,
        budget: d.budget,
        customerName: d.name,
        customerPhone: d.phone,
      })
      .returning({ ref: jobs.ref });
    revalidatePath("/find-work");
    return { status: "success", errors: {}, values: {}, jobRef: row.ref };
  } catch (error) {
    console.error("submitJob failed:", error);
    return { status: "error", errors: { form: "saveFailed" }, values };
  }
}
