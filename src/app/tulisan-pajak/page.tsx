import type { Metadata } from "next";
import { Suspense } from "react";

import { ArtikelHero } from "@/components/sections/ArtikelHero";
import { DaftarArtikel, ambilKategori } from "@/components/sections/DaftarArtikel";
import { Obrolan, PanahKanan } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import { artikelBeranda } from "@/data/artikel";
import { situs } from "@/data/situs";

export const metadata: Metadata = {
  title: "Artikel & Edukasi Perpajakan | EasyTax",
  description:
    "Pusat artikel dan edukasi perpajakan EasyTax: panduan praktis SPT, PKP, pembukuan, dan strategi pajak untuk bisnis.",
};

const UKURAN_HALAMAN = 6;

type SearchParams = Promise<{ page?: string; kategori?: string; q?: string }>;

/**
 * `searchParams` hanya boleh dibaca di dalam <Suspense> (Next.js dengan
 * cacheComponents), jadi halaman membungkus seluruh isinya dengan
 * fallback ringan.
 */
export default function TulisanPajakPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<FallbackArtikel />}>
      <IsiTulisanPajak searchParams={searchParams} />
    </Suspense>
  );
}

function FallbackArtikel() {
  return <div className="min-h-[60vh] bg-white" aria-busy="true" />;
}

async function IsiTulisanPajak({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  /* Halaman: guard against nilai ngawur di URL. */
  const mentah = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(mentah) && mentah > 0 ? mentah : 1;

  /* Kategori: hanya slug yang benar-benar ada yang diterima. */
  const kategori = ambilKategori(artikelBeranda);
  const slugDikenal = new Set(kategori.map((k) => k.slug));
  const kategoriAktif =
    params.kategori && slugDikenal.has(params.kategori)
      ? params.kategori
      : undefined;

  /* Pencarian: cocok di judul maupun ringkasan, case-insensitive. */
  const kueri = (params.q ?? "").trim();
  const q = kueri.toLowerCase();
  const terpilih = artikelBeranda.filter((a) => {
    if (kategoriAktif && a.kategori.toLowerCase() !== kategoriAktif) return false;
    if (!q) return true;
    return (
      a.judul.toLowerCase().includes(q) || a.ringkasan.toLowerCase().includes(q)
    );
  });

  const totalDocs = terpilih.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / UKURAN_HALAMAN));
  const halamanAman = Math.min(page, totalPages);
  const artikel = terpilih.slice(
    (halamanAman - 1) * UKURAN_HALAMAN,
    halamanAman * UKURAN_HALAMAN,
  );

  return (
    <>
      <ArtikelHero />

      <DaftarArtikel
        artikel={artikel}
        kategori={kategori}
        kategoriAktif={kategoriAktif}
        page={halamanAman}
        totalPages={totalPages}
        totalDocs={totalDocs}
        kueri={kueri}
      />

      {/* CTA penutup — diport dari `.article-cta` easytax-demo. */}
      <section className="bg-white pt-[70px] pb-[70px]">
        <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 rounded-xl bg-navy-hero px-10 py-[50px] text-center max-sm:px-5 max-sm:py-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/45 bg-yellow-500/15 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-yellow-500 uppercase">
            Konsultasi Gratis
          </span>

          <h2 className="my-3 max-w-[720px] font-heading text-[2.2rem] leading-[1.2] font-black tracking-[-0.02em] text-white text-balance max-sm:text-[1.55rem]">
            Ingin Diskusi Langsung Mengenai Pajak Bisnis Anda?
          </h2>

          <p className="mx-auto mb-7.5 max-w-[650px] text-[1rem] leading-[1.7] text-teks-terang">
            Tim konsultan pajak resmi EasyTax siap membantu menganalisis laporan
            keuangan dan strategi efisiensi bebas denda.
          </p>

          <Tombol
            href={situs.whatsappUrl}
            external
            ukuran="sedang"
            ikonKiri={<Obrolan className="h-4 w-4" />}
            ikonKanan={<PanahKanan className="h-4 w-4" />}
            className="py-[13px] px-7 text-[0.95rem]"
          >
            Chat Konsultan via WhatsApp
          </Tombol>
        </div>
        </div>
      </section>
    </>
  );
}