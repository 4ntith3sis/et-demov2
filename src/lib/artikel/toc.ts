// Utilitas daftar isi artikel — diport dari `lib/articles/toc`
// easytax-demo. Renderer isi dan TOC harus selalu memakai algoritma
// slug yang sama supaya anchor selalu cocok.

export type HeadingToc = {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5 | 6;
};

export type BlokIsi =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: 2 | 3 | 4 | 5 | 6; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "bagian";
}

function assignIds(
  headings: { text: string; level: 2 | 3 | 4 | 5 | 6 }[],
): HeadingToc[] {
  const seen = new Map<string, number>();
  return headings.map((h) => {
    const base = slugifyHeading(h.text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return {
      id: count === 1 ? base : `${base}-${count}`,
      text: h.text,
      level: h.level,
    };
  });
}

/** Semua heading H2-H6 dengan ID unik dan stabil. */
export function ekstrakHeading(blok: BlokIsi[]): HeadingToc[] {
  return assignIds(
    blok.filter(
      (b): b is Extract<BlokIsi, { kind: "heading" }> => b.kind === "heading",
    ),
  );
}

/** Blok dengan ID heading terpasang (algoritma sama dengan ekstrakHeading). */
export function blokDenganId(
  blok: BlokIsi[],
): (BlokIsi & { id?: string })[] {
  const ids = ekstrakHeading(
    blok.filter(
      (b): b is Extract<BlokIsi, { kind: "heading" }> => b.kind === "heading",
    ),
  );
  let i = 0;
  return blok.map((b) =>
    b.kind === "heading" ? { ...b, id: ids[i++].id } : b,
  );
}
