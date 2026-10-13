"use client";

import { useState } from "react";

import { calculatePphBadan } from "@/lib/kalkulator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/kalkulator/format";
import { amountField } from "@/lib/kalkulator/validation";
import type { ResultRow } from "@/lib/kalkulator/result";
import { InputPajak } from "./InputPajak";
import { SelectPajak } from "./SelectPajak";
import { AksiForm } from "./AksiForm";

const JENIS_TARIF = [
  { value: "pasal17b", label: "Pasal 17 ayat (1) huruf b" },
  { value: "pasal17b2", label: "Pasal 17 ayat (2) huruf b" },
  { value: "pasal31e", label: "Pasal 31E ayat (1)" },
];

/** Form PPh Badan — port dari `PphBadanForm` v1 (logika 1:1). */
export function FormPPhBadan({ onResult }: { onResult: (rows: ResultRow[] | null) => void }) {
  const [jenisTarif, setJenisTarif] = useState<"pasal17b" | "pasal17b2" | "pasal31e">("pasal17b");
  const [omzet, setOmzet] = useState("");
  const [pkp, setPkp] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const omzetValue = parseAmount(omzet);
    const pkpValue = parseAmount(pkp);
    const firstError = amountField(omzetValue, "Peredaran Bruto") ?? amountField(pkpValue, "Penghasilan Kena Pajak");
    if (firstError) {
      setError(firstError);
      onResult(null);
      return;
    }
    setError(null);
    const computed = calculatePphBadan({ jenisTarif, omzet: omzetValue ?? 0, pkp: pkpValue ?? 0 });
    onResult([
      { label: "DPP", value: formatRupiah(computed.pkp) },
      {
        label: "Tarif",
        value:
          computed.ratePercent === null
            ? computed.pkp > 0
              ? formatPercent((computed.pphBadan / computed.pkp) * 100)
              : "0%"
            : formatPercent(computed.ratePercent),
      },
      { label: "PPh Badan", value: formatRupiah(computed.pphBadan), emphasis: true },
    ]);
  }

  function handleReset() {
    setJenisTarif("pasal17b");
    setOmzet("");
    setPkp("");
    setError(null);
    onResult(null);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <SelectPajak id="jenis-tarif" label="Jenis Tarif" value={jenisTarif} onChange={(v) => setJenisTarif(v as typeof jenisTarif)} options={JENIS_TARIF} />
      <InputPajak id="omzet" label="Peredaran Bruto (Rp)" value={omzet} onChange={setOmzet} />
      <InputPajak id="pkp" label="Penghasilan Kena Pajak (Rp)" value={pkp} onChange={setPkp} />
      {error ? (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}
      <AksiForm onReset={handleReset} />
    </form>
  );
}
