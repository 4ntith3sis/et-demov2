import Image from "next/image";
import Link from "next/link";

import { PanahKanan, Rumah } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import { situs } from "@/data/situs";
import type { LayananBeranda } from "@/data/layanan";

/**
 * Hero detail layanan — diport dari `ServiceHero` easytax-demo:
 * breadcrumb tiga level, tag pill, judul dengan subjudul kuning,
 * deskripsi, satu tombol, dan foto di kolom kanan.
 */
export function LayananDetailHero({ layanan }: { layanan: LayananBeranda }) {
  return (
    <section className="border-b border-white/10 bg-navy-hero px-6 pt-[60px] pb-[70px] text-white md:px-8">
      <div className="mx-auto grid w-full max-w-maks grid-cols-1 items-center gap-[50px] lg:grid-cols-2">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.88rem] text-teks-terang"
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

          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/16 bg-white/6 px-4 py-2.5 text-[0.78rem] font-extrabold tracking-[0.13em] text-yellow-400 uppercase">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-yellow-500" />
            Tax &amp; Accounting Service
          </p>

          <h1 className="my-[18px] font-heading text-[clamp(2rem,3.2vw,2.8rem)] leading-[1.2] font-black tracking-[-0.02em] text-white">
            {layanan.judul}
            <br />
            <span className="text-yellow-500">{layanan.subjudul}</span>
          </h1>

          <p className="max-w-[600px] text-[1.05rem] leading-[1.7] text-teks-terang">
            {layanan.ringkasan}
          </p>

          <div className="mt-7 w-fit">
            <Tombol
              href={situs.whatsappUrl}
              external
              ukuran="sedang"
              ikonKanan={<PanahKanan className="h-4 w-4" />}
              className="w-fit rounded-md py-[13px] px-7 text-[0.95rem]"
            >
              Konsultasi Gratis
            </Tombol>
          </div>
        </div>

        <div className="relative h-[390px] overflow-hidden rounded-[28px] bg-navy-950">
          <Image
            src={layanan.gambar}
            alt={layanan.judul}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}