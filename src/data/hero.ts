/* ==========================================================================
   Konten Hero.
   Dipisah dari komponen supaya components/sections/Hero tetap murni
   presentasional — mengganti angka atau copy di sini tidak menyentuh JSX.
   Copy masih persis dari v1; komponen akan disesuaikan setelah ada referensi.
   ========================================================================== */

export const hero = {
  /** Pil kecil di atas judul. */
  label: "Konsultan Pajak & Akuntansi",

  /**
   * Judul dipisah jadi dua bagian supaya komponen tahu bagian mana yang
   * disorot kuning — bukan menyuruh komponen mem-parsing string.
   */
  judulDepan: "Terpercaya,",
  judulSorot: "Akurat & Bebas Denda.",

  deskripsi:
    "Membantu 13.000+ UMKM & perusahaan menyusun laporan keuangan, e-filing SPT Tahunan/Masa, pengukuhan PKP, hingga pendampingan audit pajak 100% online & resmi.",

  /** Poin kepercayaan di bawah tombol. */
  poinKepercayaan: [
    "13.000 Bisnis Terlayani",
    "Konsultan Berizin Resmi",
    "Garansi Kerahasiaan 100%",
  ],

  /** Badge melayang di pojok kanan kolom foto. */
  badgeSertifikat: {
    kiri: "Konsultan Berizin Resmi",
    kanan: "Terdaftar Resmi Kemenkeu/DJP",
  },

  foto: {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    alt: "Tim EasyTax sedang Berkonsultasi Pajak dan Akuntansi",
  },
} as const;