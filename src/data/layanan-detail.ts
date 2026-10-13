/**
 * Data detail tiap layanan untuk halaman /layanan/[slug]: paket harga dan
 * FAQ. Diport dari easytax-demo (v1) — nilai harga mengikuti data v1.
 *
 * Catatan: FAQ di v1 masih berisi placeholder (`[object Object]`), jadi
 * pertanyaannya dipertahankan sementara jawabannya ditulis ulang dengan
 * bahasa Indonesia yang konsisten.
 */

export interface PaketLayanan {
  nama: string;
  deskripsi: string;
  harga: string;
  satuan?: string;
  fitur: string[];
}

export interface FaqLayanan {
  pertanyaan: string;
  jawaban: string;
}

export interface DetailLayanan {
  slug: string;
  paket: PaketLayanan[];
  faq: FaqLayanan[];
}

const FAQ_SAMA: FaqLayanan[] = [
  {
    pertanyaan: "Apakah layanan dapat disesuaikan?",
    jawaban:
      "Bisa. Setiap paket adalah titik awal. Tim kami akan menyesuaikan lingkup pekerjaan, durasi, dan deliverables mengikuti kondisi dan skala bisnis Anda, lalu menuangkannya dalam proposal tertulis.",
  },
  {
    pertanyaan: "Apakah prosesnya bisa dilakukan online?",
    jawaban:
      "Bisa. Seluruh proses mulai konsultasi, examination dokumen, hingga pelaporan dilakukan jarak jauh. Dokumen dikirim melalui kanal terenkripsi dan hanya diakses tim yang berwenang.",
  },
  {
    pertanyaan: "Berapa lama pengerjaannya?",
    jawaban:
      "Tergantung paket. Pengerjaan reguler seperti pelaporan bulanan selesai 3–5 hari kerja setelah dokumen lengkap, sedangkan pekerjaan khusus seperti TAX opinion memerlukan 1–2 minggu.",
  },
  {
    pertanyaan: "Berapa biaya konsultasinya?",
    jawaban:
      "Konsultasi awal tidak dipungut biaya. Biaya terlihat jelas di sejak awal lewat proposal berisi rincian pekerjaan dan harga, tanpa biaya tersembunyi di tengah jalan.",
  },
];

