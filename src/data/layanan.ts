/**
 * Data layanan untuk section "Layanan Pajak & Keuangan" di beranda.
 * Diport dari easytax-demo (v1) — field `heroImage` dipertahankan supaya
 * kartu layanan bisa merender foto sampul seperti di desain asal.
 */

export interface LayananBeranda {
  slug: string;
  judul: string;
  subjudul: string;
  ringkasan: string;
  gambar: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const layananBeranda: LayananBeranda[] = [
  {
    slug: "laporan-spt",
    judul: "Laporan SPT",
    subjudul: "Bebas Denda & Akurat",
    ringkasan:
      "EasyTax membantu perhitungan, penyusunan, dan e-Filing SPT Tahunan PPh Badan serta SPT Orang Pribadi dengan bukti lapor resmi DJP.",
    gambar: "/images/official/seed-layanan-laporan-spt.webp",
  },
  {
    slug: "pengurusan-pkp",
    judul: "Layanan Pengurusan PKP",
    subjudul: "Cepat & 100% Lolos Survei KPP",
    ringkasan:
      "Bantu proses pengukuhan PKP, aktivasi akun e-Faktur, sertifikat elektronik DJP, dan pembekalan teknis faktur pajak.",
    gambar: "/images/official/seed-layanan-pengurusan-pkp-1280x720.webp",
  },
  {
    slug: "laporan-perpajakan-keuangan",
    judul: "Laporan Perpajakan & Keuangan",
    subjudul: "Lebih Rapi, Akurat & Aman",
    ringkasan:
      "EasyTax membantu memahami, mengelola, dan menyusun laporan keuangan serta pelaporan pajak secara tepat waktu.",
    gambar: "/images/official/seed-layanan-laporan-perpajakan-keuangan.webp",
  },
];
