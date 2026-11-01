"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, Obrolan, PanahBawah, Tutup } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import { cn } from "@/lib/cn";
import type { ambilPengaturanSitus } from "@/lib/cms/content";

/**
 * Navigasi utama: sticky, semi-transparan + blur, dengan drawer untuk mobile.
 *
 * Perilaku yang dibawa dari v1:
 *  - Header tetap (sticky top-0) dengan latar putih 95% + backdrop blur.
 *  - Link aktif dicetak kuning.
 *  - Tombol hamburger hanya muncul < 1024px.
 *
 * Perbaikan dari v1:
 *  - Drawer mobile bisa ditutup dengan Escape, bukan hanya dari klik link
 *    seperti di v1.
 *  - Scroll body dikunci saat drawer terbuka, jadi konten di belakang
 *    tidak ikut ter-scroll.
 *  - Logo memakai next/image, bukan <img> mentah.
 */
export function Navbar({ situs }: { situs: Awaited<ReturnType<typeof ambilPengaturanSitus>> }) {
  const menuNavigasi = situs.menuNavigasi;
  const logoMark = situs.logoMark;
  const layananBeranda = situs.menuLayanan;
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);
  const [layananTerbuka, setLayananTerbuka] = useState(false);

  /* Tutup drawer setiap kali navigasi berpindah halaman. */
  useEffect(() => {
    setTerbuka(false);
    setLayananTerbuka(false);
  }, [pathname]);

  const kolomLayanan =
    layananBeranda.length <= 3
      ? "lg:grid-cols-1"
      : layananBeranda.length === 4
        ? "lg:grid-cols-2"
        : layananBeranda.length <= 9
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";
  const lebarDropdown =
    layananBeranda.length <= 3
      ? "w-[min(320px,calc(100vw-32px))]"
      : layananBeranda.length === 4
        ? "w-[min(440px,calc(100vw-32px))]"
        : layananBeranda.length <= 9
          ? "w-[min(580px,calc(100vw-32px))]"
          : "w-[min(720px,calc(100vw-32px))]";

  /* Kunci scroll + tutup drawer saat Escape ditekan. */
  useEffect(() => {
    if (!terbuka) return;

    const sebelumnyaOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tutupDenganEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerbuka(false);
    };
    document.addEventListener("keydown", tutupDenganEscape);

    return () => {
      document.body.style.overflow = sebelumnyaOverflow;
      document.removeEventListener("keydown", tutupDenganEscape);
    };
  }, [terbuka]);

  return (
    <header className="relative sticky top-0 z-1000 w-full border-b border-garis-halus bg-white shadow-[0_4px_20px_color-mix(in_srgb,var(--color-brand-navy)_5%,transparent)]">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex w-full max-w-maks items-center justify-between px-6 py-4"
      >
        {/* Brand — meniru `.easytax-brand-combo` easytax-demo: logo 48px
            dengan wordmark dan subjudul bertumpuk di sebelahnya. */}
        <Link
          href="/"
          aria-label={`${situs.nama} — beranda`}
          className="flex items-center gap-3 no-underline"
        >
          <Image
            src={logoMark}
            alt={`Logo ${situs.nama}`}
            width={48}
            height={48}
            priority
            className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 hover:scale-105"
          />
          <span className="flex flex-col justify-center leading-tight">
            <span className="font-heading text-[1.75rem] font-extrabold tracking-[-0.02em] text-navy-900">
              {situs.nama}
            </span>
            {/* Subjudul disembunyikan di layar sempit — kalau tidak ia membungkus
                baris dan mendorong tinggi header. */}
            <span className="hidden text-[0.74rem] font-bold tracking-[0.02em] text-navy-900 sm:block">
              {situs.subjudul}
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {menuNavigasi.map((item) => {
            const aktif =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.href === "/layanan") {
              return (
                <li key={item.href} className="relative">
                  <button
                    type="button"
                    aria-expanded={layananTerbuka}
                    aria-controls="dropdown-layanan"
                    onClick={() => setLayananTerbuka((nilai) => !nilai)}
                    className={cn(
                      "tautan-nav flex cursor-pointer items-center gap-1.5 text-[0.95rem] transition-colors duration-300",
                      aktif || layananTerbuka
                        ? "font-extrabold text-navy-900"
                        : "font-semibold text-navy-900",
                    )}
                  >
                    {item.label}
                    <PanahBawah
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        layananTerbuka && "rotate-180",
                      )}
                    />
                  </button>

                  {layananTerbuka && (
                    <div
                      id="dropdown-layanan"
                      className={`absolute top-[calc(100%+48px)] left-1/2 z-50 ${lebarDropdown} -translate-x-1/2 overflow-hidden rounded-2xl border border-garis bg-white shadow-[0_18px_45px_color-mix(in_srgb,var(--color-brand-navy)_16%,transparent)]`}
                    >
                      <ul className={`grid grid-cols-1 gap-x-5 gap-y-0.5 p-3.5 ${layananBeranda.length >= 4 ? "sm:grid-cols-2" : ""} ${kolomLayanan}`}>
                        {layananBeranda.map((layanan) => (
                          <li key={layanan.slug}>
                            <Link
                              href={`/layanan/${layanan.slug}`}
                              onClick={() => setLayananTerbuka(false)}
                              className="group flex items-center justify-start rounded-lg px-3 py-2.5 text-left no-underline transition-colors hover:bg-netral-lat"
                            >
                              <span className="block w-full min-w-0 text-left">
                                <span className="block font-heading text-[0.9rem] font-bold text-navy-900">
                                  {layanan.judul}
                                </span>
                                <span className="mt-0.5 block text-[0.74rem] leading-[1.3] text-teks-sekunder">
                                  {layanan.subjudul}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/layanan"
                        onClick={() => setLayananTerbuka(false)}
                        className="flex items-center justify-center gap-2 border-t border-garis-halus px-5 py-3.5 font-heading text-[0.9rem] font-bold text-navy-900 no-underline transition-colors hover:bg-yellow-500/10"
                      >
                        Lihat Semua Layanan
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={aktif ? "page" : undefined}
                  className={cn(
                    "tautan-nav text-[0.95rem] transition-colors duration-300",
                    aktif
                      ? "font-extrabold text-navy-900"
                      : "font-semibold text-navy-900",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Aksi kanan */}
        <div className="flex items-center gap-4">
          <Tombol
            href={situs.whatsappUrl}
            external
            ukuran="kecil"
            ikonKiri={<Obrolan className="h-4 w-4" />}
            className="hidden lg:inline-flex"
          >
            {situs.navCtaLabel}
          </Tombol>

          <button
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            aria-expanded={terbuka}
            aria-controls="menu-mobile"
            className="-mr-2.5 cursor-pointer rounded-sm p-2.5 text-navy-900 transition-colors hover:bg-netral-lat lg:hidden"
          >
            {terbuka ? <Tutup className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <div
        id="menu-mobile"
        hidden={!terbuka}
        className="border-t border-garis bg-white lg:hidden"
      >
        <ul className="flex flex-col px-6 py-2">
          {menuNavigasi.map((item) => {
            const aktif =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={aktif ? "page" : undefined}
                  className={cn(
                    "block border-b border-garis-halus py-3.5 text-[0.95rem] text-navy-900 last:border-b-0",
                    aktif ? "bg-yellow-500/12 font-extrabold" : "font-bold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-6 pt-2 pb-6">
          <Tombol
            href={situs.whatsappUrl}
            external
            ukuran="besar"
            ikonKiri={<Obrolan className="h-5 w-5" />}
            className="w-full"
          >
            {situs.navCtaLabel}
          </Tombol>
        </div>
      </div>
    </header>
  );
}
