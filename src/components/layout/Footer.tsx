import Link from "next/link";

import { Email, Instagram, Lokasi, TikTok, WhatsApp } from "@/components/ikon";
import { menuNavigasi, situs } from "@/data/situs";

const TAUTAN_LAYANAN = [
  { label: "Laporan Perpajakan & Keuangan", href: "/layanan/laporan-perpajakan-keuangan" },
  { label: "Laporan SPT", href: "/layanan/laporan-spt" },
  { label: "Layanan Pengurusan PKP", href: "/layanan/pengurusan-pkp" },
  { label: "Restitusi Pajak", href: "/layanan/restitusi-pajak" },
];

/* Tahun ditulis statis: `new Date()` tidak stabil saat prerender. */
const TAHUN = 2026;

const SOSMED = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/easytax.id/",
    Ikon: Instagram,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@easytax.id", Ikon: TikTok },
  { label: "WhatsApp", href: situs.whatsappUrl, Ikon: WhatsApp },
];

/**
 * Footer situs: identitas + deskripsi + sosmed, tiga kolom tautan, lalu
 * baris bawah berisi hak cipta. Struktur mengikuti easytax-demo dengan
 * warna navy yang sudah diseragamkan di globals.css.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-navy-hero text-teks-terang">
      <div className="mx-auto w-full max-w-maks px-6 pt-[clamp(44px,6vw,80px)] pb-8 md:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Identitas */}
          <div>
            {/* Brand — sama seperti v1, footer memakai wordmark teks saja
                (tanpa gambar logo) dengan judul putih. */}
            <Link
              href="/"
              aria-label={`${situs.nama} — beranda`}
              className="inline-flex flex-col justify-center no-underline"
            >
              <span className="font-heading text-[1.75rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-white">
                {situs.nama}
              </span>
              <span className="mt-0.5 text-[0.74rem] leading-[1.2] font-bold tracking-[0.02em] text-[#E5A812]">
                {situs.subjudul}
              </span>
            </Link>

            <p className="mt-5 text-[0.92rem] leading-[1.7]">
              Jasa konsultan pajak dan akuntansi perusahaan terpercaya di
              Indonesia. Membantu bisnis Anda tumbuh dengan kepatuhan pajak
              yang optimal.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {SOSMED.map(({ label, href, Ikon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/6 text-teks-terang transition-[var(--transition-base)] hover:-translate-y-0.75 hover:bg-yellow-400 hover:text-navy-900"
                  >
                    <Ikon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <nav aria-labelledby="footer-layanan">
            <h4
              id="footer-layanan"
              className="relative pb-2.5 font-heading text-[1.15rem] font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-[30px] after:bg-yellow-400"
            >
              Layanan Kami
            </h4>
            <ul className="mt-5 space-y-3">
              {TAUTAN_LAYANAN.map((tautan) => (
                <li key={tautan.href}>
                  <Link
                    href={tautan.href}
                    className="text-[0.92rem] text-teks-terang no-underline transition-[var(--transition-base)] hover:translate-x-1 hover:text-yellow-400"
                  >
                    {tautan.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Perusahaan */}
          <nav aria-labelledby="footer-perusahaan">
            <h4
              id="footer-perusahaan"
              className="relative pb-2.5 font-heading text-[1.15rem] font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-[30px] after:bg-yellow-400"
            >
              Perusahaan
            </h4>
            <ul className="mt-5 space-y-3">
              {menuNavigasi
                .filter((item) => item.href !== "/")
                .slice(0, 4)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.92rem] text-teks-terang no-underline transition-[var(--transition-base)] hover:translate-x-1 hover:text-yellow-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <h4 className="relative pb-2.5 font-heading text-[1.15rem] font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-[30px] after:bg-yellow-400">
              Hubungi Kami
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-[0.92rem]">
                <WhatsApp className="mt-0.75 h-4.5 w-4.5 shrink-0 text-yellow-400" />
                <a
                  href={situs.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teks-terang no-underline transition-colors hover:text-yellow-400"
                >
                  {situs.kontak.telepon}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.92rem]">
                <Email className="mt-0.75 h-4.5 w-4.5 shrink-0 text-yellow-400" />
                <a
                  href={`mailto:${situs.kontak.email}`}
                  className="text-teks-terang no-underline transition-colors hover:text-yellow-400"
                >
                  {situs.kontak.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.92rem]">
                <Lokasi className="mt-0.75 h-4.5 w-4.5 shrink-0 text-yellow-400" />
                <span>{situs.kontak.alamat}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 text-[0.85rem]">
          <p className="text-teks-redup">
            &copy; {TAHUN} {situs.nama}. All Rights Reserved.
          </p>
          <p className="text-teks-redup">
            Part of <span className="font-bold text-teks-terang">easylegal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}