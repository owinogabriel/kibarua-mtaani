"use client";

import Link from "next/link";
import { useActionState } from "react";
import Field from "@/components/Field";
import { categories } from "@/data/categories";
import { inputClass } from "@/lib/formStyles";
import { whenOptions, type JobFormState } from "@/lib/validation";
import type { Dictionary } from "@/data/dictionaries/en";
import { submitJob } from "@/app/post-job/action";
import { estates } from "@/data/estate";

const initialState: JobFormState = { status: "idle", errors: {}, values: {} };

type Props = {
  dict: Dictionary["postJob"];
  categoryNames: Dictionary["categories"]["items"];
  poster: { name: string; phone: string };
};

export default function PostJobForm({ dict, categoryNames, poster }: Props) {
  const [state, formAction, pending] = useActionState(submitJob, initialState);

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {dict.success.title}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-gray-600">
          {dict.success.text}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          {dict.success.ref}:{" "}
          <span className="font-mono font-semibold text-gray-900">
            {state.jobRef}
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
    <form action={formAction} noValidate className="space-y-5">
      <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
        {dict.postingAs
          .replace("{name}", poster.name)
          .replace("{phone}", poster.phone)}
      </p>

      <Field
        label={dict.fields.category}
        htmlFor="category"
        error={err("category")}
      >
        <select
          id="category"
          name="category"
          defaultValue={v.category ?? ""}
          className={inputClass(err("category"))}
        >
          <option value="" disabled>
            {dict.fields.categoryPlaceholder}
          </option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.emoji} {categoryNames[cat.slug].name}
            </option>
          ))}
        </select>
      </Field>

      <Field label={dict.fields.title} htmlFor="title" error={err("title")}>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={80}
          defaultValue={v.title}
          placeholder={dict.fields.titlePlaceholder}
          className={inputClass(err("title"))}
        />
      </Field>

      <Field
        label={dict.fields.description}
        htmlFor="description"
        error={err("description")}
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={500}
          defaultValue={v.description}
          placeholder={dict.fields.descriptionPlaceholder}
          className={inputClass(err("description"))}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dict.fields.estate}
          htmlFor="estate"
          error={err("estate")}
        >
          <input
            id="estate"
            name="estate"
            type="text"
            list="estates"
            defaultValue={v.estate}
            placeholder={dict.fields.estatePlaceholder}
            className={inputClass(err("estate"))}
          />
          <datalist id="estates">
            {estates.map((e) => (
              <option key={e} value={e} />
            ))}
          </datalist>
        </Field>

        <Field label={dict.fields.when} htmlFor="when" error={err("when")}>
          <select
            id="when"
            name="when"
            defaultValue={v.when ?? "asap"}
            className={inputClass(err("when"))}
          >
            {whenOptions.map((opt) => (
              <option key={opt} value={opt}>
                {dict.when[opt as keyof typeof dict.when]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label={dict.fields.budget}
        htmlFor="budget"
        error={err("budget")}
        hint={dict.fields.budgetHint}
      >
        <input
          id="budget"
          name="budget"
          type="text"
          inputMode="numeric"
          defaultValue={v.budget}
          placeholder={dict.fields.budgetPlaceholder}
          className={inputClass(err("budget"))}
        />
      </Field>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      {err("form") && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {err("form")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}
