import { chromium } from "playwright";

/**
 * Audit lebar desktop: ukur container, margin, overflow, dan heading
 * pada matriks viewport desktop besar. Output: /tmp/measure-desktop-<tag>.json
 * + tabel ringkas di stdout.
 */
const tag = process.argv[2] || "before";
const routes = [
  ["", "home"],
  ["/layanan", "layanan"],
  ["/layanan/restitusi-pajak", "restitusi"],
  ["/tulisan-pajak", "tulisan"],
  ["/tulisan-pajak/rekonsiliasi-fiskal-positif-negatif", "artikel"],
  ["/tentang-kami", "tentang"],
  ["/kontak", "kontak"],
  ["/kalkulator-pajak", "kalkulator"],
];
const vps = [
  ["1366", 1366, 768],
  ["1440", 1440, 900],
  ["1600", 1600, 900],
  ["1920", 1920, 1080],
  ["2560", 2560, 1440],
];

const b = await chromium.launch();
const hasil = [];

for (const [vp, w, h] of vps) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const [route, name] of routes) {
    await p.goto("http://localhost:3004" + route, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await p.waitForTimeout(250);

    const data = await p.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth > doc.clientWidth;

      const kontainer = [...document.querySelectorAll(".max-w-maks")].map((el) => {
        const r = el.getBoundingClientRect();
        return {
          w: Math.round(r.width),
          left: Math.round(r.left),
          tag: el.tagName.toLowerCase(),
        };
      });
      const lebarUnik = [...new Set(kontainer.map((k) => k.w))].sort((a, b) => a - b);
      const marginKiri = kontainer.length ? kontainer[0].left : null;

      const h1 = document.querySelector("h1");
      let h1Data = null;
      if (h1) {
        const r = h1.getBoundingClientRect();
        const cs = getComputedStyle(h1);
        h1Data = {
          w: Math.round(r.width),
          fontSize: cs.fontSize,
          left: Math.round(r.left),
        };
      }

      // Container Keunggulan (khusus, bukan max-w-maks)
      const keu = document.querySelector('section[aria-labelledby="keunggulan-judul"] > div');
      const keuW = keu ? Math.round(keu.getBoundingClientRect().width) : null;

      // H1 kontainer non-maks yang menonjol (kalkulator card)
      const kal = document.querySelector("#kalkulator .overflow-hidden");
      const kalW = kal ? Math.round(kal.getBoundingClientRect().width) : null;

      return { overflow, lebarUnik, marginKiri, h1Data, keuW, kalW };
    });

    hasil.push({ vp, route: name, ...data });
  }
  await p.close();
}

await b.close();
await import("node:fs").then((fs) =>
  fs.writeFileSync(`/tmp/measure-desktop-${tag}.json`, JSON.stringify(hasil, null, 1)),
);

for (const r of hasil) {
  console.log(
    `[${r.vp}] ${r.route.padEnd(9)} container=${r.lebarUnik.join("/")} margin=${r.marginKiri} ` +
      `h1=${r.h1Data ? r.h1Data.fontSize + "@" + r.h1Data.w : "-"} keu=${r.keuW ?? "-"} kal=${r.kalW ?? "-"}` +
      (r.overflow ? " OVERFLOW!" : ""),
  );
}
console.log("saved", tag);
