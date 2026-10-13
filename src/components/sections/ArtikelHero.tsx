import Image from "next/image";
import Link from "next/link";

import {
  Dokumen,
  Centang,
  PanahKanan,
  Rumah,
  Bintang,
  Pengguna,
} from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";

/**
 * Hero halaman /tulisan-pajak.
 *
 * Diport dari `AboutHero` easytax-demo dengan pengubahan kelas
 * `article-listing-hero`: badge disembunyikan, tiga trust item disusun
 *dua kolom, dan tiga kartu informasividio melayang mengelilingi foto.
 */
const INFO = [
  { ikon: <Bintang className="h-4 w-4" />, teks: "Informasi praktis" },
  { ikon: <Dokumen className="h-4 w-4" />, teks: "Bahasa mudah dipahami" },
  { ikon: <Pengguna className="h-4 w-4" />, teks: "Relevan bagi pelaku usaha" },
];

/** Posisi tiap kartu informasi di sekeliling foto, mengikuti v1. */
const POSISI = [
  "left-4 top-5",
  "right-4 top-1/2 -translate-y-1/2",
  "bottom-5 left-4",
];

export function ArtikelHero() {
  return (
    <section className="border-b border-white/10 bg-navy-hero px-6 pt-[60px] pb-[70px] text-white md:px-8">
      <div className="mx-auto grid w-full max-w-maks grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.88rem] text-teks-terang max-md:mb-[22px]"
          >
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Rumah className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="font-bold text-yellow-500">
              Artikel &amp; Edukasi Perpajakan
            </span>
          </nav>

          <h1 className="my-[18px] font-heading text-[3rem] leading-[1.18] font-black tracking-[-0.02em] text-white max-md:text-[2.2rem]">
            Wawasan Bisnis &amp; Perpajakan untuk{" "}
            <span className="text-yellow-500">Keputusan yang Lebih Tepat</span>
          </h1>

          <p className="max-w-[672px] text-[1.05rem] leading-[1.625] text-teks-terang">
            Temukan informasi dan wawasan seputar perpajakan, akuntansi, serta
            pengelolaan bisnis untuk mendukung keputusan usaha Anda.
          </p>

          <div className="mt-7 w-fit">
            <Tombol
              href="#daftar-artikel"
              varian="garisPutih"
              ukuran="sedang"
              ikonKanan={<PanahKanan className="h-4 w-4 rotate-90" />}
              className="w-fit gap-2.5 rounded-md border-[1.5px] border-white/30 bg-white/8 py-[13px] px-7 text-[0.95rem] backdrop-blur-md"
            >
              Jelajahi Artikel
            </Tombol>
          </div>

          <ul className="mt-[18px] grid grid-cols-1 items-center gap-x-7 gap-y-3 sm:grid-cols-[repeat(2,max-content)] sm:gap-y-3">
            {[
              "Pahami Aturan Pajak",
              "Temukan Solusi Praktis",
              "Kelola Bisnis Lebih Baik",
            ].map((item, i) => (
              <li
                key={item}
                className={
                  i === 2
                    ? "flex items-center gap-2 text-[0.9rem] font-semibold whitespace-nowrap text-white sm:col-start-1"
                    : "flex items-center gap-2 text-[0.9rem] font-semibold whitespace-nowrap text-white"
                }
              >
                <Centang className="h-4 w-4 shrink-0 text-emerald-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Foto + tiga kartu informasi yang mengelilinginya */}
        <div className="relative min-h-[352px] rounded-[28px] border border-garis bg-navy-950 shadow-lg">
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80"
              alt="Dokumen laporan keuangan dan kalkulator untuk analisis bisnis"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {INFO.map((info, i) => (
            <div
              key={info.teks}
              className={`absolute flex max-w-[190px] items-center gap-2.25 rounded-[14px] border border-garis bg-white/96 px-3.25 py-2.25 shadow-[0_10px_24px_rgb(10_22_40/0.14)] ${POSISI[i]} ${i === 1 ? "" : "animasi-layang"}`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-navy-hero text-yellow-500">
                {info.ikon}
              </span>
              <span className="text-[0.72rem] leading-[1.25] font-bold break-words text-navy-900">
                {info.teks}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}