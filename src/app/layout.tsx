import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

/* next/font: self-hosted + preload + font-display swap, tanpa request
   ke Google saat runtime. v1 masih pakai <link> manual ke CDN. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Root layout: hanya <html>/<body>, font global, dan globals.css.
 *
 * Chrome situs publik (Navbar/Footer) serta metadata global pindah ke
 * `src/app/(website)/layout.tsx` supaya route admin masa depan (Payload
 * CMS di `app/(payload)`) tidak mewarisi layout maupun metadata situs.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy-900">
        {children}
      </body>
    </html>
  );
}
