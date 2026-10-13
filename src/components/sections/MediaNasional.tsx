/* ==========================================================================
   Section "Telah Diliput Oleh Media Nasional".

   Logo di v1 bukan file gambar, melainkan wordmark SVG yang digambar inline
   supaya warnanya tetap tajam di layar retina dan bisa dipakai ulang di
   sini. Layout-nya berbeda dari v1: identitas dipisah di panel navy,
   sementara logo-media berdiri sendiri sebagai kartu putih di bawahnya.
   ========================================================================== */

const MEDIA = [
  { nama: "Industry.co.id", url: "https://www.industry.co.id", lebar: 160 },
  { nama: "Warta Ekonomi", url: "https://wartaekonomi.co.id", lebar: 170 },
  { nama: "JPNN.com", url: "https://jpnn.com", lebar: 135 },
  { nama: "SINDOnews", url: "https://sindonews.com", lebar: 155 },
  { nama: "Business Asia", url: "https://businessasia.co.id", lebar: 160 },
] as const;

type NamaMedia = (typeof MEDIA)[number]["nama"];

/** Wordmark tiap media, memakai viewBox 0 0 <lebar> 38 ala v1. */
function Wordmark({
  nama,
  terang = false,
}: {
  nama: NamaMedia;
  /** true saat wordmark berdiri di atas latar navy: warna gelap -> putih. */
  terang?: boolean;
}) {
  /* Warna teks yang adaptable supaya wordmark terbaca di kedua latar. */
  const gelap = terang ? "#FFFFFF" : "#0E1E40";
  const redup = terang ? "rgba(255,255,255,0.6)" : "#64748b";

  switch (nama) {
    case "Industry.co.id":
      return (
        <svg viewBox="0 0 160 38" fill="none" role="img" aria-label="Industry.co.id" width={160} height={38} className="h-8 w-auto">
          <rect x="0" y="7" width="22" height="24" rx="4" fill="#0077C8" />
          <text x="5" y="24" fontFamily="var(--font-heading)" fontWeight="900" fontSize="16" fill="#FFFFFF">
            i
          </text>
          <text x="28" y="24" fontFamily="var(--font-heading)" fontWeight="800" fontSize="17" fill={gelap} letterSpacing="-0.5">
            industry
          </text>
          <text x="104" y="24" fontFamily="var(--font-heading)" fontWeight="800" fontSize="14" fill="#0077C8">
            .co.id
          </text>
        </svg>
      );

    case "Warta Ekonomi":
      return (
        <svg viewBox="0 0 170 38" fill="none" role="img" aria-label="Warta Ekonomi" width={170} height={38} className="h-8 w-auto">
          <text x="0" y="23" fontFamily="var(--font-heading)" fontWeight="900" fontSize="17" fill="#C4161C" letterSpacing="-0.5">
            WARTA
          </text>
          <text x="76" y="23" fontFamily="var(--font-heading)" fontWeight="800" fontSize="17" fill={gelap} letterSpacing="-0.5">
            EKONOMI
          </text>
        </svg>
      );

    case "JPNN.com":
      return (
        <svg viewBox="0 0 135 38" fill="none" role="img" aria-label="JPNN.com" width={135} height={38} className="h-8 w-auto">
          <text x="0" y="24" fontFamily="var(--font-heading)" fontWeight="900" fontSize="22" fill="#E52320" letterSpacing="-0.5">
            JPNN
          </text>
          <text x="74" y="24" fontFamily="var(--font-heading)" fontWeight="800" fontSize="16" fill={gelap}>
            .com
          </text>
        </svg>
      );

    case "SINDOnews":
      return (
        <svg viewBox="0 0 155 38" fill="none" role="img" aria-label="SINDOnews" width={155} height={38} className="h-8 w-auto">
          <text x="0" y="23" fontFamily="var(--font-heading)" fontWeight="900" fontSize="18" fill={gelap} letterSpacing="-0.5">
            SINDO
          </text>
          <text x="72" y="23" fontFamily="var(--font-heading)" fontWeight="900" fontSize="18" fill="#E52320" letterSpacing="-0.5">
            news
          </text>
          <text x="126" y="23" fontFamily="var(--font-heading)" fontWeight="700" fontSize="12" fill={redup}>
            .com
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 160 38" fill="none" role="img" aria-label="Business Asia" width={160} height={38} className="h-8 w-auto">
          <text x="0" y="23" fontFamily="var(--font-heading)" fontWeight="900" fontSize="16" fill={gelap} letterSpacing="0.5">
            BUSINESS
          </text>
          <text x="96" y="23" fontFamily="var(--font-heading)" fontWeight="800" fontSize="16" fill="#E5A812" letterSpacing="0.5">
            ASIA
          </text>
        </svg>
      );
  }
}

export function MediaNasional() {
  return (
    <section
      id="media"
      aria-labelledby="media-judul"
      className="bg-white py-[clamp(44px,6vw,64px)]"
    >
      <div className="mx-auto flex w-full max-w-maks flex-col gap-10 px-6 md:px-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex items-center gap-5 lg:flex-1">
          <span
            aria-hidden="true"
            className="h-14 w-1.5 shrink-0 rounded-full bg-yellow-500"
          />
          <div>
            <h2
              id="media-judul"
              className="font-heading text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.25] font-bold tracking-[-0.03em] text-navy-900"
            >
              Telah Diliput Oleh Media Nasional
            </h2>
            <p className="mt-2 text-[0.95rem] leading-[1.6] text-teks-sekunder">
              Kisah dan pengalaman layanan EasyTax pernah diliput oleh media
              nasional.
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 lg:flex-[1.25] lg:justify-end">
          {MEDIA.map((media) => (
            <li key={media.nama}>
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                title={media.nama}
                className="block w-auto opacity-65 grayscale transition-[var(--transition-base)] hover:opacity-100 hover:grayscale-0"
              >
                <Wordmark nama={media.nama} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
