"use client";

import { cn } from "@/lib/cn";

type PropsPilihAdaTidak = {
  id: string;
  value: "ada" | "tidak";
  onChange: (value: "ada" | "tidak") => void;
};

/** Toggle segmentasi Ada / Tidak Ada — port dari `AdaTidakAda` v1. */
export function PilihAdaTidak({ id, value, onChange }: PropsPilihAdaTidak) {
  const GAYA = (aktif: boolean) =>
    cn(
      "rounded-md px-5 py-2 text-sm font-bold transition-colors",
      aktif ? "bg-navy-900 text-white" : "text-teks-sekunder hover:bg-netral-lat hover:text-navy-900",
    );

  return (
    <div
      role="group"
      aria-labelledby={id}
      className="inline-flex rounded-lg border border-garis bg-white p-1"
    >
      <button type="button" className={GAYA(value === "ada")} onClick={() => onChange("ada")} aria-pressed={value === "ada"}>
        Ada
      </button>
      <button type="button" className={GAYA(value === "tidak")} onClick={() => onChange("tidak")} aria-pressed={value === "tidak"}>
        Tidak Ada
      </button>
    </div>
  );
}

/** Group radio Gross / Gross Up — port dari `tax-radio-group` v1. */
export function PilihSkema({
  value,
  onChange,
}: {
  value: "gross" | "grossup";
  onChange: (value: "gross" | "grossup") => void;
}) {
  const GAYA = (aktif: boolean) =>
    cn(
      "rounded-md px-5 py-2 text-sm font-bold transition-colors",
      aktif ? "bg-navy-900 text-white" : "text-teks-sekunder hover:bg-netral-lat hover:text-navy-900",
    );

  return (
    <div role="radiogroup" aria-label="Skema Penghitungan" className="inline-flex rounded-lg border border-garis bg-white p-1">
      <button type="button" role="radio" aria-checked={value === "gross"} className={GAYA(value === "gross")} onClick={() => onChange("gross")}>
        Gross
      </button>
      <button type="button" role="radio" aria-checked={value === "grossup"} className={GAYA(value === "grossup")} onClick={() => onChange("grossup")}>
        Gross Up
      </button>
    </div>
  );
}
