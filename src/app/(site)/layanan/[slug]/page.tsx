import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { CTA } from "@/components/sections/CTA";
import { CaraKerja } from "@/components/sections/CaraKerja";
import { FaqLayanan } from "@/components/sections/FaqLayanan";
import { HargaLayanan } from "@/components/sections/HargaLayanan";
import { Keunggulan } from "@/components/sections/Keunggulan";
import { LayananDetailHero } from "@/components/sections/LayananDetailHero";
import { MediaNasional } from "@/components/sections/MediaNasional";
import { Mitra } from "@/components/sections/Mitra";
import { PembayaranShopee } from "@/components/sections/PembayaranShopee";
import { Statistik } from "@/components/sections/Statistik";
import { Testimoni } from "@/components/sections/Testimoni";
import { layananBeranda } from "@/data/layanan";
import { cariDetailLayanan } from "@/data/layanan-detail";
import { ambilDetailLayananCMS, ambilLayananPublik, ambilMitra, ambilTestimoni, ambilLiputanMedia, ambilPengaturanSitus } from "@/lib/cms/content";

type Params = Promise<{ slug: string }>;

/** Prerender semua slug layanan yang ada di data. */
export async function generateStaticParams() {
  return layananBeranda.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const services = await ambilLayananPublik();
  const layanan = services.find((l) => l.slug === slug);
  if (!layanan) return { title: "Layanan Tidak Ditemukan | EasyTax" };

  return {
    title: `${layanan.seoTitle || layanan.judul} | EasyTax`,
    description: layanan.seoDescription || layanan.ringkasan,
  };
}

/**
 * `params` hanya boleh dibaca di dalam <Suspense> (Next.js dengan
 * cacheComponents), jadi halaman membungkus seluruh isinya dengan
 * fallback ringan.
 */
export default function HalamanLayanan({ params }: { params: Params }) {
  return <Suspense fallback={<div className="min-h-[70vh] bg-navy-900" aria-busy="true" />}><DetailLayanan params={params} /></Suspense>;
}

async function DetailLayanan({ params }: { params: Params }) {
  await connection();
  return (
    <IsiLayanan params={params} />
  );
}

async function IsiLayanan({ params }: { params: Params }) {
  const { slug } = await params;
  const [services, mitra, testimoni, media, settings] = await Promise.all([ambilLayananPublik(), ambilMitra(), ambilTestimoni(), ambilLiputanMedia(), ambilPengaturanSitus()]);
  const layanan = services.find((l) => l.slug === slug);
  if (!layanan) notFound();

  const detail = (await ambilDetailLayananCMS(slug)) ?? cariDetailLayanan(slug);

  return (
    <>
      <LayananDetailHero layanan={layanan} settings={settings} />
      <Statistik statistik={settings.statistics} />
      <Keunggulan content={settings.keunggulan} />
      <PembayaranShopee />
      <HargaLayanan
        paket={detail?.paket ?? []}
        whatsappUrl={settings.whatsappUrl}
        copy={{
          label: settings.servicesPage?.pricingLabel,
          title: settings.servicesPage?.pricingTitle,
          description: settings.servicesPage?.pricingDescription,
          ctaLabel: settings.servicesPage?.detailCtaLabel,
        }}
      />
      <CaraKerja content={settings.workflow} />
      <Mitra clients={mitra.clients} supported={mitra.supported} settings={{ label: settings.brandLabel, title: settings.brandName, description: settings.brandDescription, clientsLabel: settings.ourClientsLabel, supportedLabel: settings.supportedByLabel, facts: settings.brandFacts }} />
      {media && <MediaNasional media={media} heading={settings.mediaHeading} />}
      <Testimoni testimoni={testimoni} copy={{ label: settings.testimonialsLabel, title: settings.testimonialsTitle, description: settings.testimonialsDescription }} />
      <FaqLayanan faq={detail?.faq ?? []} copy={{ label: settings.servicesPage?.faqLabel, title: settings.servicesPage?.faqTitle }} />
      <CTA settings={settings} />
    </>
  );
}
