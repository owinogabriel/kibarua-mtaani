"use server";

import { jobSchema, type JobFormState } from "@/lib/validation";

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

  // TODO (Step 7): save to Supabase instead of logging
  const jobRef = "KM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  console.log("NEW JOB:", { jobRef, ...parsed.data });

  return { status: "success", errors: {}, values: {}, jobRef };
}
