"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerWorker } from "@/app/register-worker/actions";
import Field from "@/components/Field";
import { categories } from "@/data/categories";

import { inputClass } from "@/lib/formStyles";
import {
  emptyWorkerValues,
  experienceOptions,
  type WorkerFormState,
} from "@/lib/workerValidation";
import type { Dictionary } from "@/data/dictionaries/en";
import { estates } from "@/data/estate";

const initialState: WorkerFormState = {
  status: "idle",
  errors: {},
  values: emptyWorkerValues,
};

// A checkbox that looks like a clickable chip
function Chip({
  name,
  value,
  checked,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={checked}
        className="peer sr-only"
      />
      <span className="inline-block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/40">
        {children}
      </span>
    </label>
  );
}

type Props = {
  dict: Dictionary["worker"];
  categoryNames: Dictionary["categories"]["items"];
};

export default function WorkerForm({ dict, categoryNames }: Props) {
  const [state, formAction, pending] = useActionState(
    registerWorker,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
        <div className="text-5xl">🙌</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {dict.success.title}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-gray-600">
          {dict.success.text}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          {dict.success.ref}:{" "}
          <span className="font-mono font-semibold text-gray-900">
            {state.workerRef}
          </span>
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {dict.success.another}
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            {dict.success.home}
          </Link>
        </div>
      </div>
    );
  }

  const v = state.values;

  const err = (field: string) => {
    const code = state.errors[field];
    if (!code) return undefined;
    return (dict.errors as Record<string, string>)[code] ?? dict.errors.generic;
  };

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.fields.name} htmlFor="name" error={err("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={v.name}
            className={inputClass(err("name"))}
          />
        </Field>

        <Field
          label={dict.fields.phone}
          htmlFor="phone"
          error={err("phone")}
          hint={dict.fields.phoneHint}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            placeholder="0712 345 678"
            className={inputClass(err("phone"))}
          />
        </Field>
      </div>

      <Field
        label={dict.fields.skills}
        error={err("skills")}
        hint={dict.fields.skillsHint}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat.slug}
              name="skills"
              value={cat.slug}
              checked={v.skills.includes(cat.slug)}
            >
              {cat.emoji} {categoryNames[cat.slug].name}
            </Chip>
          ))}
        </div>
      </Field>

      <Field
        label={dict.fields.areas}
        error={err("areas")}
        hint={dict.fields.areasHint}
      >
        <div className="flex flex-wrap gap-2">
          {estates.map((estate) => (
            <Chip
              key={estate}
              name="areas"
              value={estate}
              checked={v.areas.includes(estate)}
            >
              {estate}
            </Chip>
          ))}
        </div>
        <input
          name="otherArea"
          type="text"
          defaultValue={v.otherArea}
          aria-label={dict.fields.otherArea}
          placeholder={dict.fields.otherAreaPlaceholder}
          className={`mt-3 ${inputClass()}`}
        />
      </Field>

      <Field
        label={dict.fields.experience}
        htmlFor="experience"
        error={err("experience")}
      >
        <select
          id="experience"
          name="experience"
          defaultValue={v.experience}
          className={inputClass(err("experience"))}
        >
          <option value="" disabled>
            {dict.fields.experiencePlaceholder}
          </option>
          {experienceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {dict.experience[opt as keyof typeof dict.experience]}
            </option>
          ))}
        </select>
      </Field>

      <Field label={dict.fields.about} htmlFor="about" error={err("about")}>
        <textarea
          id="about"
          name="about"
          rows={3}
          maxLength={300}
          defaultValue={v.about}
          placeholder={dict.fields.aboutPlaceholder}
          className={inputClass(err("about"))}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v.consent}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-brand-600"
          />
          <span>{dict.fields.consent}</span>
        </label>
        {err("consent") && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {err("consent")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}
