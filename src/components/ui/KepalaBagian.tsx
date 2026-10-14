import { cn } from "@/lib/cn";
import type { JudulBagian } from "@/types";

/**
 * Judul standar untuk section: label kecil + judul besar + deskripsi.
 *
 * `judul` menerima ReactNode supaya kata kunci bisa disorot dengan
 * <span class="text-yellow-500"> tanpa section harus membuat komponen
 * judul sendiri.
 */
export function KepalaBagian({
  label,
  judul,
  deskripsi,
  posisi = "tengah",
  className,
  /** true bila section berlatar navy -> warna teks otomatis terang. */
  gelap = false,
}: JudulBagian & { className?: string; gelap?: boolean }) {
  return (
    <div
      className={cn(
        posisi === "tengah" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {label && (
        <p
          className={cn(
            "mb-3 text-xs font-extrabold tracking-[0.16em] uppercase",
            gelap ? "text-yellow-500" : "text-navy-900",
          )}
        >
          {label}
        </p>
      )}

      <h2
        className={cn(
          "font-heading text-3xl leading-[1.18] font-extrabold tracking-[-0.02em] md:text-4xl",
          gelap ? "text-white" : "text-navy-900",
        )}
      >
        {judul}
      </h2>

      {deskripsi && (
        <p
          className={cn(
            "mt-4 text-[1.05rem] leading-[1.65]",
            gelap ? "text-teks-terang" : "text-teks-redup",
          )}
        >
          {deskripsi}
        </p>
      )}
    </div>
  );
}