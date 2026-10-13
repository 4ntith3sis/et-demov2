/**
 * Gabungkan class name secara aman.
 *
 * Menolak nilai falsy (false, null, undefined, "") dan menerima string biasa
 * maupun array bertingkat. Cukup untuk kebutuhan demo ini; kalau nanti butuh
 * resolusi konflik Tailwind (clsx + tailwind-merge), tinggal tukar isi fungsi ini
 * tanpa menyentuh call site.
 */
export type NilaiKelas = string | false | null | undefined | NilaiKelas[];

export function cn(...kelas: NilaiKelas[]): string {
  const hasil: string[] = [];

  for (const item of kelas) {
    if (!item) continue;

    if (Array.isArray(item)) {
      const turunan = cn(...item);
      if (turunan) hasil.push(turunan);
    } else {
      hasil.push(item);
    }
  }

  return hasil.join(" ");
}