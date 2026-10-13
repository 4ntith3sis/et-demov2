import { Bintang } from "@/components/ikon";
import { testimoni, type Testimoni } from "@/data/testimoni";

/**
 * Section Testimoni: tiga kolom kutipan yang bergerak vertikal.
 *
 * Kolom kiri dan kanan turun, kolom tengah naik, sehingga arah mata bergerak
 * seperti zigzag. Setiap kolom memakai util `.animasi-marquee-atas` /
 * `.animasi-marquee-bawah` dari globals.css; daftarnya digandakan agar
 * loop translateY(-50%) menyambung tanpa lompatan.
 */

/** Bagi rata kutipan ke tiga kolom tanpa menyisakan kolom kosong. */
function bagiTiga(data: Testimoni[]): Testimoni[][] {
  const kolom: Testimoni[][] = [[], [], []];
  data.forEach((item, i) => kolom[i % 3].push(item));
  return kolom;
}

/** Liputan daftar minimum supaya kolom tidak terlihat bolong. */
function ulangi(data: Testimoni[]): Testimoni[] {
  if (data.length === 0) return [];
  const satuRonde = [...data];
  while (satuRonde.length < 4) satuRonde.push(...data);
  return [...satuRonde, ...satuRonde];
}

function Kartu({ item }: { item: Testimoni }) {
  return (
    <figure className="mb-5 flex flex-col rounded-2xl border border-garis bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-1 text-yellow-500">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Bintang key={i} className="h-3.5 w-3.5" />
        ))}
      </div>

      <blockquote className="text-[0.92rem] leading-[1.65] font-medium text-teks-sekunder">
        &ldquo;{item.kutipan}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-garis-halus pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-hero font-heading text-[0.75rem] font-bold text-yellow-500">
          {item.inisial}
        </span>
        <span className="min-w-0">
          <span className="block font-heading text-[0.9rem] font-bold tracking-[-0.02em] text-navy-900">
            {item.nama}
          </span>
          <span className="block text-[0.75rem] text-teks-redup">
            {item.peran}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Kolom({
  data,
  arah,
}: {
  data: Testimoni[];
  arah: "atas" | "bawah";
}) {
  return (
    <div className="relative h-[clamp(360px,52vh,560px)] overflow-hidden">
      <div
        className={
          arah === "atas"
            ? "animasi-marquee-atas flex w-full flex-col"
            : "animasi-marquee-bawah flex w-full flex-col"
        }
      >
        {ulangi(data).map((item, i) => (
          <Kartu key={`${item.nama}-${i}`} item={item} />
        ))}
      </div>

      {/* Fade di atas dan bawah supaya kartu yang keluar tidak terpotong. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,var(--color-netral-lat),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,var(--color-netral-lat),transparent)]"
      />
    </div>
  );
}

export function Testimoni() {
  const kolom = bagiTiga(testimoni);

  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-judul"
      className="relative overflow-hidden bg-netral-lat py-[clamp(44px,6vw,64px)]"
    >
      <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-600/60 bg-yellow-500/12 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-navy-900 uppercase">
            Testimoni
          </span>

          <h2
            id="testimoni-judul"
            className="mt-6 max-w-[720px] font-heading text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.25] font-bold tracking-[-0.03em] text-navy-900 text-balance"
          >
            Pengalaman dari mereka yang sudah kami layani
          </h2>

          <p className="mt-4 max-w-[640px] text-[1rem] leading-[1.7] text-teks-sekunder">
            Dari UMKM kuliner, retail, agency, hingga korporasi besar,
            semuanya mempercayakan urusan pajak dan pembukuan kepada
            EasyTax.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {kolom.map((data, i) => (
            <Kolom
              key={i}
              data={data}
              /* Kiri dan kanan turun, tengah naik. */
              arah={i === 1 ? "atas" : "bawah"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}