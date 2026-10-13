"use client";

import { PanahBawah } from "@/components/ikon";
import { KELAS_KONTROL, KolomForm } from "./KolomForm";

type PropsSelectPajak = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string | null;
};

/** Select dropdown standar kalkulator — port dari `TaxSelect` v1. */
export function SelectPajak({ id, label, value, onChange, options, error }: PropsSelectPajak) {
  return (
    <KolomForm id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          className={`${KELAS_KONTROL} appearance-none pr-11`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <PanahBawah
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-teks-sekunder"
        />
      </div>
    </KolomForm>
  );
}
