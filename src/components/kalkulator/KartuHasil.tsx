import type { ResultRow } from "@/lib/kalkulator/result";

type PropsKartuHasil = {
  title: string;
  rows: ResultRow[];
  note?: string;
};

/**
 * Panel hasil perhitungan — port dari `CalculatorResult` v1.
 * Desain v2: kartu navy dengan baris sorot kuning untuk nilai utama.
 */
export function KartuHasil({ title, rows, note }: PropsKartuHasil) {
  return (
    <div role="status" aria-live="polite" className="rounded-2xl bg-navy-900 p-6 text-white shadow-[0_24px_56px_color-mix(in_srgb,var(--color-brand-navy)_28%,transparent)] md:p-7">
      <p className="text-xs font-extrabold tracking-[0.16em] text-yellow-500 uppercase">
        Ringkasan
      </p>
      <h3 className="mt-1.5 font-heading text-xl font-bold text-white">{title}</h3>

      <dl className="mt-5 overflow-hidden rounded-xl border border-white/12 bg-white/6">
        {rows.map((row) => (
          <div
            key={row.label}
            className={
              row.emphasis
                ? "flex items-center justify-between gap-4 border-t border-yellow-500/30 bg-yellow-500/12 px-4 py-4 first:border-t-0"
                : "flex items-center justify-between gap-4 px-4 py-3.5 [&+*]:border-t [&+*]:border-white/10"
            }
          >
            <dt className={row.emphasis ? "text-sm font-bold text-white" : "text-sm text-white/70"}>
              {row.label}
            </dt>
            <dd
              className={
                row.emphasis
                  ? "font-heading text-lg font-extrabold whitespace-nowrap text-yellow-500"
                  : "font-heading text-[0.95rem] font-bold whitespace-nowrap text-white"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {note ? <p className="mt-4 text-sm leading-relaxed text-white/75">{note}</p> : null}

      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
        Hasil bersifat estimasi berdasarkan ketentuan yang berlaku. Untuk perhitungan
        final, konsultasikan dengan konsultan pajak EasyTax.
      </p>
    </div>
  );
}
