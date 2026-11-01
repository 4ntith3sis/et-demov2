import type { Metadata } from "next";

import { CaraKerja } from "@/components/sections/CaraKerja";
import { DaftarLayanan } from "@/components/sections/DaftarLayanan";
import { Keunggulan } from "@/components/sections/Keunggulan";
import { LayananHero } from "@/components/sections/LayananHero";
import { MediaNasional } from "@/components/sections/MediaNasional";
import { Mitra } from "@/components/sections/Mitra";
import { Statistik } from "@/components/sections/Statistik";
import { Testimoni } from "@/components/sections/Testimoni";
import { ambilLayananPublik, ambilMitra, ambilTestimoni, ambilLiputanMedia, ambilPengaturanSitus } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await ambilPengaturanSitus();
  return {
    title: `${settings.seo?.servicesTitle ?? "Layanan Perpajakan & Akuntansi"} | ${settings.nama}`,
    description:
      settings.seo?.servicesDescription ??
      "Layanan perpajakan dan akuntansi EasyTax: pelaporan SPT, pembukuan, pengurusan PKP, dan pendampingan audit.",
  };
}

/**
 * Halaman /layanan. Susunannya: hero, advantages (reuse), katalog layanan,
 * cara kerja, lalu blok kepercayaan yang sama dengan beranda.
 */
export default async function LayananPage() {
  const [layanan, mitra, testimoni, media, settings] = await Promise.all([ambilLayananPublik(), ambilMitra(), ambilTestimoni(), ambilLiputanMedia(), ambilPengaturanSitus()]);
  return (
    <>
      <LayananHero settings={settings} />
      <Statistik statistik={settings.statistics} />
      <Keunggulan content={settings.keunggulan} />
      <DaftarLayanan
        layananBeranda={layanan}
        copy={{
          label: settings.servicesPage?.catalogLabel,
          title: settings.servicesPage?.catalogTitle,
          searchPlaceholder: settings.servicesPage?.searchPlaceholder,
        }}
      />
      <CaraKerja content={settings.workflow} />
      <Mitra clients={mitra.clients} supported={mitra.supported} settings={{ label: settings.brandLabel, title: settings.brandName, description: settings.brandDescription, clientsLabel: settings.ourClientsLabel, supportedLabel: settings.supportedByLabel, facts: settings.brandFacts }} />
      {media && <MediaNasional media={media} heading={settings.mediaHeading} />}
      <Testimoni testimoni={testimoni} copy={{ label: settings.testimonialsLabel, title: settings.testimonialsTitle, description: settings.testimonialsDescription }} />
    </>
  );
}
