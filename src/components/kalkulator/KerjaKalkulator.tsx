"use client";

import { useState } from "react";

import { Kalkulator } from "@/components/ikon";
import { Wadah } from "@/components/ui/Wadah";
import { TAX_CALCULATORS } from "@/data/kalkulator";
import { defaultResultRows, resultTitle, type ResultRow } from "@/lib/kalkulator/result";
import { FormPPh21 } from "./FormPPh21";
import { FormPPh21Tahunan } from "./FormPPh21Tahunan";
import { FormPPhBadan } from "./FormPPhBadan";
import { FormPpn } from "./FormPpn";
import { FormTarifKode } from "./FormTarifKode";
import { KartuHasil } from "./KartuHasil";
import { NavigasiKalkulator } from "./NavigasiKalkulator";

/**
 * Workspace kalkulator — port dari `CalculatorShell` easytax-demo (v1).
 * Alur state & pemilihan form identik dengan v1; visual memakai design
 * system v2: kartu putih dengan panel hasil navy yang sticky.
 */
export function KerjaKalkulator() {
  const [activeId, setActiveId] = useState(TAX_CALCULATORS[0].id);
  const [pph21Jenis, setPph21Jenis] = useState("bulanan");
  const [tPtkpIndex, setTPtkpIndex] = useState(0);
  const [rows, setRows] = useState<ResultRow[] | null>(null);
  const active = TAX_CALCULATORS.find((c) => c.id === activeId) ?? TAX_CALCULATORS[0];

  function handleSelect(id: string) {
    setActiveId(id);
    setRows(null);
  }

  return (
    <section id="kalkulator" className="bg-netral-lat pt-10 pb-16 md:pt-14 md:pb-20">
      <Wadah>
        <div className="overflow-hidden rounded-[24px] border border-garis bg-white shadow-[0_28px_70px_rgb(10_22_40/0.10)]">
          {/* Kop kerja: merek + tab kalkulator */}
          <div className="flex flex-col gap-5 border-b border-garis px-6 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-yellow-500">
                <Kalkulator className="h-6 w-6" />
              </span>
              <div>
                <h1 className="font-heading text-lg font-bold text-navy-900">Kalkulator Pajak</h1>
                <p className="text-sm text-teks-redup">Pilih jenis pajak yang ingin dihitung</p>
              </div>
            </div>
            <NavigasiKalkulator activeId={activeId} onChange={handleSelect} />
          </div>

          {/* Tubuh: form kiri, hasil kanan */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="px-6 py-8 md:px-8">
              <h2 className="font-heading text-[1.6rem] leading-tight font-bold text-navy-900">
                {active.title}
              </h2>
              <p className="mt-2.5 max-w-[560px] text-[0.97rem] leading-relaxed text-teks-sekunder">
                {active.description}
              </p>

              <div className="mt-7">
                {active.kind === "pph21" ? (
                  <FormPPh21
                    onResult={setRows}
                    jenis={pph21Jenis}
                    onJenisChange={setPph21Jenis}
                    tahunanPtkpIndex={tPtkpIndex}
                    onTahunanPtkpIndexChange={setTPtkpIndex}
                  />
                ) : null}
                {active.kind === "pphbadan" ? <FormPPhBadan onResult={setRows} /> : null}
                {active.kind === "ppn" ? <FormPpn mode="ppn" onResult={setRows} /> : null}
                {active.kind === "ppnbm" ? <FormPpn mode="ppnbm" onResult={setRows} /> : null}
                {active.kind === "rate" && active.codes ? (
                  <FormTarifKode codes={active.codes} taxLabel={active.title} onResult={setRows} />
                ) : null}
              </div>
            </div>

            <aside
              aria-label="Hasil perhitungan"
              className="border-t border-garis bg-netral-alt px-6 py-8 md:px-8 lg:border-t-0 lg:border-l"
            >
              <div className="lg:sticky lg:top-[92px]">
                <KartuHasil
                  title={resultTitle()}
                  rows={rows ?? defaultResultRows(active.kind, active.title)}
                />
              </div>
            </aside>
          </div>

          {/* Worksheet PPh 21 Tahunan — posisi sama seperti v1 (di bawah workspace) */}
          {active.kind === "pph21" && pph21Jenis === "tahunan" ? (
            <div className="border-t border-garis px-6 py-8 md:px-8">
              <FormPPh21Tahunan onResult={setRows} ptkpIndex={tPtkpIndex} />
            </div>
          ) : null}
        </div>
      </Wadah>
    </section>
  );
}
