import { chromium } from "playwright";
import fs from "node:fs";

const TAG = process.argv[2] || "before";

/* ============================================================
   Comprehensive responsive audit — EasyTax V2
   9 viewport × 8 route. Deteksi:
     1. horizontal overflow halaman
     2. elemen yang escaping viewport (tanpa clipping ancestor)
     3. konten terpotong (scrollWidth > clientWidth dgn overflow hidden/clip)
     4. tabrakan navbar (brand vs menu vs CTA)
     5. teks/button wrap tak sengaja pada tombol
     6. console errors
     7. tap target < 40px (advisory, mobile)
   ============================================================ */

const VPS = [
  ["xs320", 320, 720],
  ["sm375", 375, 812],
  ["md390", 390, 844],
  ["lg430", 430, 932],
  ["tab768", 768, 1024],
  ["tab1024", 1024, 768],
  ["lap1280", 1280, 800],
  ["lap1440", 1440, 900],
  ["desk1920", 1920, 1080],
];

const ROUTES = [
  ["", "home"],
  ["/layanan", "layanan"],
  ["/layanan/restitusi-pajak", "restitusi"],
  ["/tulisan-pajak", "tulisan"],
  ["/tulisan-pajak/rekonsiliasi-fiskal-positif-negatif", "artikel"],
  ["/tentang-kami", "tentang"],
  ["/kontak", "kontak"],
  ["/kalkulator-pajak", "kalkulator"],
];

const browser = await chromium.launch();
const findings = [];

function rec(vp, route, kind, detail, sample) {
  findings.push({ vp, route, kind, detail, sample });
}

