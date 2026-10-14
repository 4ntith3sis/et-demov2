import { chromium } from "playwright";
const routes = [["/","home"],["/layanan","layanan"],["/layanan/restitusi-pajak","restitusi"],["/tulisan-pajak","tulisan"],["/tulisan-pajak/rekonsiliasi-fiskal-positif-negatif","artikel"],["/tentang-kami","tentang"],["/kontak","kontak"],["/kalkulator-pajak","kalkulator"]];
const vps = [["desktop",1440,900],["mobile",390,844]];
const b = await chromium.launch();
for (const [vp,w,h] of vps) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  for (const [route,name] of routes) {
    await p.goto("http://localhost:3004"+route,{waitUntil:"networkidle",timeout:30000});
    const data = await p.evaluate(() => {
      const secs = [...document.querySelectorAll("section")];
      const out = secs.map((s,i) => {
        const cs = getComputedStyle(s);
        const pt = parseFloat(cs.paddingTop), pb = parseFloat(cs.paddingBottom);
        const nxt = secs[i+1];
        const gap = nxt ? (parseFloat(getComputedStyle(nxt).paddingTop) + pb) : 0;
        const r = s.getBoundingClientRect();
        return { id: s.id || s.className.split(" ").slice(0,2).join("."), pt: Math.round(pt), pb: Math.round(pb), h: Math.round(r.height), boundaryWithNext: Math.round(gap) };
      });
      const over = [...document.querySelectorAll("body *")].filter(el => el.scrollWidth > document.documentElement.clientWidth + 1).map(el => el.tagName+"."+String(el.className).slice(0,40)).slice(0,3);
      return { secs: out, overflowX: over, docH: document.documentElement.scrollHeight };
    });
    console.log(`\n## ${vp} ${name} (docH=${data.docH}${data.overflowX.length?" OVERFLOW:"+data.overflowX:""})`);
    for (const s of data.secs) console.log(`  ${s.id.padEnd(28)} pt=${String(s.pt).padStart(3)} pb=${String(s.pb).padStart(3)} h=${String(s.h).padStart(4)} boundary=${s.boundaryWithNext}`);
  }
  await p.close();
}
await b.close();
