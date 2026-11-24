"use client"

import { signupAction } from "@/app/auth/actions";
import { Dictionary } from "@/data/dictionaries/en";
import { AuthState } from "@/lib/auth/authValidation";
import { useActionState } from "react";
import Field from "./Field";
import { inputClass } from "@/lib/formStyles";
import PasswordInput from "./PasswordInput";
import Link from "next/link";

const initialState: AuthState = {
  status: "idle",
  errors: {},
  values: { name: "", phone: "" },
};

export default function SignupForm({ dict }: { dict: Dictionary["auth"] }) {
  const [state, formAction, pending] = useActionState(
    signupAction,
    initialState,
  );

  const err = (field: string) => {
    const code = state.errors[field];
    return code ? (dict.errors as Record<string, string>)[code] : undefined;
  };

  return (
    <form action={formAction} noValidate className="space-y-5">
      <Field label={dict.signup.name} htmlFor="name" error={err("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={state.values.name}
          className={inputClass(err("name"))}
        />
      </Field>
      <Field label={dict.fields.phone} htmlFor="phone" error={err("phone")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={state.values.phone}
          placeholder="0712 345 678"
          className={inputClass(err("phone"))}
        />
      </Field>
      <Field
        label={dict.fields.password}
        htmlFor="password"
        error={err("password") ?? err("passwordShort") ?? err("passwordLong")}
        hint={dict.fields.passwordHint}
      >
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          error={err("passwordShort")}
          showLabel={dict.show}
          hideLabel={dict.hide}
        />
      </Field>
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
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
        {pending ? dict.signup.submitting : dict.signup.submit}
      </button>

      <p className="text-center text-sm text-gray-600">
        {dict.signup.haveAccount}{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-700 hover:underline"
        >
          {dict.signup.loginLink}
        </Link>
      </p>
    </form>
  );
}
