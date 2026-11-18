import { z } from "zod";
import { categories } from "@/data/categories";
import { normalizeKenyanPhone } from "@/lib/phone";

const categorySlugs: string[] = categories.map((c) => c.slug);
export const experienceOptions = ["new", "lt1", "1to3", "3plus"];

export const workerSchema = z.object({
  name: z.string().trim().min(2, "name").max(60, "name"),
  phone: z
    .string()
    .trim()
    .refine((v) => normalizeKenyanPhone(v) !== null, "phone")
    .transform((v) => normalizeKenyanPhone(v) as string),
  skills: z
    .array(z.string())
    .min(1, "skills")
    .refine((arr) => arr.every((s) => categorySlugs.includes(s)), "skills"),
  areas: z
    .array(z.string().trim().min(2, "areas").max(60, "areas"))
    .min(1, "areas")
    .max(10, "areasMax"),
  experience: z
    .string()
    .refine((v) => experienceOptions.includes(v), "experience"),
  about: z.string().trim().max(300, "aboutLong"),
  consent: z.string().refine((v) => v === "on", "consent"),
});

export type WorkerFormState = {
  status: "idle" | "error" | "success";
  errors: Record<string, string>; // field -> error code
  values: {
    name: string;
    phone: string;
    experience: string;
    about: string;
    otherArea: string;
    skills: string[];
    areas: string[];
    consent: boolean;
  };
  workerRef?: string;
};

export const emptyWorkerValues: WorkerFormState["values"] = {
  name: "",
  phone: "",
  experience: "",
  about: "",
  otherArea: "",
  skills: [],
  areas: [],
  consent: false,
};
