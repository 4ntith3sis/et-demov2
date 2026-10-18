import { chromium } from "playwright";

/** Full-page screenshot matriks desktop besar: 5 vp x 8 route -> /tmp/sd-*.png */
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
for (const [vp, w, h] of vps) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const [route, name] of routes) {
    await p.goto("http://localhost:3004" + route, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await p.waitForTimeout(300);
    await p.screenshot({ path: `/tmp/sd-${tag}-${name}-${vp}.png`, fullPage: true });
  }
  await p.close();
  console.log("vp", vp, "done");
}
await b.close();
console.log("done", tag);
