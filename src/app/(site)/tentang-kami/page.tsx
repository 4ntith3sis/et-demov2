import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { MediaNasional } from "@/components/sections/MediaNasional";
import { Mitra } from "@/components/sections/Mitra";
import { LokasiKantor } from "@/components/sections/LokasiKantor";
import { Testimoni } from "@/components/sections/Testimoni";
import { TentangHero } from "@/components/sections/TentangHero";
import { TimKonsultan } from "@/components/sections/TimKonsultan";
import { ambilKantor, ambilMitra, ambilTestimoni, ambilTimKonsultan, ambilLiputanMedia, ambilPengaturanSitus } from "@/lib/cms/content";
import { CeritaKami } from "@/components/sections/CeritaKami";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await ambilPengaturanSitus();
  return {
    title: `${settings.seo?.aboutTitle ?? "Tentang Kami"} | ${settings.nama}`,
    description:
      settings.seo?.aboutDescription ??
      "Kenali EasyTax: jasa konsultan pajak dan akuntansi dengan tim konsultan bersertifikat BKP yang mendampingi UMKM dan perusahaan.",
  };
}

/**
 * Halaman /tentang-kami: hero bersama dengan /layanan, lalu cerita dan
 * nilai kerja, tim konsultan, bukti sosial (media + testimoni), dan CTA.
 */
export default async function TentangKamiPage() {
  const [tim, kantor, mitra, testimoni, media, settings] = await Promise.all([ambilTimKonsultan(), ambilKantor(), ambilMitra(), ambilTestimoni(), ambilLiputanMedia(), ambilPengaturanSitus()]);
  return (
    <>
      <TentangHero settings={settings} />
      <CeritaKami content={settings.about} />
      <TimKonsultan tim={tim} copy={settings.team} />
      <LokasiKantor kantor={kantor} copy={{ label: settings.officeLabel, title: settings.officeSectionTitle, description: settings.officeSectionDescription }} />
      <Mitra clients={mitra.clients} supported={mitra.supported} settings={{ label: settings.brandLabel, title: settings.brandName, description: settings.brandDescription, clientsLabel: settings.ourClientsLabel, supportedLabel: settings.supportedByLabel, facts: settings.brandFacts }} />
      {media && <MediaNasional media={media} heading={settings.mediaHeading} />}
      <Testimoni testimoni={testimoni} copy={{ label: settings.testimonialsLabel, title: settings.testimonialsTitle, description: settings.testimonialsDescription }} />
      <CTA settings={settings} />
    </>
  );
}
