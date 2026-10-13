import Image from "next/image";

import { Centang, Medali, PanahKanan, Perisai } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import { situs } from "@/data/situs";

const FOTO_HERO =
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80";

const BUKTI =
  "Membantu ribuan UMKM dan perusahaan menyusun laporan keuangan, e-filing SPT Tahunan/Masa, pengukuhan PKP, hingga pendampingan audit pajak 100% online & resmi.";

/**
 * Hero v1 EasyTax dipulihkan: latar navy penuh, dua kolom (55/45).
 * Kolom kiri berisi tag pill, judul, deskripsi, dua CTA, dan baris bukti;
 * kolom kanan foto dengan gradien kiri serta badge sertifikat mengambang.
 *
 * Section kedua (Keunggulan) tidak lagi meniru isi hero ini.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-judul"
      className="relative overflow-hidden bg-navy-hero text-white"
    >
      <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-[minmax(0,55%)_minmax(0,45%)]">
        {/* Kolom teks */}
        <div className="z-3 flex flex-col justify-center px-6 pt-[clamp(52px,6vw,92px)] pb-[clamp(52px,6vw,92px)] md:px-8 lg:pr-9 lg:pl-[max(24px,calc((100vw-1200px)/2+24px))]">
          <p className="inline-flex w-max max-w-full items-center gap-2.5 rounded-full border border-white/16 bg-white/6 px-4 py-2.5 text-[0.78rem] font-extrabold tracking-[0.13em] text-yellow-400 uppercase">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-yellow-500" />
            Konsultan Pajak &amp; Akuntansi
          </p>

          <h1
            id="hero-judul"
            className="mt-5.5 mb-6 max-w-[640px] font-heading text-[clamp(2.6rem,4vw,3.4rem)] leading-[1.08] font-black tracking-[-0.03em] text-white uppercase"
          >
            Terpercaya,{" "}
            <span className="text-yellow-500">akurat &amp; bebas denda.</span>
          </h1>

          <p className="mb-8 max-w-[520px] text-[1.08rem] leading-[1.7] text-teks-terang">
            {BUKTI}
          </p>

          <div className="mb-[30px] flex flex-wrap gap-4">
            <Tombol
              href={situs.whatsappUrl}
              external
              ukuran="sedang"
              ikonKanan={<PanahKanan className="h-4 w-4" />}
              className="h-[54px] rounded-full px-9 text-[1rem]"
            >
              Konsultasi Gratis
            </Tombol>
            <Tombol
              href="/layanan"
              varian="garisPutih"
              ukuran="sedang"
              className="h-[54px] rounded-full px-8 text-[1rem]"
            >
              Lihat Layanan Kami
            </Tombol>
          </div>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
            {[
              "Pendampingan Audit & SP2DK",
              "Konsultan Berizin Resmi",
              "Garansi Kerahasiaan 100%",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[0.92rem] font-bold text-white"
              >
                <Centang className="h-4.5 w-4.5 shrink-0 text-emerald-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom media */}
        <div className="relative h-[min(52vh,480px)] lg:h-auto lg:min-h-[calc(100vh-72px)]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-1 w-full bg-[linear-gradient(180deg,rgb(10_22_40/0)_0%,rgb(10_22_40/0.55)_60%,rgb(10_22_40/0.85)_100%)] lg:w-[40%] lg:bg-[linear-gradient(90deg,rgb(10_22_40/0.95)_0%,rgb(10_22_40/0.55)_40%,rgb(10_22_40/0.15)_62%,rgb(10_22_40/0)_78%)]"
          />
          <Image
            src={FOTO_HERO}
            alt="EasyTax Konsultan Pajak & Akuntansi"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-x-5 bottom-5 z-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 rounded-xl border border-white/20 bg-[rgba(12,23,54,0.92)] px-6 py-3.5 shadow-lg backdrop-blur-[14px] lg:inset-x-auto lg:right-8 lg:bottom-8 lg:flex-nowrap">
            <span className="flex shrink-0 items-center gap-2 text-[0.8rem] leading-none font-extrabold text-white whitespace-nowrap">
              <Medali className="h-5.5 w-5.5 shrink-0 text-yellow-500" />
              Konsultan Berizin Resmi
            </span>
            <span className="hidden h-[30px] w-px bg-white/20 sm:block" />
            <span className="flex shrink-0 items-center gap-2 text-[0.8rem] leading-none font-extrabold text-white whitespace-nowrap">
              <Perisai className="h-5.5 w-5.5 shrink-0 text-emerald-accent" />
              Terdaftar Resmi Kemenkeu/DJP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}