import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ambilPengaturanSitus } from "@/lib/cms/content";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const situs = await ambilPengaturanSitus();
  return { title: `${situs.nama} - ${situs.subjudul}`, description: situs.deskripsi, openGraph: { locale: "id_ID", siteName: situs.nama, type: "website" } };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const situs = await ambilPengaturanSitus();
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-navy-900">
        <Navbar situs={situs} />
        <main id="konten-utama" className="flex-1">
          {children}
        </main>
        <Footer situs={situs} />
      </body>
    </html>
  );
}
