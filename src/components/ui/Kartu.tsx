import { cn } from "@/lib/cn";

/**
 * Kartu generik untuk konten grid — layanan, artikel, nilai, dll.
 * Tidak membawa styling domain; pemanggil yang memilih variant.
 */
type PropsKartu = {
  children: React.ReactNode;
  className?: string;
  /** true = kartu bisa diklik (dibungkus <a>/<Link> oleh pemanggil). */
  bolehDitekan?: boolean;
};

export function Kartu({ children, className, bolehDitekan }: PropsKartu) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-garis bg-white shadow-sm",
        bolehDitekan &&
          "transition-[all] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-yellow-500/50 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}