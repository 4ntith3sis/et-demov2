import type { ItemNavigasi } from "@/types";

/** Konfigurasi global situs. Dipisah dari komponen supaya Navbar tetap murni. */
export const situs = {
  nama: "EasyTax",
  subjudul: "Konsultan Pajak & Akuntansi",
  deskripsi:
    "EasyTax adalah jasa konsultan pajak dan akuntansi perusahaan terpercaya di Indonesia.",

  /** Tautan WhatsApp untuk CTA "Konsultasi Gratis". */
  whatsappUrl: "https://mauorder.online/easytaxwebsite",

  kontak: {
    telepon: "+62 811-1920-0080",
    email: "info@easytax.id",
    alamat: "Jl. TB Simatupang No. 36, Cilandak, Jakarta Selatan 12430",
  },
} as const;

/**
 * Menu navigasi utama.
 * Navbar memakai `href`-nya untuk menentukan link aktif, jadi setiap entri
 * cukup path-nya tanpa handler khusus.
 */
export const menuNavigasi: ItemNavigasi[] = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Artikel", href: "/tulisan-pajak" },
  { label: "Kalkulator", href: "/kalkulator-pajak" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Kontak", href: "/kontak" },
];

/**
 * Mark "ET" (rasio 1478:950) untuk Navbar & Footer.
 * File logo-full.png adalah lockup penuh yang memuat wordmark + badge
 * "part of easylegal" — kalau dipaksa 48px, isinya tidak terbaca.
 */
export const logoMark = "/images/logo-mark.png";

/** Lockup penuh untuk Footer, di mana ruang cukup lega. */
export const logoLengkap = "/images/logo-full.png";