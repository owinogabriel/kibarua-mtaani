"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { workers } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { makeRef } from "@/lib/ref";
import {
  workerDetailsSchema,
  emptyWorkerValues,
  type WorkerFormState,
} from "@/lib/workerValidation";

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

export async function registerWorker(
  _prev: WorkerFormState,
  formData: FormData,
): Promise<WorkerFormState> {
  const skills = formData
    .getAll("skills")
    .filter((v): v is string => typeof v === "string");
  const checkedAreas = formData
    .getAll("areas")
    .filter((v): v is string => typeof v === "string");
  const otherArea = str(formData.get("otherArea"));

  const typedAreas = otherArea
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const areas = [...new Set([...checkedAreas, ...typedAreas])];

  const experience = str(formData.get("experience"));
  const about = str(formData.get("about"));
  const consent = formData.get("consent") === "on";

  // What we send back to refill the form if something is wrong
  const values = {
    ...emptyWorkerValues,
    experience,
    about,
    otherArea,
    skills,
    areas: checkedAreas,
    consent,
  };

  // The real gate. Pages can be bypassed, this cannot.
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", errors: { form: "loginRequired" }, values };
  }

  // Honeypot
  if (str(formData.get("fax"))) {
    return {
      status: "success",
      errors: {},
      values: emptyWorkerValues,
      workerRef: makeRef("KW"),
    };
  }

  const parsed = workerDetailsSchema.safeParse({
    skills,
    areas,
    experience,
    about,
    consent: consent ? "on" : "",
  });

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
    const [existing] = await db
      .select({ id: workers.id })
      .from(workers)
      .where(eq(workers.userId, user.id))
      .limit(1);

    if (existing) {
      return { status: "error", errors: { form: "alreadyRegistered" }, values };
    }

    const inserted = await db
      .insert(workers)
      .values({
        ref: makeRef("KW"),
        userId: user.id,
        name: user.name,
        phone: user.phone,
        skills: d.skills,
        areas: d.areas,
        experience: d.experience,
        about: d.about,
        consent: true,
      })
      .onConflictDoNothing({ target: workers.phone })
      .returning({ ref: workers.ref });

    if (inserted.length === 0) {
      return { status: "error", errors: { form: "phoneTaken" }, values };
    }

    return {
      status: "success",
      errors: {},
      values: emptyWorkerValues,
      workerRef: inserted[0].ref,
    };
  } catch (error) {
    console.error("registerWorker failed:", error);
    return { status: "error", errors: { form: "saveFailed" }, values };
  }
}
