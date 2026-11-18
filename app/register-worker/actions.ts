"use server";

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

  // TODO (Step 7): save to Supabase (and reject duplicate phone numbers)
  const workerRef =
    "KW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  console.log("NEW WORKER:", { workerRef, ...parsed.data });

  return {
    status: "success",
    errors: {},
    values: emptyWorkerValues,
    workerRef,
  };
}
