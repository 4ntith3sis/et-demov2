import Image from "next/image";

const MEDIA = [
  {
    nama: "Industry.co.id",
    url: "https://www.industry.co.id",
    gambar: "industry.png",
  },
  {
    nama: "Warta Ekonomi",
    url: "https://wartaekonomi.co.id",
    gambar: "warta-ekonomi.png",
  },
  { nama: "JPNN.com", url: "https://jpnn.com", gambar: "jpnn.png" },
  {
    nama: "SINDOnews",
    url: "https://sindonews.com",
    gambar: "sindonews.png",
  },
  {
    nama: "Business Asia",
    url: "https://businessasia.co.id",
    gambar: "business-asia.png",
  },
] as const;

/** Logo media resmi yang digunakan EasyTax, disimpan lokal untuk konsistensi. */
export function MediaNasional({ media = MEDIA, heading }: { media?: readonly { nama: string; url: string; gambar: string }[]; heading?: string }) {
  return (
    <section
      id="media"
      aria-labelledby="media-judul"
      className="border-b border-garis bg-white py-[clamp(44px,6vw,64px)]"
    >
      <div className="mx-auto flex w-full max-w-maks flex-col items-center gap-[22px] px-6 text-center md:px-8">
        <h2
          id="media-judul"
          className="font-heading text-[0.92rem] leading-none font-extrabold tracking-[0.12em] text-navy-900 uppercase"
        >
          {heading ?? "Telah Diliput Oleh Media Nasional:"}
        </h2>

        <ul className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-9">
          {media.map((media) => (
            <li key={media.nama}>
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                title={media.nama}
                className="flex h-12 w-40 items-center justify-center px-3 opacity-85 grayscale-[15%] transition-[var(--transition-base)] hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={media.gambar}
                  alt={media.nama}
                  width={160}
                  height={48}
                  className="h-auto max-h-10 w-auto max-w-full object-contain"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
