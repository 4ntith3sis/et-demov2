import { Pengguna } from "@/components/ikon";
import { HeroPanel } from "@/components/ui/HeroPanel";
import type { ambilPengaturanSitus } from "@/lib/cms/content";

/** Hero halaman /layanan — memakai panel hero bersama. */
export function LayananHero({ settings }: { settings: Awaited<ReturnType<typeof ambilPengaturanSitus>> }) {
  const content = settings.servicesPage;
  const badges = content?.badges?.length ? content.badges : [
    { value: "+22%", label: "Efisiensi Pajak Meningkat" },
    { value: "300+ Industri", label: "yang Dilayani" },
  ];
  return (
    <HeroPanel
      className="border-b-0"
      remah={[
        { label: "Beranda", href: "/" },
        { label: "Layanan" },
      ]}
      judul={
        <>
          {content?.titleStart ?? "Solusi Lengkap Perpajakan &"}{" "}
          <span className="text-yellow-500">{content?.titleHighlight ?? "Finansial untuk Bisnis Anda"}</span>
        </>
      }
      deskripsi={content?.description ?? "Mulai dari pelaporan SPT tahunan, pembukuan bulanan, hingga pendampingan audit dan pengurusan PKP. Dikelola langsung oleh konsultan pajak berizin resmi (BKP) dan berpengalaman menangani berbagai industri di Indonesia."}
      tombolUtama={{
        label: settings.navCtaLabel,
        href: settings.whatsappUrl,
        eksternal: true,
      }}
      tombolSekunder={{ label: content?.ctaSecondary ?? "Eksplorasi Layanan", href: "#katalog-layanan" }}
      bukti={content?.proofPoints?.length ? content.proofPoints : ["Pembukuan Sesuai SAK", "Konsultan Berizin Resmi"]}
      gambar={{
        src: content?.photo ?? "/images/hero/easytax-resmi.webp",
        alt: "Layanan Konsultan Pajak EasyTax",
        posisi: "object-[58%_center]",
      }}
      kartu={[
        {
          nilai: badges[0]?.value ?? "+22%",
          label: badges[0]?.label ?? "Efisiensi Pajak Meningkat",
          ikon: <Pengguna className="h-5 w-5" />,
          posisi: "kiri-atas",
        },
        {
          nilai: badges[1]?.value ?? "300+ Industri",
          label: badges[1]?.label ?? "yang Dilayani",
          ikon: <Pengguna className="h-5 w-5" />,
          posisi: "kanan-bawah",
        },
      ]}
    />
  );
}
