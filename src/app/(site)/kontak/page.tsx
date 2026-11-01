import type { Metadata } from "next";

import { FaqKontak } from "@/components/sections/FaqKontak";
import { FormPertanyaan } from "@/components/sections/FormPertanyaan";
import { KontakHero } from "@/components/sections/KontakHero";
import { LokasiKantor } from "@/components/sections/LokasiKantor";
import { ambilFaqKontak, ambilKantor, ambilPengaturanSitus } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await ambilPengaturanSitus();
  const title = `${settings.seo?.contactTitle ?? "Hubungi Kami"} | ${settings.nama}`;
  return {
    title,
    description:
      settings.seo?.contactDescription ??
      "Hubungi tim konsultan pajak dan akuntansi EasyTax. Chat WhatsApp, email, telepon, atau kirim pertanyaan lewat form. Kantor pusat di Jakarta Selatan.",
    openGraph: {
      title,
      description:
        settings.seo?.contactDescription ??
        "Hubungi tim konsultan pajak dan akuntansi EasyTax — WhatsApp, email, telepon, atau form pertanyaan.",
      type: "website",
      locale: "id_ID",
      siteName: settings.nama,
    },
  };
}

/**
 * Halaman /kontak. Struktur disamakan dengan easytax-demo (v1):
 * hero + 3 kartu kontak, form pertanyaan dengan side info, lokasi kantor
 * (hanya satu kantor pusat), dan FAQ. Visual memakai design system v2.
 */
export default async function KontakPage() {
  const [faqKontak, kantor, settings] = await Promise.all([ambilFaqKontak(), ambilKantor(), ambilPengaturanSitus()]);
  return (
    <>
      <KontakHero settings={settings} />
      <FormPertanyaan settings={settings} />
      <LokasiKantor kantor={kantor} copy={{ label: settings.officeLabel, title: settings.officeSectionTitle, description: settings.officeSectionDescription }} />
      <FaqKontak faqKontak={faqKontak} copy={{ label: settings.copy?.contactFaqLabel, title: settings.copy?.contactFaqTitle, description: settings.copy?.contactFaqDescription }} />
    </>
  );
}
