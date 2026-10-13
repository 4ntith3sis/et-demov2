"use client";

import { useEffect, useState } from "react";

import { Dokumen } from "@/components/ikon";
import type { HeadingToc } from "@/lib/artikel/toc";

/**
 * Daftar isi artikel — sticky di kolom kanan (desktop) dan accordion di
 * atas konten (mobile). Aktif otomatis mengikuti bagian yang sedang
 * terlihat lewat IntersectionObserver.
 *
 * Konten & perilaku diadaptasi dari `ArticleTableOfContents`
 * easytax-demo; tampilan memakai gaya v2 (chip ikon, nomor urut kuning,
 * sorotan aktif kuning).
 */
export function DaftarIsiArtikel({ headings }: { headings: HeadingToc[] }) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [terbuka, setTerbuka] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;
    const pengamat = new IntersectionObserver(
      (entries) => {
        for (const entri of entries) {
          if (entri.isIntersecting) setAktif(entri.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    const elemen: Element[] = [];
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) {
        elemen.push(el);
        pengamat.observe(el);
      }
    }
    return () => {
      for (const el of elemen) pengamat.unobserve(el);
      pengamat.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const keBagian = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setAktif(id);
    }
    setTerbuka(false);
  };

  const daftar = (idNav: string) => (
    <nav aria-label="Daftar isi" id={idNav}>
      <ol className="grid gap-1">
        {headings.map((h, i) => {
          const menyala = aktif === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => keBagian(e, h.id)}
                aria-current={menyala ? "true" : undefined}
                className={
                  menyala
                    ? "flex gap-3 rounded-lg bg-yellow-500/15 px-3 py-2 text-[0.84rem] leading-snug font-bold text-navy-900 no-underline transition-[var(--transition-base)]"
                    : "flex gap-3 rounded-lg px-3 py-2 text-[0.84rem] leading-snug text-teks-sekunder no-underline transition-[var(--transition-base)] hover:bg-white hover:text-navy-900"
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    menyala
                      ? "font-heading text-[0.72rem] font-extrabold text-yellow-600 tabular-nums"
                      : "font-heading text-[0.72rem] font-extrabold text-teks-redup tabular-nums"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={h.level > 2 ? "pl-3" : ""}>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky di kolom kanan */}
      <nav className="hidden rounded-2xl border border-garis bg-netral-lat p-5 shadow-sm lg:block">
        <p className="mb-3 flex items-center gap-2.5 font-heading text-[0.9rem] font-extrabold text-navy-900">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-navy-900 text-yellow-500">
            <Dokumen className="h-3.5 w-3.5" />
          </span>
          Daftar Isi
        </p>
        {daftar("daftar-isi-desktop")}
      </nav>

      {/* Mobile: toggle di atas konten */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setTerbuka((v) => !v)}
          aria-expanded={terbuka}
          aria-controls="daftar-isi-mobile"
          className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-garis bg-netral-lat px-5 py-3.5 font-heading text-[0.95rem] font-bold text-navy-900"
        >
          <span className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-navy-900 text-yellow-500">
              <Dokumen className="h-3.5 w-3.5" />
            </span>
            Daftar Isi
          </span>
          <span
            aria-hidden="true"
            className="text-navy-900 transition-transform duration-300"
            style={{ transform: terbuka ? "rotate(45deg)" : "none" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>

        {terbuka && (
          <div className="mt-2 max-h-[320px] overflow-y-auto rounded-xl border border-garis bg-white p-4">
            {daftar("daftar-isi-mobile")}
          </div>
        )}
      </div>
    </>
  );
}
