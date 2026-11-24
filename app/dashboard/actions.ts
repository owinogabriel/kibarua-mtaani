"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { allowedNext, jobStatuses, type JobStatus } from "@/lib/jobStatus";

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");
const idSchema = z.string().uuid();

export async function setMyJobStatus(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const id = idSchema.safeParse(str(formData.get("jobId")));
  const status = str(formData.get("status"));
  if (!id.success || !(jobStatuses as readonly string[]).includes(status)) return;

  const [job] = await db
    .select({ status: jobs.status })
    .from(jobs)
    .where(and(eq(jobs.id, id.data), eq(jobs.userId, user.id)))
    .limit(1);
  if (!job) return;

  const allowed = allowedNext[job.status as JobStatus] ?? [];
  if (!allowed.includes(status as JobStatus)) return;

  await db
    .update(jobs)
    .set({ status })
    .where(and(eq(jobs.id, id.data), eq(jobs.userId, user.id)));

  revalidatePath("/dashboard");
  revalidatePath("/find-work");
}

export async function withdrawApplication(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const id = idSchema.safeParse(str(formData.get("applicationId")));
  if (!id.success) return;

  await db
    .delete(applications)
    .where(and(eq(applications.id, id.data), eq(applications.userId, user.id)));

  revalidatePath("/dashboard");
  revalidatePath("/find-work");
}