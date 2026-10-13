"use client";

import { formatThousands } from "@/lib/kalkulator/format";
import { KELAS_KONTROL, KolomForm } from "./KolomForm";

type PropsInputPajak = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  inputMode?: "numeric" | "decimal" | "text";
  help?: string;
};

/** Input angka dengan pemisah ribian — port dari `TaxInput` v1. */
export function InputPajak({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  inputMode = "numeric",
  help,
}: PropsInputPajak) {
  return (
    <KolomForm id={id} label={label} help={help} error={error}>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder ?? "0"}
        onChange={(e) =>
          onChange(inputMode === "numeric" ? formatThousands(e.target.value) : e.target.value)
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className={KELAS_KONTROL}
      />
    </KolomForm>
  );
}
