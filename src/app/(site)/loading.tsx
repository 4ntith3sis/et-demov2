export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
      className="flex min-h-[50vh] items-center justify-center px-6 py-20"
    >
      <span className="text-sm font-semibold text-teks-sekunder">
        Memuat halaman<span className="loading-dots" aria-hidden="true">...</span>
      </span>
      <span className="sr-only">Memuat halaman</span>
    </div>
  );
}
