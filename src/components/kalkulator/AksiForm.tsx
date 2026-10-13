import { Tombol } from "@/components/ui/Tombol";

/** Tombol Hitung + Reset — port dari `CalculatorActions` v1. */
export function AksiForm({ onReset, tengah = false }: { onReset: () => void; tengah?: boolean }) {
  return (
    <div className={tengah ? "mt-7 flex flex-wrap justify-center gap-3" : "mt-7 flex flex-wrap gap-3"}>
      <Tombol tipe="submit" ukuran="sedang" className="rounded-md">
        Hitung
      </Tombol>
      <Tombol tipe="button" varian="garis" ukuran="sedang" className="rounded-md" onClick={onReset}>
        Reset
      </Tombol>
    </div>
  );
}
