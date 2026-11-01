import type { Metadata } from "next";
import { Suspense } from "react";

import { PengantarArtikel } from "@/components/sections/PengantarArtikel";
import { DaftarArtikel, ambilKategori } from "@/components/sections/DaftarArtikel";
import { CTA } from "@/components/sections/CTA";
import { ambilArtikelPublik, ambilPengaturanSitus } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await ambilPengaturanSitus();
  return {
    title: `${settings.seo?.articlesTitle ?? "Artikel & Edukasi Perpajakan"} | ${settings.nama}`,
    description:
      settings.seo?.articlesDescription ??
      "Pusat artikel dan edukasi perpajakan EasyTax: panduan praktis SPT, PKP, pembukuan, dan strategi pajak untuk bisnis.",
  };
}

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
  const [artikelPublik, settings] = await Promise.all([ambilArtikelPublik(), ambilPengaturanSitus()]);
  const kategori = ambilKategori(artikelPublik);
  const slugDikenal = new Set(kategori.map((k) => k.slug));
  const kategoriAktif =
    params.kategori && slugDikenal.has(params.kategori)
      ? params.kategori
      : undefined;

  /* Pencarian: cocok di judul maupun ringkasan, case-insensitive. */
  const kueri = (params.q ?? "").trim();
  const q = kueri.toLowerCase();
  const terpilih = artikelPublik.filter((a) => {
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
      <PengantarArtikel copy={{ label: settings.articlesPage?.heroLabel, title: settings.articlesPage?.heroTitle, description: settings.articlesPage?.heroDescription }} />

      <DaftarArtikel
        artikel={artikel}
        kategori={kategori}
        kategoriAktif={kategoriAktif}
        page={halamanAman}
        totalPages={totalPages}
        totalDocs={totalDocs}
        kueri={kueri}
        copy={{
          listTitle: settings.articlesPage?.listTitle,
          searchPlaceholder: settings.articlesPage?.searchPlaceholder,
          searchButton: settings.articlesPage?.searchButton,
          allLabel: settings.articlesPage?.allLabel,
        }}
      />

      <CTA
        settings={{
          ...settings,
          cta: {
            label: settings.articlesPage?.ctaLabel,
            title: settings.articlesPage?.ctaTitle,
            description: settings.articlesPage?.ctaDescription,
            buttonLabel: settings.articlesPage?.ctaButton,
          },
        }}
      />
    </>
  );
}
