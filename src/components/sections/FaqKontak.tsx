import { faqKontak } from "@/data/kontak";

export function FaqKontak() {
  return (
    <section
      id="faq-kontak"
      aria-labelledby="faq-kontak-judul"
      className="bg-[var(--bg)] py-[clamp(44px,6.4vw,64px)]"
    >
      <div className="mx-auto w-full max-w-maks px-6 md:px-8">
        <h2
          id="faq-kontak-judul"
          className="max-w-[640px] font-heading text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.2] font-bold tracking-[-0.03em] text-navy-900 text-balance mb-10"
        >
          Pertanyaan Umum
        </h2>

        <dl className="space-y-4">
          {faqKontak.map((f) => (
            <div key={f.pertanyaan} className="rounded-2xl border border-garis bg-white p-6">
              <div className="flex items-start gap-4">
                <dt
                  className="font-semibold text-navy-900"
                >
                  {f.pertanyaan}
                </dt>
              </div>
              <dd className="mt-3 text-[0.95rem] leading-[1.6] text-teks-sekunder">
                {f.jawaban}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}