export const detailLayanan: DetailLayanan[] = [
  {
    slug: "restitusi-pajak",
    paket: [
      {
        nama: "Paket Restitusi Basic",
        deskripsi:
          "Cocok untuk kebutuhan restitusi dengan dokumen dan transaksi yang relatif sederhana.",
        harga: "Rp 2.500.000",
        satuan: "/paket",
        fitur: [
          "Pemeriksaan kelengkapan dokumen",
          "Review data perpajakan",
          "Pendampingan persiapan pengajuan",
          "Konsultasi dasar restitusi",
        ],
      },
      {
        nama: "Paket Restitusi Standard",
        deskripsi:
          "Pendampingan restitusi yang lebih menyeluruh untuk dokumen yang lebih kompleks.",
        harga: "Rp 5.000.000",
        satuan: "/paket",
        fitur: [
          "Review dokumen dan data perpajakan",
          "Pemeriksaan transaksi terkait",
          "Persiapan dokumen restitusi",
          "Pendampingan proses pengajuan",
          "Konsultasi selama proses",
        ],
      },
      {
        nama: "Paket Restitusi Professional",
        deskripsi:
          "Pemeriksaan dan dokumentasi yang lebih mendalam untuk proses restitusi.",
        harga: "Rp 8.000.000",
        satuan: "/paket",
        fitur: [
          "Review komprehensif dokumen perpajakan",
          "Analisis data dan transaksi",
          "Persiapan dokumen pendukung",
          "Pendampingan proses restitusi",
          "Konsultasi dan monitoring proses",
        ],
      },
      {
        nama: "Paket Restitusi Corporate",
        deskripsi:
          "Pendampingan end-to-end untuk volume dokumen yang besar dan kompleks.",
        harga: "Rp 12.500.000",
        satuan: "/paket",
        fitur: [
          "Review menyeluruh data perpajakan",
          "Analisis dokumen dan transaksi",
          "Persiapan dokumen pendukung",
          "Pendampingan proses restitusi",
          "Monitoring dan konsultasi intensif",
        ],
      },
    ],
    faq: [
      {
        pertanyaan:
          "Berapa lama proses pengajuan restitusi sampai dicairkan?",
        jawaban:
          "Umumnya 1–3 bulan sejak pengajuan, tergantung proses verifikasi DJP. EasyTax menyiapkan dokumen secara lengkap agar verifikasi tidak berputar.",
      },
      ...FAQ_SAMA,
    ],
  },
  {
    slug: "laporan-spt",
    paket: [
      {
        nama: "SPT Tahunan Badan",
        deskripsi:
          "Penyusunan dan e-Filing SPT Tahunan PPh Pasal 1771 untuk badan usaha.",
        harga: "Rp 1.750.000",
        satuan: "/tahun",
        fitur: [
          "Pemeriksaan pembukuan dan bukti potong",
          "Penyusunan lampiran SPT",
          "e-Filing SPT Tahunan Badan",
          "Bukti lapor resmi dari DJP",
        ],
      },
      {
        nama: "SPT Orang Pribadi",
        deskripsi:
          "Penghitungan dan pelaporan pajak penghasilan pribadi yearly.",
        harga: "Rp 750.000",
        satuan: "/tahun",
        fitur: [
          "Rekapitulasi penghasilan dan potongan",
          "Penghitungan pajak terutang",
          "Pelaporan SPT Orang Pribadi",
          "Konsultasi satu kali",
        ],
      },
      {
        nama: "e-Filing & Pendampingan",
        deskripsi:
          "Pendampingan e-Filing lengkap dengan pemeriksaan sebelum pelaporan.",
        harga: "Rp 2.500.000",
        satuan: "/tahun",
        fitur: [
          "Verifikasi dan rekonsiliasi data",
          "Pendampingan.input pelaporan",
          "Pemeriksaan hasil e-Filing",
          "Simulasi risiko koreksi fiskal",
        ],
      },
      {
        nama: "Paket Lengkap Setahun",
        deskripsi:
          "SPT Tahunan plus laporan bulanan dan pendampingan sepanjang tahun.",
        harga: "Rp 4.500.000",
        satuan: "/tahun",
        fitur: [
          "SPT Tahunan dan laporan bulanan",
          "Laporan neraca dan laba rugi",
          "Pendampingan pemeriksaan KPP",
          "Konsultasi tanpa batas",
        ],
      },
    ],
    faq: [
      {
        pertanyaan: "Berapa lama proses pelaporan SPT?",
        jawaban:
          "Untuk SPT Tahunan Badan, pekerjaan utama Completed pada 2–4 hari kerja setelah dokumen lengkap diterima. Pengajuannya sendiri dilakukan sebelum tenggat 31 Maret.",
      },
      ...FAQ_SAMA,
    ],
  },
  {
    slug: "pengurusan-pkp",
    paket: [
      {
        nama: "Pengurusan PKP Dasar",
        deskripsi: "Pendampingan pengukuhan untuk usaha dengan omzet sederhana.",
        harga: "Rp 1.500.000",
        satuan: "/paket",
        fitur: [
          "Pendampingan pengisian formulir",
          "Verifikasi kelengkapan dokumen",
          "Panduan survei lokasi KPP",
          "Pendampingan aktivasi e-Faktur",
        ],
      },
      {
        nama: "Pengurusan PKP Lengkap",
        deskripsi:
          "Proses sampai PKP aktif beserta e-Faktur dan sertifikat elektronik.",
        harga: "Rp 2.500.000",
        satuan: "/paket",
        fitur: [
          "Seluruh paperwork pengukuhan",
          "Pendampingan survei lokasi",
          "Aktivasi akun e-Faktur",
          "Penerbitan sertifikat elektronik",
          "Pelatihan pembekalan faktur pajak",
        ],
      },
      {
        nama: "PKP Plus Pembukuan",
        deskripsi: "PKP aktif sekaligus penjadwalan pembukuan bulanan.",
        harga: "Rp 4.000.000",
        satuan: "/paket",
        fitur: [
          "Pengurusan PKP sampai aktif",
          "Pembukuan bulanan 12 bulan",
          "Penyusunan laporan pajak bulanan",
          "Rekonsiliasi faktur dan pembelian",
        ],
      },
      {
        nama: "PKP Korporat",
        deskripsi: "Pendampingan penuh untuk perusahaan multi-cabang.",
        harga: "Rp 6.000.000",
        satuan: "/paket",
        fitur: [
          "Pengurusan PKP untuk seluruh outlet",
          "Standardisasi sistem faktur pajak",
          "Pelatihan tim internal",
          "Pendampingan satu tahun",
        ],
      },
    ],
    faq: [
      {
        pertanyaan: "Berapa lama proses pengurusan PKP?",
        jawaban:
          "Umumnya 3–6 minggu, tergantung hasil survei lokasi dan kelengkapan dokumen. EasyTax menyiapkan seluruh dokumentasi dan pendamping lapangan agar proses tidak molor.",
      },
      ...FAQ_SAMA,
    ],
  },
  {
    slug: "laporan-perpajakan-keuangan",
    paket: [
      {
        nama: "Laporan Pajak Bulanan",
        deskripsi: "Solusi praktis untuk UMKM dan startup yang baru bertumbuh.",
        harga: "Rp 749.000",
        satuan: "/bulan",
        fitur: [
          "Pelaporan SPT Masa PPh",
          "Penyusunan laporan laba rugi",
          "Rekonsiliasi transaksi",
        ],
      },
      {
        nama: "Pajak Bulanan + SPT Tahunan",
        deskripsi: "Paket komplit untuk satu tahun penuh.",
        harga: "Rp 7.999.000",
        satuan: "/tahun",
        fitur: [
          "Laporan pajak 12 bulan",
          "SPT Tahunan Badan 1771",
          "Laporan neraca dan laba rugi",
        ],
      },
      {
        nama: "Rekonsiliasi Fiskal",
        deskripsi: "Penyesuaian antara laba komersial dan fiskal.",
        harga: "Rp 499.000",
        satuan: "/laporan",
        fitur: ["Koreksi fiskal positif dan negatif", "Kertas kerja rekonsiliasi"],
      },
      {
        nama: "Review SPT Mandiri",
        deskripsi: "Pemeriksaan SPT yang Anda susun sendiri sebelum dilapor.",
        harga: "Rp 199.000",
        fitur: ["Pemeriksaan kelengkapan", "Catatan perbaikan sebelum pelaporan"],
      },
      {
        nama: "Pendampingan Audit Penuh",
        deskripsi: "Pendampingan menyeluruh untuk audit dan pemeriksaan pajak.",
        harga: "Rp 4.999.000",
        satuan: "/perusahaan",
        fitur: [
          "Audit laporan keuangan",
          "Penyusunan TPDoc",
          "Pendampingan SP2DK",
          "Tax opinion tertulis",
          "Simulasi sanksi administrasi",
          "Garansi bebas denda",
        ],
      },
    ],
    faq: [
      {
        pertanyaan:
          "Apakah laporan keuangan yang dibuat bisa dipakai untuk pengajuan kredit?",
        jawaban:
          "Bisa. Laporan kami disusun mengikuti SAK sehingga dapat menjadi lampiran pengajuan kredit, dan danZucca aid reporting pada perusahaan.",
      },
      ...FAQ_SAMA,
    ],
  },
];

/** Detail layanan berdasarkan slug, atau undefined bila slug tidak dikenal. */
export function cariDetailLayanan(slug: string): DetailLayanan | undefined {
  return detailLayanan.find((d) => d.slug === slug);
}