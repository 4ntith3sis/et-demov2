import Image from "next/image";

import { Perisai } from "@/components/ikon";
import type { AnggotaTim } from "@/data/tim";

/**
 * Section "Tim Konsultan" untuk halaman /tentang-kami.
 *
 * Kartu memakai foto lingkaran dengan lencana lisensi BKP di tepi
 * foto, nama, jabatan, tingkat lisensi, dan bio singkat. Grid 4 kolom
 * di desktop supaya nama dan sertifikasi mudah dibandingkan.
 */
export function TimKonsultan({ varian = "standar", tim = [], copy }: { varian?: "standar" | "kontak"; tim: AnggotaTim[]; copy?: { label?: string; title?: string; description?: string; shortTitle?: string; shortDescription?: string } }) {
  const ringkas = varian === "kontak";

  return (
    <section
      id="tim"
      aria-labelledby="tim-judul"
      className={
        ringkas
          ? "relative overflow-hidden border-y border-white/10 bg-navy-900 py-[clamp(48px,6.5vw,80px)]"
          : "relative overflow-hidden bg-netral-lat py-[clamp(56px,7vw,88px)]"
      }
    >
      {!ringkas && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-160px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-yellow)_14%,transparent)_0%,transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-220px] left-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-navy)_8%,transparent)_0%,transparent_68%)]"
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <span
            className={
              ringkas
                ? "inline-flex items-center gap-2 rounded-full border border-yellow-500/45 bg-yellow-500/15 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-yellow-500 uppercase"
                : "inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/12 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-navy-900 uppercase"
            }
          >
            {copy?.label ?? "Tim Konsultan"}
          </span>

            <h2
            id="tim-judul"
            className={`mt-6 max-w-[720px] font-heading text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.25] font-extrabold tracking-[-0.03em] text-balance ${ringkas ? "text-white" : "text-navy-900"}`}
            >
            {ringkas ? (copy?.shortTitle ?? "Siapa yang akan membantu Anda?") : (copy?.title ?? "Tim konsultan berlisensi yang mendampingi Anda")}
            </h2>

          <p className={`mt-4 max-w-[620px] text-[1rem] leading-[1.7] ${ringkas ? "text-white/70" : "text-teks-sekunder"}`}>
            {ringkas
              ? (copy?.shortDescription ?? "Pertanyaan Anda akan ditangani oleh konsultan berlisensi yang memahami kebutuhan pajak dan akuntansi bisnis secara langsung.")
              : (copy?.description ?? "Setiap klien ditangani oleh konsultan yang sesuai dengan kebutuhan dan keahliannya, dengan pendampingan yang personal, jelas, dan terukur.")}
          </p>
        </div>

        <ul className={ringkas ? "mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" : "mt-12 grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 lg:grid-cols-4"}>
          {tim.map((orang) => (
            <li
              key={orang.nama}
              className={ringkas ? "flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-[var(--transition-base)] hover:border-yellow-500/40 hover:bg-white/10" : "group overflow-hidden rounded-2xl border border-garis bg-white shadow-sm transition-[var(--transition-base)] hover:-translate-y-1.5 hover:border-yellow-500/60 hover:shadow-lg"}
            >
              <div className={ringkas ? "relative shrink-0" : "relative w-full"}>
                <span className={ringkas ? "block h-16 w-16 overflow-hidden rounded-full border-2 border-white/20" : "block h-64 w-full overflow-hidden bg-netral-lat"}>
                  <Image
                    src={orang.foto}
                    alt={orang.nama}
                    width={ringkas ? 128 : 224}
                    height={ringkas ? 128 : 224}
                    sizes={ringkas ? "64px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                    className={ringkas ? "h-full w-full object-cover grayscale transition-[var(--transition-base)] hover:grayscale-0" : "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"}
                  />
                </span>

              </div>

              <div className={ringkas ? "min-w-0 text-left" : "px-5 pb-5 pt-6"}>
                <h3 className={ringkas ? "font-heading text-[1.1rem] leading-tight font-bold tracking-[-0.02em] text-white" : "font-heading text-[1.12rem] leading-tight font-bold tracking-[-0.02em] text-navy-900"}>
                  {orang.nama}
                </h3>
                <p className="mt-1 text-[0.82rem] font-semibold text-yellow-500">
                  {orang.jabatan}
                </p>
                <p className={ringkas ? "mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.04em] text-white/85 uppercase" : "mt-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/12 px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.04em] text-navy-900 uppercase"}>
                  <Perisai className="h-3 w-3 text-yellow-500" />
                  Konsultan {orang.lisensi} Level {orang.level}
                </p>
              </div>

              {!ringkas && <p className="px-5 pb-5 text-[0.88rem] leading-[1.65] text-teks-sekunder">{orang.bio}</p>}

            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
