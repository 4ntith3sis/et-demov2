import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { situs } from "@/data/situs";

/**
 * Layout website publik: Navbar + main + Footer.
 *
 * Sengaja dipisah dari root layout supaya route admin di masa depan
 * (Payload CMS) tidak mewarisi chrome situs publik. Metadata global juga
 * ditaruh di sini — root layout hanya menangani <html>/<body> dan font.
 */
export const metadata: Metadata = {
  title: `${situs.nama} - Jasa Konsultan Pajak dan Akuntansi Perusahaan`,
  description: situs.deskripsi,
  openGraph: {
    locale: "id_ID",
    siteName: situs.nama,
    type: "website",
  },
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="konten-utama" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
