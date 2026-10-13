/* Data tim konsultan untuk halaman /tentang-kami.
   Nama, jabatan, lisensi, foto, dan bio diambil dari easytax-demo (v1)
   lalu ditulis ulang agar konsisten dengan bahasa halaman. */

export interface AnggotaTim {
  nama: string;
  jabatan: string;
  lisensi: string;
  /** Tingkat lisensi konsultan: A, B, atau C. */
  level: "A" | "B" | "C";
  foto: string;
  bio: string;
}

export const timKonsultan: AnggotaTim[] = [
  {
    nama: "Akmal Abdul Arik",
    jabatan: "Senior Tax Consultant",
    lisensi: "BKP",
    level: "A",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Mendampingi kepatuhan pajak dan pelaporan perusahaan dari berbagai industri sejak lebih dari delapan tahun.",
  },
  {
    nama: "Risa Rizki Sharon",
    jabatan: "Tax & Financial Advisor",
    lisensi: "BKP",
    level: "B",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    bio: "Berfokus pada perencanaan keuangan dan advisory perpajakan bisnis yang tumbuh cepat.",
  },
  {
    nama: "Maya Puspita",
    jabatan: "Tax Consultant",
    lisensi: "BKP",
    level: "B",
    foto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    bio: "Spesialis pelaporan SPT dan penyusunan laporan UMKM agar kewajiban pajak tetap ringan namun terlindungi.",
  },
  {
    nama: "Bima Prasetyo",
    jabatan: "Accounting & Tax Review",
    lisensi: "BKP",
    level: "C",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Menyusun pembukuan berbasis SAK sekaligus meninjau kepatuhan sebelum laporan diserahkan ke klien.",
  },
];