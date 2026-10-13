import { cn } from "@/lib/cn";

type AlamatLatar = "putih" | "latar" | "navy" | "bening";

const GAYA_LATAR: Record<AlamatLatar, string> = {
  putih: "bg-white text-navy-900",
  latar: "bg-netral-lat text-navy-900",
  navy: "bg-navy-900 text-white",
  bening: "bg-netral-alt text-navy-900",
};

/**
 * Pembungkus seksi halaman: Mastersi ritme vertikal (padding) + latar.
 *
 * Ritme dari v1: section biasa 90px, section rapat 60px. Mobile diturunkan
 * lewat scale responsive yang lebih halus daripada breakpoint mendadak,
 * supaya tidak ada lompatan saat windows di-resize.
 */
export function Bagian({
  children,
  className,
  latar = "putih",
  /** Ritme vertikal: rapat untuk section pendek, lega untuk section utama. */
  ritme = "lega",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  latar?: AlamatLatar;
  ritme?: "rapat" | "sedang" | "lega";
  id?: string;
}) {
  const GAYA_RITME = {
    rapat: "py-12 md:py-16",
    sedang: "py-16 md:py-20",
    lega: "py-20 md:py-[90px]",
  } as const;

  return (
    <section id={id} className={cn(GAYA_LATAR[latar], GAYA_RITME[ritme], className)}>
      {children}
    </section>
  );
}