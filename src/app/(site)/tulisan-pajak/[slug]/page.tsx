import type { Metadata } from "next";
import { artikelBeranda } from "@/data/artikel";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { ArtikelDetailHero } from "@/components/sections/ArtikelDetailHero";
import { ArtikelTerkait } from "@/components/sections/ArtikelTerkait";
import { BadanArtikel } from "@/components/sections/BadanArtikel";
import { CTA } from "@/components/sections/CTA";
import { ekstrakHeading, type BlokIsi } from "@/lib/artikel/toc";
import { ambilArtikelPublik, ambilDetailArtikelCMS, ambilPengaturanSitus } from "@/lib/cms/content";

type Params = Promise<{ slug: string }>;

/** Prerender semua slug artikel yang ada di data. */
export async function generateStaticParams() {
  return artikelBeranda.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await ambilDetailArtikelCMS(slug);
  const artikel = cms?.artikel ?? (await ambilArtikelPublik()).find((a) => a.slug === slug);
  if (!artikel) return { title: "Artikel Tidak Ditemukan | EasyTax" };

  return {
    title: `${artikel.seoTitle || artikel.judul} | EasyTax`,
    description: artikel.seoDescription || artikel.ringkasan,
    openGraph: {
      title: artikel.seoTitle || artikel.judul,
      description: artikel.seoDescription || artikel.ringkasan,
      images: [artikel.gambar],
      type: "article",
      locale: "id_ID",
      siteName: "EasyTax",
    },
  };
}

/**
 * `params` hanya boleh dibaca di dalam <Suspense> (Next.js dengan
 * cacheComponents), jadi halaman membungkus seluruh isinya dengan
 * fallback ringan.
 */
export default function HalamanArtikel({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={<div className="min-h-[70vh] bg-navy-900" aria-busy="true" />}
    >
      <DetailArtikel params={params} />
    </Suspense>
  );
}

async function DetailArtikel({ params }: { params: Params }) {
  await connection();
  return <IsiArtikelHalaman params={params} />;
}

async function IsiArtikelHalaman({ params }: { params: Params }) {
  const { slug } = await params;
  const [cms, settings, articles] = await Promise.all([ambilDetailArtikelCMS(slug), ambilPengaturanSitus(), ambilArtikelPublik()]);
  const artikel = cms?.artikel ?? articles.find((a) => a.slug === slug);
  if (!artikel) notFound();

  const detail = cms?.detail;
  const blok: BlokIsi[] = detail?.blok ?? [
    { kind: "paragraph", text: artikel.ringkasan },
  ];
  const headings = ekstrakHeading(blok);

  /* Terkait: satu kategori dulu, sisanya diisi artikel lain. */
  const lain = articles.filter((a) => a.slug !== slug);
  const seKategori = lain.filter((a) => a.kategori === artikel.kategori);
  const lainnya = lain.filter((a) => a.kategori !== artikel.kategori);
  const terkait = [...seKategori, ...lainnya].slice(0, 3);

  return (
    <>
      <ArtikelDetailHero
        artikel={artikel}
        penulis={detail?.penulis ?? "Tim Konsultan EasyTax"}
      />
      <BadanArtikel
        blok={blok}
        tags={detail?.tags ?? []}
        headings={headings}
        ringkasan={artikel.ringkasan}
      />
      <ArtikelTerkait
        artikel={terkait}
        copy={{
          label: settings.articlesPage?.relatedLabel,
          title: settings.articlesPage?.relatedTitle,
          description: settings.articlesPage?.relatedDescription,
          readMore: settings.articlesPage?.readMore,
        }}
      />
      <CTA settings={settings} />
    </>
  );
}
