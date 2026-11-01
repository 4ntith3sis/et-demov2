import Image from "next/image";
import Link from "next/link";

import { Dokumen, Jam, Pengguna, Rumah } from "@/components/ikon";
import type { ArtikelBeranda } from "@/data/artikel";

/**
 * Hero halaman detail artikel /tulisan-pajak/[slug].
 *
 * Header artikel terpusat di latar putih dengan foto lebar, mengikuti
 * susunan editorial referensi dan mempertahankan identitas EasyTax.
 */
export function ArtikelDetailHero({
  artikel,
  penulis,
}: {
  artikel: ArtikelBeranda;
  penulis: string;
}) {
  return (
    <section className="bg-white px-6 pt-8 pb-8 text-navy-900 md:px-8 md:pt-10">
      <div className="mx-auto w-full max-w-maks">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[0.88rem] text-teks-redup"
        >
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Rumah className="h-3.5 w-3.5" />
            Beranda
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/tulisan-pajak" className="no-underline">
            Artikel &amp; Edukasi Perpajakan
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-bold text-navy-900">{artikel.kategori}</span>
        </nav>

        <div className="mx-auto max-w-[1000px] text-center 2xl:max-w-[1120px]">
        <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.05em] text-navy-900 uppercase">
          {artikel.kategori}
        </span>

        <h1 className="mx-auto mt-3 max-w-[900px] font-heading text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.15] font-black tracking-[-0.03em] text-navy-900 text-balance 2xl:text-[3.25rem]">
          {artikel.judul}
        </h1>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li className="flex items-center gap-2 text-[0.86rem] text-teks-redup">
            <Pengguna className="h-4 w-4 text-navy-900" />
            {penulis}
          </li>
          <li className="flex items-center gap-2 text-[0.86rem] text-teks-redup">
            <Dokumen className="h-4 w-4 text-navy-900" />
            {artikel.tanggal}
          </li>
          <li className="flex items-center gap-2 text-[0.86rem] text-teks-redup">
            <Jam className="h-4 w-4 text-navy-900" />
            {artikel.waktuBaca}
          </li>
        </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-6 w-full max-w-[1000px] 2xl:max-w-[1120px]">
        <div className="relative h-[240px] overflow-hidden rounded-xl bg-netral-lat sm:h-[340px] lg:h-[420px] 2xl:h-[460px]">
          <Image
            src={artikel.gambar}
            alt={artikel.judul}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, (max-width: 1535px) 1000px, 1120px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
