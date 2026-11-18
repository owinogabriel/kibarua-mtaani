const base =
  "w-full rounded-lg border bg-white px-3 py-2.5text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2";

export const inputClass = (error?: string) =>
  `${base} ${
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-brand-500 focus:ring-brand-500/30"
  }`;
