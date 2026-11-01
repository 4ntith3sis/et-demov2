import { Artikel } from "@/components/sections/Artikel";
import { CTA } from "@/components/sections/CTA";
import { CaraKerja } from "@/components/sections/CaraKerja";
import { Hero } from "@/components/sections/Hero";
import { Keunggulan } from "@/components/sections/Keunggulan";
import { Layanan } from "@/components/sections/Layanan";
import { MediaNasional } from "@/components/sections/MediaNasional";
import { Mitra } from "@/components/sections/Mitra";
import { PembayaranShopee } from "@/components/sections/PembayaranShopee";
import { Testimoni } from "@/components/sections/Testimoni";
import { ambilArtikelPublik, ambilLayananPublik, ambilMitra, ambilTestimoni, ambilLiputanMedia, ambilPengaturanSitus } from "@/lib/cms/content";

export async function generateMetadata() {
  const settings = await ambilPengaturanSitus();
  return {
    title: settings.seo?.homeTitle ? `${settings.seo.homeTitle} | ${settings.nama}` : `${settings.nama} - ${settings.subjudul}`,
    description: settings.seo?.homeDescription || settings.deskripsi,
  };
}

/**
 * Landing page EasyTax.
 *
 * Section berikutnya menyusul — masing-masing menunggu referensi desain
 * dulu, lalu dibuat satu per satu.
 */
export default async function HomePage() {
  const [artikel, layanan, mitra, testimoni, media, settings] = await Promise.all([ambilArtikelPublik(), ambilLayananPublik(), ambilMitra(), ambilTestimoni(), ambilLiputanMedia(), ambilPengaturanSitus()]);
  return (
    <>
      <Hero settings={settings} />
      <Keunggulan content={settings.keunggulan} />
      <PembayaranShopee />
      <Layanan layananBeranda={layanan} copy={settings.copy} />
      <CaraKerja content={settings.workflow} />
      <Artikel artikelBeranda={artikel} copy={settings.copy} />
      <Mitra clients={mitra.clients} supported={mitra.supported} settings={{ label: settings.brandLabel, title: settings.brandName, description: settings.brandDescription, clientsLabel: settings.ourClientsLabel, supportedLabel: settings.supportedByLabel, facts: settings.brandFacts }} />
      {media && <MediaNasional media={media} heading={settings.mediaHeading} />}
      <Testimoni testimoni={testimoni} copy={{ label: settings.testimonialsLabel, title: settings.testimonialsTitle, description: settings.testimonialsDescription }} />
      <CTA settings={settings} />
    </>
  );
}
