import { Dokumen, Jam, Obrolan, Perisai, TrenNaik } from "@/components/ikon";

const LANGKAH = [
  {
    judul: "Pilih Layanan",
    deskripsi:
      "Pilih layanan yang sesuai dengan kebutuhan pajak Anda.",
    ikon: <Dokumen className="h-5 w-5" />,
  },
  {
    judul: "Konsultasi",
    deskripsi:
      "Konsultasi gratis bersama konsultan untuk memetakanudukan pajak Anda.",
    ikon: <Obrolan className="h-5 w-5" />,
  },
  {
    judul: "Proses",
    deskripsi:
      "Dokumen Anda diperiksa dan dikerjakan oleh tenaga ahli berlisensi.",
    ikon: <Jam className="h-5 w-5" />,
  },
  {
    judul: "Hasil",
    deskripsi:
      "Laporan rapi dan berkas selesai tepat waktu, siap Anda pakai.",
    ikon: <Perisai className="h-5 w-5" />,
  },
] as const;

/**
 * Section "How It Works": panel navy melengkung berisi empat kartu langkah
 * dan garis waktu 01-04 di bawahnya, mengikuti referensi desain.
 */
export function CaraKerja() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-judul"
      className="bg-white px-6 py-[clamp(44px,7vw,64px)] md:px-8"
    >
      <div className="relative mx-auto w-full max-w-maks overflow-hidden rounded-[28px] bg-navy-hero px-6 py-[clamp(40px,5vw,72px)] md:px-10">
        <div className="relative flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[0.85rem] font-bold tracking-[0.04em] text-white uppercase">
            <TrenNaik className="h-3.5 w-3.5 text-yellow-500" />
            Cara Kerja
          </span>

          <h2
            id="cara-kerja-judul"
            className="mt-6 max-w-[720px] font-heading text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.2] font-bold tracking-[-0.03em] text-white"
          >
            Empat langkah sederhana untuk menyelesaikan urusan pajak yang rumit.
          </h2>
        </div>

        <ol className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {LANGKAH.map((langkah, i) => (
            <li
              key={langkah.judul}
              className="flex min-h-[210px] flex-col justify-between rounded-lg bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading text-[1.32rem] leading-[1.15] font-bold tracking-[-0.035em] text-teks-gelap">
                  {langkah.judul}
                </h3>
                <span className="shrink-0 text-teks-gelap">{langkah.ikon}</span>
              </div>

              <p className="mt-8 text-[0.92rem] leading-[1.6] font-medium text-teks-sekunder">
                {langkah.deskripsi}
              </p>

              <span aria-hidden="true" className="sr-only">
                Langkah {i + 1}
              </span>
            </li>
          ))}
        </ol>

        {/* Garis waktu 01 - 04 */}
        <ol className="relative mt-12 flex items-center">
          {LANGKAH.map((langkah, i) => (
            <li key={langkah.judul} className="flex flex-1 items-center last:flex-none">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-950 font-heading text-[0.95rem] font-bold text-white">
                0{i + 1}
              </span>
              {i < LANGKAH.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mx-3 h-px w-full bg-white/25 max-lg:hidden"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}