import { cn } from "@/lib/cn";

/**
 * Baris field standar kalkulator: label di atas, kontrol di bawah.
 * Port dari `CalculatorField` easytax-demo (v1) dengan layout stacked
 * alih-alih label-kiri/kanan seperti v1.
 */
type PropsKolomForm = {
  id: string;
  label: string;
  children: React.ReactNode;
  help?: string;
  error?: string | null;
  center?: boolean;
};

/** Kelas input/select bersama supaya semua field seragam. */
export const KELAS_KONTROL =
  "w-full rounded-lg border border-garis bg-white px-4 py-3 text-[0.95rem] text-navy-900 transition-colors placeholder:text-teks-redup focus:border-navy-900";

export function KolomForm({ id, label, children, help, error, center }: PropsKolomForm) {
  return (
    <div className={cn("flex flex-col gap-2", center && "items-center text-center")}>
      <label htmlFor={id} className="text-sm font-bold text-navy-900">
        {label}
      </label>
      <div className="flex w-full flex-col gap-1.5">
        {children}
        {help && !error ? (
          <small id={`${id}-help`} className="text-xs leading-relaxed text-teks-redup">
            {help}
          </small>
        ) : null}
        {error ? (
          <small id={`${id}-error`} role="alert" className="text-xs font-semibold text-red-600">
            {error}
          </small>
        ) : null}
      </div>
    </div>
  );
}

/** Baris read-only: label + nilai yang dihitung otomatis. */
export function KolomHanyaBaca({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-navy-900">{label}</span>
      <div className="rounded-lg border border-garis bg-netral-lat px-4 py-3 font-heading text-[0.95rem] font-bold text-navy-900">
        {value}
      </div>
    </div>
  );
}
