# EasyTax

Website jasa konsultan pajak dan akuntansi perusahaan. Next.js App Router
dengan desain final yang sudah disetujui; konten saat ini masih hardcoded dan
akan dipindahkan ke Payload CMS pada fase berikutnya.

## Stack

- Next.js `16.4.0` (App Router, Turbopack, `cacheComponents`, `partialPrefetching`)
- React `19.3.0`
- Tailwind CSS v4 (`@tailwindcss/turbopack` + `@tailwindcss/postcss`)
- TypeScript (strict)

> Belum ada Payload CMS, Puck Editor, PostgreSQL/pgvector, maupun pipeline
> embedding di repository ini. Fase selanjutnya menambahkannya tanpa
> mengubah desain.

## Perintah

```bash
npm run dev        # dev server di http://localhost:3004
npm run build      # build produksi
npm run start      # jalankan hasil build di port 3004
npm run typecheck  # tsc --noEmit
```

Lint belum dikonfigurasi. Tidak ada test otomatis; verifikasi UI memakai
script Playwright di `scripts/` (dijalankan dari root, output ke `/tmp`):

```bash
node scripts/audit-responsive.mjs before   # audit overflow/tap-target 9 vp x 8 route
node scripts/measure-desktop.mjs before    # ukur container & heading desktop
node scripts/measure-spacing.mjs           # ukur spacing section
node scripts/shot-desktop.mjs before       # screenshot full-page matrix
node scripts/shot-spacing2.mjs before      # screenshot desktop + mobile
node scripts/audit-warna-verify.mjs        # verifikasi warna brand & kontras
```

(`baseline-pixels.mjs` membutuhkan `sharp` yang belum terpasang.)

## Struktur

```
src/
├── app/
│   ├── (website)/            route publik (URL tidak berubah)
│   │   ├── layout.tsx        Navbar + main + Footer + metadata situs
│   │   ├── page.tsx          /
│   │   ├── layanan/          /layanan, /layanan/[slug]
│   │   ├── tulisan-pajak/    /tulisan-pajak, /tulisan-pajak/[slug]
│   │   ├── tentang-kami/     /tentang-kami
│   │   ├── kontak/           /kontak
│   │   └── kalkulator-pajak/ /kalkulator-pajak
│   ├── layout.tsx            root: <html>/<body>, font, globals.css
│   └── globals.css           design token (navy #152269, kuning #f4c922)
├── components/
│   ├── layout/               Navbar, Footer
│   ├── sections/             section halaman (page-specific)
│   ├── kalkulator/           form & workspace kalkulator
│   ├── ui/                   primitif bersama (Tombol, Kartu, Wadah, ...)
│   └── ikon/                 registry ikon SVG
├── data/                     konten hardcoded + konfigurasi situs
├── lib/                      util murni (kalkulator, cn, toc)
└── types/                    tipe lintas komponen
scripts/                      tooling QA visual (Playwright)
public/images/                aset lokal (logo, logo klien)
```

**Konvensi:** route group `(website)` memisahkan situs publik dari admin
Payload yang akan datang. Tipe konten hidup di modul datanya (`src/data/*`);
`src/types/` hanya untuk tipe lintas komponen. `src/lib/` bebas dari React.

## Batas fase berikutnya

- **Payload CMS** → `payload.config.ts`, `src/collections/`, `src/globals/`,
  admin di `src/app/(payload)/admin`, API di `src/app/(payload)/api`.
- **Puck** → `src/puck/` (config + registry komponen), layout halaman di
  collection `Pages`.
- **RAG/pgvector** → embedding artikel, search semantik, sinkronisasi indeks.
