import type { BlokIsi, HeadingToc } from "@/lib/artikel/toc";
import { blokDenganId } from "@/lib/artikel/toc";
import { DaftarIsiArtikel } from "@/components/sections/DaftarIsiArtikel";

/**
 * Badan artikel: grid isi (kiri) + daftar isi sticky (kanan), tag di
 * akhir artikel.
 *
 * Tata letak kolom mirip pola umum blog (v1 juga memakai dua kolom),
 * tetapi gaya visual berbeda: foto hero menumpuk ke atas, heading H2
 * bergaris kuning di kiri, dan daftar isi bernomor ala v2.
 */
export function BadanArtikel({
  blok,
  tags,
  headings,
}: {
  blok: BlokIsi[];
  tags: string[];
  headings: HeadingToc[];
}) {
  const blokBerkas = blokDenganId(blok);

  return (
    <section
      aria-label="Isi artikel"
      className="bg-white pt-[84px] pb-[clamp(44px,6.4vw,64px)]"
    >
      <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Daftar isi: di atas konten pada mobile, kolom kanan pada desktop */}
          <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-[92px] lg:self-start">
            <DaftarIsiArtikel headings={headings} />
          </aside>

          {/* Isi artikel */}
          <div className="lg:col-start-1 lg:row-start-1">
            <article className="max-w-[760px]">
              {blokBerkas.map((b, i) => {
                if (b.kind === "heading") {
                  if (b.level === 2) {
                    return (
                      <h2
                        key={b.id ?? `h-${i}`}
                        id={b.id}
                        className="mt-9 mb-3 scroll-mt-28 border-l-4 border-yellow-500 pl-4 font-heading text-[clamp(1.3rem,2.2vw,1.55rem)] leading-[1.35] font-bold text-navy-900"
                      >
                        {b.text}
                      </h2>
                    );
                  }
                  return (
                    <h3
                      key={b.id ?? `h-${i}`}
                      id={b.id}
                      className="mt-7 mb-2.5 scroll-mt-28 font-heading text-[1.15rem] leading-[1.4] font-bold text-navy-900"
                    >
                      {b.text}
                    </h3>
                  );
                }

                if (b.kind === "list") {
                  const TagList = b.ordered ? "ol" : "ul";
                  return (
                    <TagList
                      key={`list-${i}`}
                      className={
                        b.ordered
                          ? "mb-6 grid list-decimal gap-2.5 pl-6 marker:font-heading marker:font-extrabold marker:text-navy-900"
                          : "mb-6 grid list-disc gap-2.5 pl-6 marker:text-navy-900"
                      }
                    >
                      {b.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[1rem] leading-[1.7] text-teks-sekunder"
                        >
                          {item}
                        </li>
                      ))}
                    </TagList>
                  );
                }

                /* Paragraf pertama tampil sedikit lebih besar sebagai lead. */
                return i === 0 ? (
                  <p
                    key={`p-${i}`}
                    className="mb-6 text-[1.1rem] leading-[1.75] font-medium text-navy-900"
                  >
                    {b.text}
                  </p>
                ) : (
                  <p
                    key={`p-${i}`}
                    className="mb-5 text-[1.02rem] leading-[1.8] text-teks-sekunder"
                  >
                    {b.text}
                  </p>
                );
              })}
            </article>

            {/* Tag artikel */}
            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-garis pt-7">
                <span className="mr-1 text-[0.78rem] font-extrabold tracking-[0.08em] text-teks-redup uppercase">
                  Tag
                </span>
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-garis bg-netral-lat px-4 py-1.5 text-[0.84rem] font-semibold text-navy-900"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
