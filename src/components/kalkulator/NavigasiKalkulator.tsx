"use client";

import { useEffect, useRef, useState } from "react";

import { PanahBawah } from "@/components/ikon";
import { TAX_CALCULATORS } from "@/data/kalkulator";
import { cn } from "@/lib/cn";

const TAB_UTAMA = ["pph21", "pph23", "pph42"] as const;
const TAB_LAINNYA = ["pph22", "pph15", "pphbadan", "ppn", "ppnbm"] as const;

/**
 * Navigasi tab kalkulator — port dari `TaxCalculatorNavigation` v1.
 * Tab utama tampil sebagai pill, sisanya di dropdown "Lainnya".
 */
export function NavigasiKalkulator({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeIsMore = (TAB_LAINNYA as readonly string[]).includes(activeId);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const gayaTab = (aktif: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-[0.86rem] font-bold whitespace-nowrap transition-colors",
      aktif
        ? "bg-navy-900 text-white shadow-md"
        : "border border-garis bg-white text-teks-sekunder hover:border-navy-900/30 hover:text-navy-900",
    );

  return (
    <nav aria-label="Navigasi Kalkulator Pajak" className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-2" role="tablist">
        {TAB_UTAMA.map((id) => {
          const calc = TAX_CALCULATORS.find((c) => c.id === id)!;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={activeId === id}
              className={gayaTab(activeId === id)}
              onClick={() => onChange(id)}
            >
              {calc.title}
            </button>
          );
        })}

        <div className="relative" ref={ref}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            className={cn(gayaTab(activeIsMore), "flex items-center gap-1.5")}
            onClick={() => setOpen((v) => !v)}
          >
            Lainnya
            <PanahBawah
              aria-hidden="true"
              className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
            />
          </button>

          {open ? (
            <div
              role="menu"
              className="absolute right-0 z-30 mt-2 w-[260px] overflow-hidden rounded-xl border border-garis bg-white p-1.5 shadow-[0_20px_48px_rgb(10_22_40/0.16)]"
            >
              {TAB_LAINNYA.map((id) => {
                const calc = TAX_CALCULATORS.find((c) => c.id === id)!;
                return (
                  <button
                    key={id}
                    type="button"
                    role="menuitem"
                    className={cn(
                      "block w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-bold transition-colors",
                      activeId === id
                        ? "bg-yellow-500/15 text-navy-900"
                        : "text-teks-sekunder hover:bg-netral-lat hover:text-navy-900",
                    )}
                    onClick={() => {
                      onChange(id);
                      setOpen(false);
                    }}
                  >
                    {calc.title}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
