/**
 * Artikel untuk section "Jelajahi Artikel dan Wawasan Kami" di beranda.
 * Diport dari easytax-demo (v1); entry "[DEV]" dibuang karena data contoh.
 */

export interface ArtikelBeranda {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  tanggal: string;
  waktuBaca: string;
  gambar: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const artikelBeranda: ArtikelBeranda[] = [
  {
    slug: "rekonsiliasi-fiskal-positif-negatif",
    judul:
      "Perbedaan Rekonsiliasi Fiskal Positif & Negatif pada Laporan Keuangan",
    ringkasan:
      "Mengenal koreksi biaya yang tidak dapat dikurangkan dan penghasilan bukan objek pajak dalam e-SPT PPh Badan.",
    kategori: "Akuntansi",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-rekonsiliasi-fiskal-positif-negatif.webp",
  },
  {
    slug: "batas-omzet-umkm-pajak-final",
    judul:
      "Batas Omzet UMKM Bebas Pajak & Cara Hitung PPh Final 0,5% PP 55/2022",
    ringkasan:
      "Penjelasan insentif batasan omzet Rp 500 juta bebas pajak untuk UMKM Orang Pribadi dan tata cara perhitungan PPh final bulanan.",
    kategori: "Bisnis",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-batas-omzet-umkm-pajak-final.webp",
  },
  {
    slug: "kredit-faktur-pajak-masukan",
    judul:
      "Cara Mengkreditkan Faktur Pajak Masukan Tanpa Risiko Kurang Bayar PPN",
    ringkasan:
      "Tips mengelola transaksi PPN 11%, memastikan keabsahan nomor seri faktur pajak, dan pengkreditan faktur dalam tenggat 3 bulan.",
    kategori: "Perpajakan",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-kredit-faktur-pajak-masukan.webp",
  },
  {
    slug: "neraca-laba-rugi-spt-badan",
    judul:
      "Mengapa Neraca & Laba Rugi Wajib Dilampirkan pada e-Filing SPT Badan?",
    ringkasan:
      "Penjelasan hubungan erat pembukuan akuntansi komersial dan kewajiban e-Filing SPT PPh 1771 untuk menghindari koreksi fiskal KPP.",
    kategori: "Akuntansi",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-neraca-laba-rugi-spt-badan.webp",
  },
  {
    slug: "penerapan-ter-pph-21",
    judul:
      "Penerapan Tarif Efektif Rata-Rata (TER) PPh 21: Cara Hitung Potong Gaji",
    ringkasan:
      "Panduan praktis menghitung potong PPh 21 bulanan karyawan kategori A, B, dan C sesuai Peraturan Pemerintah No. 58 Tahun 2023.",
    kategori: "Perpajakan",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-penerapan-ter-pph-21.webp",
  },
  {
    slug: "syarat-pengukuhan-pkp-terbaru",
    judul:
      "Syarat Pengukuhan PKP Terbaru: Cara Lolos Survei KPP & Aktivasi e-Faktur",
    ringkasan:
      "Simak alur pengajuan PKP perusahaan, dokumen kelayakan lokasi kantor, dan tips mempersiapkan verifikasi lapangan oleh petugas pemeriksa KPP.",
    kategori: "Perpajakan",
    tanggal: "7 Okt 2026",
    waktuBaca: "3 Min Baca",
    gambar: "/images/official/seed-artikel-syarat-pengukuhan-pkp-terbaru.webp",
  },
  {
    slug: "tata-cara-pembukuan-umkm",
    judul: "Tata Cara Pembukuan UMKM yang Benar dan Mudah",
    ringkasan:
      "Panduan menyusun pembukuan kas, piutang, dan utang secara rutin agar laporan keuangan UMKM tetap rapi dan siap diperiksa.",
    kategori: "Akuntansi",
    tanggal: "6 Okt 2026",
    waktuBaca: "4 Min Baca",
    gambar: "/images/official/seed-artikel-tata-cara-pembukuan-umkm.webp",
  },
  {
    slug: "pendapatan-tunjangan-pajak",
    judul: "Pendapatan Tunjangan dan THR: Bagian yang Tidak Dipotong Pajak",
    ringkasan:
      "Penjelasan komponen tunjangan, THR, dan hadiah yang tidak menjadi objek pajak bagi wajib pajak orang pribadi.",
    kategori: "Perpajakan",
    tanggal: "6 Okt 2026",
    waktuBaca: "4 Min Baca",
    gambar: "/images/official/seed-artikel-pendapatan-tunjangan-pajak.webp",
  },
  {
    slug: "e-faktur-4-0",
    judul: "e-Faktur 4.0: Perubahan yang Perlu Disiapkan Perusahaan",
    ringkasan:
      "Ringkasan perubahan e-Faktur 4.0 beserta langkah persiapan sistem penagihan dan pelaporan faktur pajak badan usaha.",
    kategori: "Perpajakan",
    tanggal: "5 Okt 2026",
    waktuBaca: "5 Min Baca",
    gambar: "/images/official/seed-artikel-e-faktur-4-0.webp",
  },
  {
    slug: "struktur-modal-dan-beban",
    judul: "Struktur Modal dan Beban: Tips Efisiensi Pajak Perusahaan",
    ringkasan:
      "Cara memetakan sumber pendanaan dan pos beban agar biaya yang terjadi dapat dikurangkan secara sah.",
    kategori: "Bisnis",
    tanggal: "5 Okt 2026",
    waktuBaca: "4 Min Baca",
    gambar: "/images/official/seed-artikel-struktur-modal-dan-beban.webp",
  },
  {
    slug: "transfer-pricing-dokumentasi",
    judul: "Transfer Pricing Documentation: Persiapan Dokumen",
    ringkasan:
      "Langkah menyusun master file, local file, dan study benchmarking agar transaksi dengan pihak afiliasi tetap sesuai prinsip arms length.",
    kategori: "Perpajakan",
    tanggal: "4 Okt 2026",
    waktuBaca: "5 Min Baca",
    gambar: "/images/official/seed-artikel-transfer-pricing-dokumentasi.webp",
  },
  {
    slug: "menjawab-sp2dk",
    judul: "Menjawab SP2DK: Dokumen dan Strategi yang Perlu Disiapkan",
    ringkasan:
      "Checklist data yang perlu disiapkan saat KPP mengirim Surat Pemanggilan dan permintaan klarifikasi atas wajib pajak.",
    kategori: "Perpajakan",
    tanggal: "4 Okt 2026",
    waktuBaca: "4 Min Baca",
    gambar: "/images/official/seed-artikel-menjawab-sp2dk.webp",
  },
];
