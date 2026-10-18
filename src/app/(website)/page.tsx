import { Artikel } from "@/components/sections/Artikel";
import { CTA } from "@/components/sections/CTA";
import { CaraKerja } from "@/components/sections/CaraKerja";
import { Hero } from "@/components/sections/Hero";
import { Keunggulan } from "@/components/sections/Keunggulan";
import { Layanan } from "@/components/sections/Layanan";
import { MediaNasional } from "@/components/sections/MediaNasional";
import { Mitra } from "@/components/sections/Mitra";
import { Testimoni } from "@/components/sections/Testimoni";

/**
 * Landing page EasyTax.
 *
 * Section berikutnya menyusul — masing-masing menunggu referensi desain
 * dulu, lalu dibuat satu per satu.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Keunggulan />
      <Layanan />
      <CaraKerja />
      <Artikel />
      <Mitra />
      <MediaNasional />
      <Testimoni />
      <CTA />
    </>
  );
}
