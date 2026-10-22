export const locales = ["en", "sw"] as const; // Available locales
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
