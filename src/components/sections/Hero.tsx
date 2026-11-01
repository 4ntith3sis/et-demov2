import Image from "next/image";
import { Fragment } from "react";

import { Bintang, Centang, Medali, PanahKanan, Perisai } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import type { ambilPengaturanSitus } from "@/lib/cms/content";

const FOTO_HERO = "/images/hero/easytax-resmi.webp";

const BUKTI =
  "Membantu ribuan UMKM dan perusahaan menyusun laporan keuangan, e-filing SPT Tahunan/Masa, pengukuhan PKP, hingga pendampingan audit pajak 100% online & resmi.";

/**
 * Hero v1 EasyTax dipulihkan: latar navy penuh, dua kolom (55/45).
 * Kolom kiri berisi tag pill, judul, deskripsi, dua CTA, dan baris bukti;
 * kolom kanan foto dengan gradien kiri serta badge sertifikat mengambang.
 *
 * Section kedua (Keunggulan) tidak lagi meniru isi hero ini.
 */
export function Hero({ settings }: { settings: Awaited<ReturnType<typeof ambilPengaturanSitus>> }) {
  return (
    <>
    <section
      id="hero"
      aria-labelledby="hero-judul"
      className="relative overflow-hidden bg-navy-900 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[42%] bottom-16 hidden h-24 w-24 bg-[radial-gradient(circle,var(--color-brand-yellow)_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-30 lg:block"
      />
      <div className="relative mx-auto w-full max-w-[1560px]">
      <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-[minmax(0,55%)_minmax(0,45%)]">
        {/* Kolom teks */}
        <div className="z-3 flex flex-col justify-center px-6 pt-[clamp(44px,5vw,72px)] pb-[clamp(40px,4.5vw,60px)] md:px-8 lg:pr-9 lg:pl-[max(16px,calc((100vw_-_var(--container-maks))/2_+_8px))]">
          <p className="inline-flex w-max max-w-full items-center gap-2.5 rounded-full border border-white/16 bg-white/6 px-4 py-2.5 text-[0.78rem] font-extrabold tracking-[0.13em] text-yellow-500 uppercase">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-yellow-500" />
            {settings.hero?.label ?? "Konsultan Pajak & Akuntansi"}
          </p>

          <h1
            id="hero-judul"
            className="mt-5.5 mb-6 max-w-[640px] font-heading text-[clamp(2.6rem,4vw,3.4rem)] leading-[1.08] font-black tracking-[-0.03em] text-white uppercase 2xl:max-w-[700px] 2xl:text-[3.8rem]"
          >
            {settings.hero?.titleStart ?? "Terpercaya,"}{" "}
            <span className="text-yellow-500">{settings.hero?.titleHighlight ?? "akurat & bebas denda."}</span>
          </h1>

          <p className="mb-8 max-w-[520px] text-[1.08rem] leading-[1.7] text-teks-terang">
            {settings.hero?.description ?? BUKTI}
          </p>

          <div className="mb-[30px] flex flex-wrap gap-4">
            <Tombol
              href={settings.whatsappUrl}
              external
              ukuran="sedang"
              ikonKanan={<PanahKanan className="h-4 w-4" />}
              className="h-[54px] rounded-full px-9 text-[1rem]"
            >
              {settings.hero?.ctaPrimary ?? "Konsultasi Gratis"}
            </Tombol>
            <Tombol
              href="/layanan"
              varian="garisPutih"
              ukuran="sedang"
              className="h-[54px] rounded-full px-8 text-[1rem]"
            >
              {settings.hero?.ctaSecondary ?? "Lihat Layanan Kami"}
            </Tombol>
          </div>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
            {(settings.hero?.proofPoints?.length ? settings.hero.proofPoints : [
              "Pendampingan Audit & SP2DK",
              "Strategi Pajak Tepat Sasaran",
              "Garansi Kerahasiaan 100%",
            ]).map((item: string) => (
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

        {/* Kolom media dan statistik */}
        <div className="flex flex-col">
          <div className="relative m-4 h-[min(52vh,480px)] sm:m-6 lg:m-6 lg:mb-4 lg:h-[clamp(480px,38vw,600px)]">
            <span
              aria-hidden="true"
              className="absolute -top-2 left-2 z-2 hidden h-20 w-20 bg-[radial-gradient(circle,var(--color-brand-navy)_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-20 sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute -right-2 bottom-14 z-2 hidden h-20 w-20 rounded-full border-[12px] border-yellow-500/15 sm:block"
            />
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[22px] bg-navy-900">
            <div
              aria-hidden="true"
              className="gradasi-hero-foto absolute inset-y-0 left-0 z-1 w-full lg:w-[40%]"
            />
            <Image
              src={settings.hero?.photo ?? FOTO_HERO}
              alt="EasyTax Konsultan Pajak & Akuntansi"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-x-5 bottom-8 z-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 rounded-xl border border-white/20 bg-navy-900/92 px-6 py-3.5 shadow-lg backdrop-blur-[14px] lg:inset-x-auto lg:right-8 lg:bottom-12 lg:flex-nowrap">
              {(settings.hero?.trustBadges?.length ? settings.hero.trustBadges : ["Konsultan Berizin Resmi", "Terdaftar Resmi Kemenkeu/DJP"]).map((badge: string, i: number) => (
                <Fragment key={badge}>
                  {i > 0 && <span aria-hidden="true" className="hidden h-[30px] w-px bg-white/20 sm:block" />}
                  <span className="flex shrink-0 items-center gap-2 text-[0.8rem] leading-none font-extrabold text-white whitespace-nowrap">
                    {i === 0 ? <Medali className="h-5.5 w-5.5 shrink-0 text-yellow-500" /> : <Perisai className="h-5.5 w-5.5 shrink-0 text-emerald-accent" />}
                    {badge}
                  </span>
                </Fragment>
              ))}
            </div>
            </div>
          </div>

        </div>
      </div>
      </div>
      <div
        aria-hidden="true"
        className="transisi-hero-statistik h-24"
      />
    </section>
      <div className="relative z-10 mx-auto -mt-14 w-[calc(100%-4rem)] max-w-[1080px] overflow-hidden rounded-2xl border border-garis bg-white shadow-[0_14px_34px_-16px_color-mix(in_srgb,var(--color-brand-navy)_28%,transparent)] sm:w-[calc(100%-10rem)] lg:w-[calc(100%-18rem)]">
        <span
          aria-hidden="true"
          className="absolute top-0 left-8 h-1 w-24 rounded-b-full bg-yellow-500 md:left-12"
        />
        <ul className="grid grid-cols-2 divide-x divide-y divide-garis lg:grid-cols-4 lg:divide-y-0">
          {(settings.statistics?.length ? settings.statistics : [
            { value: "13.000+", label: "Bisnis terlayani" },
            { value: "20+", label: "Konsultan bersertifikasi BKP" },
            { value: "4,9/5", label: "Rating Google" },
            { value: "100%", label: "Legal" },
          ]).map((statistik, i) => {
            const ikon = [<Medali key="m" className="h-5 w-5" />, <Perisai key="p" className="h-5 w-5" />, <Bintang key="b" className="h-5 w-5" />, <Centang key="c" className="h-5 w-5" />][i % 4];
            return (
            <li
              key={statistik.label}
              className="flex min-h-[112px] items-center justify-center gap-2.5 bg-white px-2.5 py-6 text-center sm:gap-3 sm:px-4 sm:text-left lg:px-5 lg:py-6"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow-500/15 text-yellow-500">
                {ikon}
              </span>
              <span className="min-w-0">
                <strong className="block font-heading text-[0.98rem] leading-none font-bold tracking-[-0.03em] text-navy-900 sm:text-[1.05rem]">
                  {statistik.value}
                </strong>
                <span className="mt-1 block max-w-[150px] text-[0.66rem] leading-[1.3] text-teks-redup sm:max-w-none sm:text-[0.68rem]">
                  {statistik.label}
                </span>
              </span>
            </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
