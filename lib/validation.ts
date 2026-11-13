import { categories } from "@/data/categories";
import { z } from "zod";
import { normalizeKenyanPhone } from "./phone";

const categorySlugs: string[] = categories.map((category) => category.slug); 
export const whenOptions = [
  "asap",
  "today",
  "tomorrow",
  "this week",
  "flexible",
];

export const jobSchema = {
  category: z
    .string()
    .refine(
      (v) => categorySlugs.includes(v),
      "category must be one of the predefined categories",
    ),
  title: z
    .string()
    .trim()
    .min(5, "title must be at least 5 characters long")
    .max(80, "title must be at most 80 characters long"),
  description: z
    .string()
    .trim()
    .min(10, "description must be at least 10 characters long")
    .max(500, "description must be at most 500 characters long"),
  when: z
    .string()
    .refine(
      (v) => whenOptions.includes(v),
      "when must be one of the predefined options",
    ),
  budget: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d+$/.test(v), "budgetInvalid")
    .refine((v) => v === "" || Number(v) >= 100, "budgetMin")
    .transform((v) => (v === "" ? null : Number(v))),
  name: z
    .string()
    .trim()
    .min(2, "name must be atleast 2 characters long")
    .max(50, "name must be at most 50 characters long"),
  phone: z
    .string()
    .trim()
    .refine((v) => normalizeKenyanPhone(v) !== null, "phone")
    .transform((v) => normalizeKenyanPhone(v) as string),
};

export type JobInput = z.infer<typeof jobSchema>;

export type jobFormState = {
  status: "idle" | "error" | "success";
  errors: Record<string, string>;
  values: Record<string, string>;
  jobRef?: string;
};
