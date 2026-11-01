"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { PanahKanan, PanahKiri } from "@/components/ikon";
import type { LayananBeranda } from "@/data/layanan";

/**
 * Section "Layanan Pajak & Keuangan" di beranda, diport dari easytax-demo:
 * judul terpusat + carousel kartu layanan yang bisa digeser horizontal.
 */
export function Layanan({ layananBeranda, copy }: { layananBeranda: LayananBeranda[]; copy?: { label?: string; title?: string; description?: string } }) {
  const [halamanAktif, setHalamanAktif] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const ukuranHalaman = 3;
  const jumlahHalaman = Math.ceil(layananBeranda.length / ukuranHalaman);
  const tampilNavigasi = jumlahHalaman > 1;

  const geserKeHalaman = (halaman: number) => {
    const track = trackRef.current;
    if (!track) return;
    const tujuan = Math.max(0, Math.min(halaman, jumlahHalaman - 1));
    const kartuPertama = track.children[tujuan * ukuranHalaman] as HTMLElement | undefined;
    track.scrollTo({
      left: kartuPertama?.offsetLeft ?? 0,
      behavior: "smooth",
    });
    setHalamanAktif(tujuan);
  };

  const perbaruiHalaman = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const kartuTerdekat = Array.from(track.children).reduce(
      (terdekat, kartu, index) => {
        const jarakSaatIni = Math.abs((kartu as HTMLElement).offsetLeft - track.scrollLeft);
        const jarakTerdekat = Math.abs(
          (track.children[terdekat] as HTMLElement).offsetLeft - track.scrollLeft,
        );
        return jarakSaatIni < jarakTerdekat ? index : terdekat;
      },
      0,
    );

    setHalamanAktif(Math.min(Math.floor(kartuTerdekat / ukuranHalaman), jumlahHalaman - 1));
  };

  return (
    <section
      id="layanan"
      aria-labelledby="layanan-judul"
      className="relative overflow-hidden bg-white py-[clamp(44px,7vw,64px)] text-navy-900"
    >
      {/* Dekorasi radial lembut ala v1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[150px] -right-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-yellow)_10%,transparent)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[150px] -left-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-navy)_12%,transparent)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-[680px] text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/12 px-4 py-1.5 text-[0.85rem] font-bold tracking-[0.04em] text-navy-900 uppercase">
            {copy?.label ?? "Layanan yang tersedia"}
          </span>
          <h2
            id="layanan-judul"
            className="mb-3.5 font-heading text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.25] font-bold text-navy-900"
          >
            {copy?.title ?? "Layanan Pajak & Keuangan EasyTax"}
          </h2>
          <p className="text-[1.05rem] leading-[1.7] text-teks-sekunder">
            {copy?.description ?? "Solusi komprehensif untuk segala kepatuhan perpajakan badan usaha dan perorangan."}
          </p>
        </div>

        <div className="relative">
          {tampilNavigasi && (
            <div className="mb-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => geserKeHalaman(halamanAktif - 1)}
                aria-label="Geser layanan ke kiri"
                disabled={halamanAktif === 0}
                className="grid h-[42px] w-[42px] shrink-0 cursor-pointer place-items-center rounded-full border border-garis bg-white text-navy-900 shadow-sm transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PanahKiri className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => geserKeHalaman(halamanAktif + 1)}
                aria-label="Geser layanan ke kanan"
                disabled={halamanAktif === jumlahHalaman - 1}
                className="grid h-[42px] w-[42px] shrink-0 cursor-pointer place-items-center rounded-full border border-garis bg-white text-navy-900 shadow-sm transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PanahKanan className="h-4 w-4" />
              </button>
            </div>
          )}

          <div
            ref={trackRef}
            onScroll={perbaruiHalaman}
            className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {layananBeranda.map((layanan) => (
              <article
                key={layanan.slug}
                className="group flex min-h-full min-w-0 flex-[0_0_86%] snap-start flex-col overflow-hidden rounded-2xl border border-garis bg-white shadow-sm transition-[var(--transition-base)] hover:-translate-y-1 hover:shadow-xl sm:flex-[0_0_calc((100%_-_28px)_/_2)] lg:flex-[0_0_calc((100%_-_56px)_/_3)]"
              >
                <div className="relative h-[230px] w-full shrink-0 overflow-hidden border-b border-garis bg-netral-lat">
                  <Image
                    src={layanan.gambar}
                    alt={layanan.judul}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 py-7">
                  <h3 className="mb-2.5 font-heading text-[1.2rem] leading-[1.35] font-bold text-navy-900">
                    {layanan.judul}
                  </h3>
                  <p className="mb-5 flex-1 text-[0.9rem] leading-[1.6] text-teks-sekunder">
                    {layanan.ringkasan}
                  </p>
                  <Link
                    href={`/layanan/${layanan.slug}`}
                    className="inline-flex h-[42px] w-fit items-center gap-2 rounded-md bg-yellow-500 px-5 text-[0.9rem] font-extrabold text-navy-900 no-underline transition-[var(--transition-base)] hover:-translate-y-0.5 hover:shadow-kuning"
                  >
                    <PanahKanan className="h-3.5 w-3.5" />
                    Lihat Detail Layanan
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {tampilNavigasi && (
            <nav aria-label="Pagination layanan" className="mt-7 flex items-center justify-center gap-2.5">
              {Array.from({ length: jumlahHalaman }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => geserKeHalaman(index)}
                  aria-label={`Buka halaman layanan ${index + 1}`}
                  aria-current={halamanAktif === index ? "page" : undefined}
                  className={`h-2.5 cursor-pointer rounded-full transition-[var(--transition-base)] ${halamanAktif === index ? "w-8 bg-navy-900" : "w-2.5 bg-garis hover:bg-yellow-500"}`}
                />
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
