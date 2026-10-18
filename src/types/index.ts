/* ==========================================================================
   Tipe domain bersama yang dipakai lintas komponen (ikon, navigasi, section).
   Sengaja dipisah dari komponen supaya components/ui tidak perlu tahu
   apa pun tentang pajak atau EasyTax.

   Tipe konten (ArtikelBeranda, LayananBeranda, Testimoni, PaketLayanan, dll.)
   hidup berdampingan dengan modul datanya di src/data/* — jangan dipindah
   ke sini agar tidak terjadi duplikasi.
   ========================================================================== */

/** Nama ikon yang tersedia di components/ikon. */
export type NamaIkon =
  | "panah-kanan"
  | "panah-kiri"
  | "rumah"
  | "cari"
  | "tutup-lingkar"
  | "centang"
  | "medali"
  | "perisai"
  | "kunci"
  | "obrolan"
  | "bintang"
  | "menu"
  | "tutup"
  | "telepon"
  | "email"
  | "lokasi"
  | "jam"
  | "kartu-kredit"
  | "dokumen"
  | "pengguna"
  | "tren-naik"
  | "instagram"
  | "tiktok"
  | "whatsapp"
  | "panah-bawah"
  | "kalkulator";

/** Judul + deskripsi standar untuk bagian halaman. */
export interface JudulBagian {
  /** Label kecil di atas judul, mis. "LAYANAN KAMI". */
  label?: string;
  /** Judul utama. Boleh contain markup <span> untuk menyorot kata. */
  judul: React.ReactNode;
  /** Paragraf pendukung di bawah judul. */
  deskripsi?: string;
  /** Posisi judul. Default: tengah. */
  posisi?: "kiri" | "tengah";
}

/** Item menu navigasi. */
export interface ItemNavigasi {
  label: string;
  href: string;
}
