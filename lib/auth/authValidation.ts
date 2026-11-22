import z from "zod";
import { normalizeKenyanPhone } from "../phone";

const phone = z
  .string()
  .trim()
  .refine((v) => normalizeKenyanPhone(v) !== null, "phone")
  .transform((v) => normalizeKenyanPhone(v) as string);

export const signupSchema = z.object({
  name: z.string().trim().min(2, "name").max(60, "name"),
  phone,
  password: z.string().min(8, "passwordShort").max(100, "passwoordLong"),
});

export const loginSchema = z.object({
  phone,
  password: z.string().min(1, "password"),
});

export type AuthState = {
  status: "idle" | "error";
  errors: Record<string, string>; // field -> error code
  values: { name: string; phone: string }; // passwords are never sent back
};
