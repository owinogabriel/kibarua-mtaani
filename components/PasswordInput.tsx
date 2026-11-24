"use client"

import { inputClass } from "@/lib/formStyles";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  showLabel: string;
  hideLabel: string;
};

export default function PasswordInput({
  id,
  name,
  error,
  autoComplete,
  showLabel,
  hideLabel,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        className={`${inputClass(error)} pr-20`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-brand-700"
      >
        {visible ? hideLabel : showLabel}
      </button>
    </div>
  );
}
