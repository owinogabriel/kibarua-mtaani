"use server";

import { and, count, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { ApplyState } from "@/lib/applyTypes";


export async function applyToJob(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const user = await getCurrentUser();
  if (!user) return { status: "error", error: "loginRequired" };

  const raw = formData.get("jobId");
  const jobId = z.string().uuid().safeParse(typeof raw === "string" ? raw : "");
  if (!jobId.success) return { status: "error", error: "jobClosed" };

  try {
    const [job] = await db
      .select({ id: jobs.id, userId: jobs.userId })
      .from(jobs)
      .where(and(eq(jobs.id, jobId.data), eq(jobs.status, "open")))
      .limit(1);

    if (!job) return { status: "error", error: "jobClosed" };
    if (job.userId === user.id) return { status: "error", error: "ownJob" };

    // Max 10 applications per account per 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [{ value: recent }] = await db
      .select({ value: count() })
      .from(applications)
      .where(and(eq(applications.userId, user.id), gt(applications.createdAt, since)));

    if (recent >= 10) return { status: "error", error: "rateLimited" };

    const inserted = await db
      .insert(applications)
      .values({
        jobId: job.id,
        userId: user.id,
        workerName: user.name,
        workerPhone: user.phone,
      })
      .onConflictDoNothing()
      .returning({ id: applications.id });

    if (inserted.length === 0) return { status: "error", error: "alreadyApplied" };

    return { status: "success" };
  } catch (error) {
    console.error("applyToJob failed:", error);
    return { status: "error", error: "saveFailed" };
  }
}