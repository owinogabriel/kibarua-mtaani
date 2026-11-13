import { cookies } from "next/headers";
import en from "@/data/dictionaries/en";
import sw from "@/data/dictionaries/sw";
import type { Dictionary } from "@/data/dictionaries/en";
import { defaultLocale, locales, type Locale } from "@/lib/locales";

const dictionaries: Record<Locale, Dictionary> = { en, sw };

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("locale")?.value;
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}