import { Centang, Pengguna } from "@/components/ikon";
import { HeroPanel } from "@/components/ui/HeroPanel";
import type { ambilPengaturanSitus } from "@/lib/cms/content";

/**
 * Hero halaman /tentang-kami — memakai panel hero yang sama dengan
 * /layanan supaya kedua halaman terasa satu keluarga.
 */
export function TentangHero({ settings }: { settings: Awaited<ReturnType<typeof ambilPengaturanSitus>> }) {
  const content = settings.aboutHero;
  const badges = content?.badges?.length ? content.badges : [
    { value: "20+", label: "Konsultan BKP" },
    { value: "99,2%", label: "Tepat Waktu" },
  ];
  return (
    <HeroPanel
      className="tanpa-gradasi"
      remah={[
        { label: "Beranda", href: "/" },
        { label: "Tentang Kami" },
      ]}
      judul={
        <>
          {content?.titleStart ?? "Partner pajak"} <span className="text-yellow-500">{content?.titleHighlight ?? "yang tinggal di sisi bisnis"}</span>
        </>
      }
      deskripsi={content?.description ?? "EasyTax adalah jasa konsultan pajak dan akuntansi yang membantu UMKM dan perusahaan menata kewajiban pajaknya tanpa harus memahami semua detailnya."}
      tombolUtama={{
        label: settings.navCtaLabel,
        href: settings.whatsappUrl,
        eksternal: true,
      }}
      tombolSekunder={{ label: content?.ctaSecondary ?? "Lihat Tim", href: "#tim" }}
      bukti={content?.proofPoints?.length ? content.proofPoints : [
        "Konsultan Bersertifikat BKP",
        "Pembukuan Sesuai Standar Akuntansi",
      ]}
      gambar={{
        src: content?.photo ?? "/images/hero/easytax-resmi.webp",
        alt: "Tim konsultan pajak EasyTax bersama klien",
        posisi: "object-[36%_center]",
      }}
      kartu={[
        {
          nilai: badges[0]?.value ?? "20+",
          label: badges[0]?.label ?? "Konsultan BKP",
          ikon: <Pengguna className="h-5 w-5" />,
          posisi: "kiri-atas",
        },
        {
          nilai: badges[1]?.value ?? "99,2%",
          label: badges[1]?.label ?? "Tepat Waktu",
          ikon: <Centang className="h-5 w-5" />,
          posisi: "kanan-bawah",
        },
      ]}
    />
  );
}
