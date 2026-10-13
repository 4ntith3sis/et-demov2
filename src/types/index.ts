/* ==========================================================================
   Tipe domain bersama.
   Sengaja dipisah dari komponen supaya components/ui tidak perlu tahu
   apa pun tentang pajak atau EasyTax.
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
  | "whatsapp";

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

/** Layanan yang ditawarkan. */
export interface Layanan {
  slug: string;
  judul: string;
  ringkasan: string;
  ikon: NamaIkon;
  detail?: string[];
}

/** Testimoni klien. */
export interface Testimoni {
  id: string;
  nama: string;
  jabatan: string;
  perusahaan: string;
  kutipan: string;
  rating: number;
  inisial: string;
}

/** Artikel / tulisan pajak. */
export interface Artikel {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  tanggal: string;
  waktuBaca: string;
  gambar: string;
}

/** Statistik untuk trust bar / stats. */
export interface Statistik {
  label: string;
  nilai: string;
  /** Ikon opsional di samping nilai. */
  ikon?: NamaIkon;
}