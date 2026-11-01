import Image from "next/image";

export function PembayaranShopee() {
  return (
    <section
      aria-labelledby="pembayaran-shopee-title"
      className="relative overflow-hidden bg-white px-6 pt-[clamp(12px,2vw,26px)] pb-[clamp(20px,3vw,38px)] md:px-8"
    >
      <div className="mx-auto grid w-full max-w-maks items-center gap-6 lg:grid-cols-[0.85fr_1fr] lg:gap-10">
        <div className="relative order-2 flex min-h-[180px] items-center justify-center p-1 sm:min-h-[230px] lg:order-1">
          <span aria-hidden="true" className="absolute left-8 top-6 h-16 w-16 rounded-full border border-yellow-500/40" />
          <span aria-hidden="true" className="absolute bottom-6 right-8 h-24 w-24 rounded-full bg-yellow-500/15 blur-2xl" />
          <Image
            src="/images/payment/shopee-payment.svg"
            alt="Ilustrasi pembayaran layanan EasyTax melalui Shopee dengan status transaksi terverifikasi"
            width={640}
            height={480}
            className="relative z-10 h-auto w-full max-w-[400px]"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/15 px-3.5 py-1.5 text-[0.68rem] font-extrabold tracking-[0.12em] text-navy-900 uppercase">
            <span className="h-2 w-2 rounded-full bg-[#ee4d2d]" />
            Pilihan Pembayaran
          </p>
          <h2 id="pembayaran-shopee-title" className="max-w-[520px] font-heading text-[clamp(1.55rem,2.5vw,2.2rem)] leading-[1.15] font-black tracking-[-0.04em] text-navy-900">
            Bayar layanan EasyTax dengan nyaman melalui Shopee
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2.5" aria-label="Shopee">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ee4d2d] text-lg font-black text-white">S</span>
            <span className="font-heading text-[1.35rem] font-black tracking-[-0.04em] text-[#ee4d2d]">Shopee</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.68rem] font-bold text-emerald-700">Transaksi terlindungi</span>
          </div>
          <p className="mt-3 max-w-[520px] text-[0.92rem] leading-[1.7] text-teks-sekunder">
            Ingin melakukan pembayaran melalui marketplace? Anda dapat memilih Shopee sebagai alternatif transaksi layanan EasyTax. Pastikan detail layanan dan pesanan sesuai sebelum menyelesaikan pembayaran.
          </p>
        </div>
      </div>
    </section>
  );
}
