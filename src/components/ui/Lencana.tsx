import { cn } from "@/lib/cn";

type Nada = "kuning" | "navy" | "hijau" | "terang" | "putih";

const GAYA_NADA: Record<Nada, string> = {
  kuning: "bg-yellow-500 text-navy-900",
  navy: "bg-navy-900 text-white",
  hijau: "bg-emerald-accent text-white",
  terang: "bg-yellow-500/15 text-navy-900",
  putih: "bg-white text-navy-900 border border-garis",
};

/**
 * Lencana kecil untuk label kategori, status, atau penanda.
 * Kalau butuh isi dari teks + ikon saja, ini komponen yang dipakai.
 */
export function Lencana({
  children,
  nada = "kuning",
  className,
  ikon,
}: {
  children: React.ReactNode;
  nada?: Nada;
  className?: string;
  ikon?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5",
        "text-xs font-extrabold tracking-[0.08em] uppercase",
        GAYA_NADA[nada],
        className,
      )}
    >
      {ikon}
      {children}
    </span>
  );
}