"use client";

import { useState } from "react";

import { calculateRateBased } from "@/lib/kalkulator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/kalkulator/format";
import { amountField } from "@/lib/kalkulator/validation";
import type { TaxCodeOption } from "@/data/kalkulator";
import type { ResultRow } from "@/lib/kalkulator/result";
import { KolomHanyaBaca } from "./KolomForm";
import { InputPajak } from "./InputPajak";
import { SelectPajak } from "./SelectPajak";
import { AksiForm } from "./AksiForm";

/** Form perhitungan berdasarkan kode objek pajak — port dari `RateBasedForm` v1. */
export function FormTarifKode({
  codes,
  taxLabel,
  onResult,
}: {
  codes: TaxCodeOption[];
  taxLabel: string;
  onResult: (rows: ResultRow[] | null) => void;
}) {
  const [codeIndex, setCodeIndex] = useState(0);
  const [bruto, setBruto] = useState("");
  const [errors, setErrors] = useState<{ bruto?: string | null }>({});

  const selected = codes[codeIndex] ?? codes[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseAmount(bruto);
    const error = amountField(value, "Penghasilan Bruto");
    setErrors({ bruto: error });
    if (error || value === null) {
      onResult(null);
      return;
    }
    const computed = calculateRateBased(value, selected.rate);
    onResult([
      { label: "DPP", value: formatRupiah(computed.dpp) },
      { label: "Tarif", value: formatPercent(computed.rate) },
      { label: taxLabel, value: formatRupiah(computed.tax), emphasis: true },
    ]);
  }

  function handleReset() {
    setBruto("");
    setErrors({});
    setCodeIndex(0);
    onResult(null);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <SelectPajak
        id="kode-objek"
        label="Kode Objek Pajak"
        value={String(codeIndex)}
        onChange={(v) => {
          setCodeIndex(Number(v));
          onResult(null);
        }}
        options={codes.map((c, i) => ({ value: String(i), label: c.label }))}
      />
      <KolomHanyaBaca label="Tarif" value={formatPercent(selected.rate)} />
      <InputPajak
        id="bruto"
        label="Penghasilan Bruto (Rp)"
        value={bruto}
        onChange={setBruto}
        error={errors.bruto}
        help="Masukkan total penghasilan bruto dalam rupiah."
      />
      <AksiForm onReset={handleReset} />
    </form>
  );
}
