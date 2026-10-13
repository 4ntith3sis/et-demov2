import { Email, Obrolan } from "@/components/ikon";
import { Tombol } from "@/components/ui/Tombol";
import { situs } from "@/data/situs";

/**
 * Banner CTA penutup di atas footer.
 * Diport dari easytax-demo (`cta-banner-box`): panel navy dengan gradasi,
 * badge, judul, deskripsi, dan sepasang tombol aksi.
 */
export function CTA() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-navy-hero">
      {/* Sorotan kuning di sudut kanan bawah, seperti v1. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgb(244_201_34/0.15)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-maks px-6 py-[clamp(48px,6.5vw,85px)] text-center md:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/45 bg-yellow-500/15 px-5 py-2 text-[0.85rem] font-bold tracking-[0.04em] text-yellow-500 uppercase">
          <Obrolan className="h-3.5 w-3.5" />
          Siap Membantu Anda
        </span>

        <h2 className="mx-auto mt-6 max-w-[760px] font-heading text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.25] font-extrabold tracking-[-0.03em] text-white text-balance">
          Anda dapat fokus menjalankan bisnis, serahkan urusan perpajakan ke
          EasyTax
        </h2>

        <p className="mx-auto mt-4 max-w-[680px] text-[1.05rem] leading-[1.7] text-white/75">
          Hubungi konsultan kami sekarang untuk mendapatkan konsultasi gratis dan
          solusi perpajakan terbaik bagi perusahaan Anda.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4.5">
          <Tombol
            href={situs.whatsappUrl}
            external
            ukuran="sedang"
            ikonKiri={<Obrolan className="h-4 w-4" />}
            className="h-[54px] rounded-full px-8 text-[0.98rem]"
          >
            Chat WhatsApp Sekarang
          </Tombol>

          <Tombol
            href={`mailto:${situs.kontak.email}`}
            varian="garisPutih"
            ukuran="sedang"
            ikonKiri={<Email className="h-4 w-4" />}
            className="h-[54px] rounded-full px-8 text-[0.98rem]"
          >
            Email: {situs.kontak.email}
          </Tombol>
        </div>
      </div>
    </section>
  );
}