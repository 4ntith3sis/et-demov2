import Image from "next/image";
import Link from "next/link";

import { PanahKanan, Rumah } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import type { ambilPengaturanSitus } from "@/lib/cms/content";
import type { LayananBeranda } from "@/data/layanan";

/**
 * Hero detail layanan — diport dari `ServiceHero` easytax-demo:
 * breadcrumb tiga level, tag pill, judul dengan subjudul kuning,
 * deskripsi, tombol CTA, dan foto di kolom kanan.
 */
export function LayananDetailHero({
  layanan,
  settings,
}: {
  layanan: LayananBeranda;
  settings: Awaited<ReturnType<typeof ambilPengaturanSitus>>;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-6 pt-[clamp(44px,5vw,56px)] pb-24 text-white md:px-8">
      <div className="relative z-10 mx-auto grid w-full max-w-maks grid-cols-1 items-center gap-[50px] lg:grid-cols-2">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-[0.88rem] text-teks-terang"
          >
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Rumah className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <span aria-hidden="true">&gt;</span>
            <Link href="/layanan" className="no-underline">
              Layanan
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="font-bold text-yellow-500">{layanan.judul}</span>
          </nav>

          <p className="mb-2 inline-flex items-center gap-2.5 rounded-full border border-white/16 bg-white/6 px-4 py-2.5 text-[0.78rem] font-extrabold tracking-[0.13em] text-yellow-500 uppercase">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-yellow-500" />
            {settings.servicesPage?.detailLabel ?? "Tax & Accounting Service"}
          </p>

          <h1 className="mt-px mb-[12px] font-heading text-[clamp(2rem,3.2vw,2.8rem)] leading-[1.2] font-black tracking-[-0.02em] text-white 2xl:text-[3.1rem]">
            {layanan.judul}
            <br />
            <span className="text-yellow-500">{layanan.subjudul}</span>
          </h1>

          <p className="max-w-[600px] text-[1.05rem] leading-[1.7] text-teks-terang">
            {layanan.ringkasan}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Tombol
              href={settings.whatsappUrl}
              external
              ukuran="sedang"
              ikonKanan={<PanahKanan className="h-4 w-4" />}
              className="w-fit rounded-md py-[13px] px-7 text-[0.95rem]"
            >
              {settings.servicesPage?.detailCtaLabel ?? "Konsultasi Gratis"}
            </Tombol>
            <Tombol
              href="#harga"
              varian="garisPutih"
              ukuran="sedang"
              className="w-fit rounded-md py-[13px] px-7 text-[0.95rem]"
            >
              Lihat Harga
            </Tombol>
          </div>
        </div>

        <div className="relative h-[390px] overflow-hidden rounded-[28px] bg-navy-900">
          <Image
            src={layanan.gambar}
            alt={layanan.judul}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[68%_center]"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="transisi-hero-statistik pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24"
      />
    </section>
  );
}