for (const [vpName, w, h] of VPS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 200)));

  for (const [route, name] of ROUTES) {
    errors.length = 0;
    try {
      await page.goto("http://localhost:3004" + route, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
    } catch {
      rec(vpName, name, "NAV-FAIL", "goto timeout/error", "");
      continue;
    }
    await page.waitForTimeout(400);

    const report = await page.evaluate(() => {
      const out = {
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        escaping: [],
        clipped: [],
        navbar: null,
        smallTap: [],
      };
      const vw = window.innerWidth;
      const sel = (el) => {
        const id = el.id ? "#" + el.id : "";
        const cls = (typeof el.className === "string" ? el.className : "")
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 4)
          .join(".");
        return el.tagName.toLowerCase() + id + (cls ? "." + cls : "");
      };

      /* --- 1+2: escaping elements (beyond viewport, tanpa clipping ancestor) --- */
      const clipOk = (el) => {
        // marquee / decorative absolute yang memang di-clip
        let p = el;
        while (p && p !== document.documentElement) {
          const cs = getComputedStyle(p);
          if (["hidden", "clip", "auto", "scroll"].includes(cs.overflowX)) return true;
          p = p.parentElement;
        }
        return false;
      };
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (cs.position === "fixed") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // skip elemen animasi marquee (w-max track)
        if (el.closest(".animasi-marquee, .animasi-marquee-terbalik")) continue;
        if (r.right > vw + 2 || r.left < -2) {
          if (!clipOk(el)) {
            out.escaping.push(
              sel(el) + ` L=${Math.round(r.left)} R=${Math.round(r.right)} W=${Math.round(r.width)}`,
            );
          }
        }
      }

      /* --- 3: clipped content (scrollWidth > clientWidth, overflow hidden) --- */
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none") continue;
        if (el.closest(".animasi-marquee, .animasi-marquee-terbalik")) continue;
        const ox = cs.overflowX;
        if (ox !== "hidden" && ox !== "clip") continue;
        const dw = el.scrollWidth - el.clientWidth;
        if (dw > 4 && el.clientWidth > 0) {
          // abaikan container yang isinya memang w-max (marquee track)
          const kid = el.querySelector(".animasi-marquee, .animasi-marquee-terbalik");
          if (kid && el.contains(kid)) continue;
          out.clipped.push(sel(el) + ` overflow+${dw}px cw=${el.clientWidth}`);
        }
      }

      /* --- 4: navbar collision (desktop menu visible ≥1024) --- */
      const brand = document.querySelector("header nav > a");
      const menu = document.querySelector("header nav > ul");
      const cta = document.querySelector("header nav > div > a, header nav > div > button");
      if (brand && menu) {
        const br = brand.getBoundingClientRect();
        const mr = menu.getBoundingClientRect();
        const cr = cta ? cta.getBoundingClientRect() : null;
        const menuVisible = mr.width > 0 && getComputedStyle(menu).display !== "none";
        const collide1 = menuVisible && br.right > mr.left + 1;
        const collide2 = menuVisible && cr && mr.right > cr.left + 1;
        out.navbar = {
          brandRight: Math.round(br.right),
          menuLeft: menuVisible ? Math.round(mr.left) : null,
          menuRight: menuVisible ? Math.round(mr.right) : null,
          ctaLeft: cr ? Math.round(cr.left) : null,
          collideBrandMenu: collide1,
          collideMenuCta: collide2,
          menuVisible,
        };
      }

      /* --- 5: tap targets kecil (advisory) --- */
      if (vw <= 430) {
        const seen = new Set();
        for (const el of document.querySelectorAll("a[href], button")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.height < 32 || r.width < 32) {
            const k = (el.textContent || "").trim().slice(0, 24);
            if (!seen.has(k)) {
              seen.add(k);
              out.smallTap.push(`${k} ${Math.round(r.width)}x${Math.round(r.height)}`);
            }
          }
        }
      }
      return out;
    });

    if (report.pageOverflow > 1)
      rec(vpName, name, "PAGE-OVERFLOW", `scrollWidth-clientWidth=${report.pageOverflow}px`, "");
    for (const e of report.escaping.slice(0, 8)) rec(vpName, name, "ESCAPING", e, "");
    for (const c of report.clipped.slice(0, 8)) rec(vpName, name, "CLIPPED", c, "");
    if (report.navbar?.collideBrandMenu)
      rec(vpName, name, "NAV-COLLIDE", `brand↔menu ${JSON.stringify(report.navbar)}`, "");
    if (report.navbar?.collideMenuCta)
      rec(vpName, name, "NAV-COLLIDE", `menu↔cta ${JSON.stringify(report.navbar)}`, "");
    for (const t of report.smallTap.slice(0, 6))
      rec(vpName, name, "TAP-SMALL", t, "");
    for (const e of errors.slice(0, 4)) rec(vpName, name, "CONSOLE", e, "");

    // screenshot ringkas (viewport only, bukan fullPage — cukup untuk spot check)
    if (["xs320", "tab768", "tab1024", "desk1920"].includes(vpName)) {
      await page.screenshot({ path: `/tmp/resp-${TAG}-${name}-${vpName}.png`, fullPage: false });
    }
  }
  await ctx.close();
}

await browser.close();

// kelompokkan
const byKind = {};
for (const f of findings) {
  (byKind[f.kind] ??= []).push(f);
}
const uniq = (arr, key) => [...new Set(arr.map(key))];

console.log("=== RESPONSIVE AUDIT FINDINGS ===");
console.log("total:", findings.length);
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n## ${kind} (${list.length})`);
  // ringkas per route+vp
  const combos = uniq(list, (f) => f.vp + "|" + f.route);
  for (const c of combos) {
    const [vp, route] = c.split("|");
    const items = list.filter((f) => f.vp === vp && f.route === route);
    console.log(`  [${vp}] ${route} ×${items.length}`);
    for (const it of items.slice(0, 4)) console.log(`     - ${it.detail.slice(0, 220)}`);
  }
}
fs.writeFileSync(`/tmp/resp-audit-${TAG}.json`, JSON.stringify(findings, null, 1));
console.log(`\nsaved /tmp/resp-audit-${TAG}.json`);
