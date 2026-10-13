import { cn } from "@/lib/cn";

/**
 * Pembungkus lebar konten. Menggantikan `.container` manual di v1.
 * Padding responsif mengikuti breakpoint yang sama dengan desain asli.
 */
type PropsWadah = {
  children: React.ReactNode;
  className?: string;
  /** false = full-bleed tanpa padding horizontal. */
  adaPadding?: boolean;
};

export function Wadah({ children, className, adaPadding }: PropsWadah) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-maks",
        adaPadding !== false && "px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}