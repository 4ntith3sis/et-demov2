import Image from "next/image";

type LogoMitra = { name: string; logo: string; website?: string };

function ulangi(logos: LogoMitra[]): LogoMitra[] {
  return [...logos, ...logos];
}

function LogoCarousel({
  logos,
  reverse = false,
}: {
  logos: LogoMitra[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className={`${reverse ? "animasi-marquee-terbalik" : "animasi-marquee"} flex w-max items-center gap-8 md:gap-12`}
      >
        {ulangi(logos).map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex h-24 w-48 shrink-0 items-center justify-center px-3 md:h-28 md:w-56"
          >
            <span className="relative block h-24 w-44 md:h-28 md:w-52">
              <Image
                src={item.logo}
                alt={item.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain object-center"
              />
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,var(--color-netral-putih),transparent)] lg:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,var(--color-netral-putih),transparent)] lg:w-32"
      />
    </div>
  );
}

const FAKTA = [
  { nilai: "97%", label: "Kepuasan Klien" },
  { nilai: "< 5 menit", label: "respons konsultan" },
  { nilai: "BKP & IAPI", label: "sertifikasi konsultan" },
];

export function Mitra({ clients, supported, settings }: { clients: LogoMitra[]; supported: LogoMitra[]; settings?: { label?: string; title?: string; description?: string; clientsLabel?: string; supportedLabel?: string; facts?: { value: string; label: string }[] } }) {
  const fakta = settings?.facts?.length ? settings.facts : FAKTA.map((item) => ({ value: item.nilai, label: item.label }));
  return (
    <section
      id="mitra"
      aria-labelledby="mitra-judul"
      className="bg-white pt-[clamp(20px,3vw,32px)] pb-[clamp(44px,6vw,64px)]"
    >
      <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/12 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-navy-900 uppercase">
              {settings?.label ?? "Mitra yang sudah percaya"}
            </span>

            <h2
              id="mitra-judul"
              className="mt-6 font-heading text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.25] font-bold tracking-[-0.03em] text-navy-900 text-balance"
            >
              {settings?.title ?? "Ribuan UMKM dan perusahaan mempercayakan pajaknya kepada EasyTax"}
            </h2>

            <p className="mt-4 text-[1rem] leading-[1.7] text-teks-sekunder">
              {settings?.description ?? "Pembukuan, perizinan PKP, sampai pelaporan SPT, semuanya ditangani tenaga ahli berlisensi dengan proses yang aman dan terlacak."}
            </p>
          </div>

          <ul className="flex shrink-0 flex-wrap gap-3 lg:gap-4">
            {fakta.map((fakta) => (
              <li
                key={fakta.label}
                className="min-w-[112px] flex-1 rounded-xl border border-garis bg-netral-lat px-4 py-3.5 text-center"
              >
                <span className="block font-heading text-[1.15rem] leading-none font-bold tracking-[-0.035em] text-navy-900">
                  {fakta.value}
                </span>
                <span className="mt-2 block text-[0.7rem] leading-tight font-semibold tracking-[0.02em] text-teks-redup uppercase break-words">
                  {fakta.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 text-center font-heading text-[0.92rem] leading-none font-extrabold tracking-[0.16em] text-navy-900 uppercase">
            {settings?.clientsLabel ?? "Our Clients"}
          </h3>
          <LogoCarousel logos={clients} />
        </div>

        <div className="mt-10">
          <h3 className="mb-5 text-center font-heading text-[0.92rem] leading-none font-extrabold tracking-[0.16em] text-navy-900 uppercase">
            {settings?.supportedLabel ?? "Supported By"}
          </h3>
          <LogoCarousel logos={supported} reverse />
        </div>
      </div>
    </section>
  );
}
