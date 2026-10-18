import { chromium } from "playwright";
const tag = process.argv[2] || "before";
const routes = [
  ["", "home"], ["/layanan", "layanan"], ["/layanan/restitusi-pajak", "restitusi"],
  ["/tulisan-pajak", "tulisan"], ["/tulisan-pajak/rekonsiliasi-fiskal-positif-negatif", "artikel"],
  ["/tentang-kami", "tentang"], ["/kontak", "kontak"], ["/kalkulator-pajak", "kalkulator"],
];
const vps = [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]];
const b = await chromium.launch();
for (const [vp, w, h] of vps) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const [route, name] of routes) {
    await p.goto("http://localhost:3004" + route, { waitUntil: "networkidle", timeout: 30000 });
    await p.waitForTimeout(300);
    await p.screenshot({ path: `/tmp/spacing-${tag}-${name}-${vp}.png`, fullPage: true });
  }
  await p.close();
}
await b.close();
console.log("shots done:", tag);
