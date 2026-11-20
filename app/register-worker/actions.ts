"use server";

import { db } from "@/lib/db";
import { workers } from "@/lib/db/schema";
import { makeRef } from "@/lib/ref";
import {
  workerSchema,
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

  // Merge ticked estates with typed ones, remove blanks and duplicates
  const typedAreas = otherArea
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const areas = [...new Set([...checkedAreas, ...typedAreas])];

  const raw = {
    name: str(formData.get("name")),
    phone: str(formData.get("phone")),
    skills,
    areas,
    experience: str(formData.get("experience")),
    about: str(formData.get("about")),
    consent: formData.get("consent") === "on" ? "on" : "",
  };

  // What we send back to refill the form if something is wrong
  const values = {
    name: raw.name,
    phone: raw.phone,
    experience: raw.experience,
    about: raw.about,
    otherArea,
    skills,
    areas: checkedAreas,
    consent: raw.consent === "on",
  };

  const parsed = workerSchema.safeParse(raw);

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
    const inserted = await db
      .insert(workers)
      .values({
        ref: makeRef("KW"),
        name: d.name,
        phone: d.phone, // is already registers nothing is inserted
        skills: d.skills,
        areas: d.areas,
        experience: d.experience,
        about: d.about,
        consent: true,
      })
      .onConflictDoNothing({ target: workers.phone })
      .returning({ ref: workers.ref });

    if (inserted.length === 0) {
      return { status: "error", errors: { phone: "phoneTaken" }, values };
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
