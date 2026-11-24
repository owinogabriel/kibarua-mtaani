"use client";

import { useTransition } from "react";
import { setLocale } from "@/app/actions";
import type { Locale } from "@/lib/locales";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "sw", label: "SW" },
];

export default function LanguageToggle({ current }: { current: Locale }) {
  const [pending, startTransition] = useTransition();

  function change(locale: Locale) {
    if (locale === current) return;
    startTransition(async () => {
      await setLocale(locale);
    });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex overflow-hidden rounded-full border border-gray-200 text-xs font-semibold ${
        pending ? "opacity-60" : ""
      }`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={current === opt.value}
          onClick={() => change(opt.value)}
          className={`px-3 py-1 transition ${
            current === opt.value
              ? "bg-brand-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
