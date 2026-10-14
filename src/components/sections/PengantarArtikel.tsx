import Link from "next/link";

import { Rumah } from "@/components/ikon";

/**
 * Pengantar editorial halaman /tulisan-pajak: breadcrumb kecil, eyebrow
 * "Pusat Edukasi EasyTax", judul halaman, dan deskripsi ringkas.
 * Menggantikan hero pemasaran besar agar pencarian dan daftar artikel
 * cepat terlihat.
 */
export function PengantarArtikel() {
  return (
    <section className="bg-white pt-5 pb-8 md:pt-6">
      <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[0.8rem] text-teks-redup"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 no-underline text-teks-sekunder transition-colors hover:text-navy-900"
          >
            <Rumah className="h-3 w-3" />
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-navy-900">
            Artikel &amp; Edukasi Perpajakan
          </span>
        </nav>

        <p className="mt-7 flex items-center gap-2.5 text-[0.8rem] font-bold tracking-[0.1em] text-navy-900 uppercase">
          <span aria-hidden="true" className="h-3.5 w-1 rounded-[2px] bg-yellow-500" />
          Pusat Edukasi EasyTax
        </p>

        <h1 className="mt-3 font-heading text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-navy-900">
          Artikel &amp; Edukasi Perpajakan
        </h1>

        <p className="mt-3.5 max-w-[560px] text-[1.02rem] leading-[1.65] text-teks-sekunder">
          Temukan panduan perpajakan, akuntansi, dan wawasan bisnis untuk
          membantu Anda mengambil keputusan dengan lebih tepat.
        </p>
      </div>
    </section>
  );
}
