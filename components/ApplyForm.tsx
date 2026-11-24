"use client";

import { useActionState } from "react";
import type { ApplyState } from "@/lib/applyTypes";
import type { Dictionary } from "@/data/dictionaries/en";
import { applyToJob } from "@/app/find-work/action";

const initialState: ApplyState = { status: "idle" };

type Props = {
  jobId: string;
  dict: Dictionary["findWork"]["apply"];
};

export default function ApplyForm({ jobId, dict }: Props) {
  const [state, formAction, pending] = useActionState(applyToJob, initialState);

  if (state.status === "success") {
    return (
      <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
        {dict.sent}
      </p>
    );
  }

  const error =
    state.status === "error" && state.error
      ? (dict.errors as Record<string, string>)[state.error]
      : undefined;

  return (
    <form action={formAction} className="mt-4">
      <input type="hidden" name="jobId" value={jobId} />

      {error && (
        <p role="alert" className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? dict.sending : dict.button}
      </button>
    </form>
  );
}