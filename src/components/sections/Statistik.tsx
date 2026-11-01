import { Bintang, Centang, Medali, Perisai } from "@/components/ikon";

const STATISTIK = [
  {
    nilai: "13.000+",
    label: "Bisnis terlayani",
    ikon: <Medali className="h-5 w-5" />,
    rating: false,
  },
  {
    nilai: "20+",
    label: "Konsultan bersertifikasi BKP",
    ikon: <Perisai className="h-5 w-5" />,
    rating: false,
  },
  {
    nilai: "4,9/5",
    label: "Rating Google",
    ikon: <Bintang className="h-5 w-5" />,
    rating: true,
  },
  {
    nilai: "100%",
    label: "Legal",
    ikon: <Centang className="h-5 w-5" />,
    rating: false,
  },
] as const;

/** Trust bar compact yang mengikuti transisi hero pada halaman layanan. */
export function Statistik({ statistik = STATISTIK.map((item) => ({ value: item.nilai, label: item.label })) }: { statistik?: { value: string; label: string }[] }) {
  return (
    <section
      aria-labelledby="statistik-judul"
      className="relative z-10 bg-transparent px-4 pt-0 pb-6 text-navy-900 sm:px-6 sm:pb-8 md:px-8"
    >
      <div className="relative mx-auto -mt-14 w-full max-w-maks overflow-hidden rounded-xl border border-garis bg-white shadow-[0_10px_28px_-16px_color-mix(in_srgb,var(--color-brand-navy)_22%,transparent)] sm:rounded-2xl">
        <span
          aria-hidden="true"
          className="absolute top-0 left-8 h-1 w-24 rounded-b-full bg-yellow-500 md:left-12"
        />
        <div className="px-3 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5">
          <h2 id="statistik-judul" className="sr-only">
            Statistik EasyTax
          </h2>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-garis sm:grid-cols-2 lg:grid-cols-4">
            {statistik.map((item, i) => (
              <li
                key={item.label}
                className="flex min-h-[68px] items-center justify-start gap-3 bg-white px-4 py-3 text-left sm:min-h-[78px] sm:justify-center sm:gap-2.5 sm:px-3 sm:text-center md:gap-3 md:px-4 md:text-left lg:min-h-[68px] lg:px-5 lg:py-2"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow-500/15 text-yellow-500">
                  {STATISTIK[i % STATISTIK.length].ikon}
                </span>
                <span className="min-w-0">
                  <strong className="flex items-center justify-start gap-1.5 font-heading text-[0.98rem] leading-none font-bold tracking-[-0.03em] text-navy-900 sm:justify-center sm:text-[1.05rem] md:justify-start">
                    {item.value}
                  </strong>
                  <span className="mt-1 block max-w-[150px] text-[0.66rem] leading-[1.3] text-teks-redup sm:max-w-none sm:text-[0.68rem]">
                    {item.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
