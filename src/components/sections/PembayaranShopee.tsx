import Image from "next/image";

export function PembayaranShopee() {
  return (
    <section
      aria-labelledby="pembayaran-shopee-title"
      className="relative overflow-hidden bg-[#f5f7fc] px-6 py-[clamp(56px,7vw,96px)] md:px-8"
    >
      <div className="mx-auto grid w-full max-w-maks items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div className="relative order-2 flex min-h-[240px] items-center justify-center p-2 sm:min-h-[320px] lg:order-1">
          <span aria-hidden="true" className="absolute left-8 top-8 h-20 w-20 rounded-full border border-yellow-500/40" />
          <span aria-hidden="true" className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-yellow-500/15 blur-2xl" />
          <Image
            src="/images/payment/shopee-payment.svg"
            alt="Ilustrasi pembayaran layanan EasyTax melalui Shopee dengan status transaksi terverifikasi"
            width={640}
            height={480}
            className="relative z-10 h-auto w-full max-w-[520px]"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/15 px-4 py-2 text-xs font-extrabold tracking-[0.12em] text-navy-900 uppercase">
            <span className="h-2 w-2 rounded-full bg-[#ee4d2d]" />
            Pilihan Pembayaran
          </p>
          <h2 id="pembayaran-shopee-title" className="max-w-[560px] font-heading text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.13] font-black tracking-[-0.04em] text-navy-900">
            Bayar layanan EasyTax dengan nyaman melalui Shopee
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3" aria-label="Shopee">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ee4d2d] text-xl font-black text-white">S</span>
            <span className="font-heading text-[1.6rem] font-black tracking-[-0.04em] text-[#ee4d2d]">Shopee</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[0.72rem] font-bold text-emerald-700">Transaksi terlindungi</span>
          </div>
          <p className="mt-5 max-w-[560px] text-[1rem] leading-[1.8] text-teks-sekunder">
            Ingin melakukan pembayaran melalui marketplace? Anda dapat memilih Shopee sebagai alternatif transaksi layanan EasyTax. Pastikan detail layanan dan pesanan sesuai sebelum menyelesaikan pembayaran.
          </p>
        </div>
      </div>
    </section>
  );
}
