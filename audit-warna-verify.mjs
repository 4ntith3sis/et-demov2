import { chromium } from "playwright";

const BASE = "http://localhost:3004";
const ROUTES = [
  "/",
  "/layanan",
  "/layanan/restitusi-pajak",
  "/tulisan-pajak",
  "/tulisan-pajak/rekonsiliasi-fiskal-positif-negatif",
  "/tentang-kami",
  "/kontak",
  "/kalkulator-pajak",
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

/* Nilai brand & hex lama yang sudah dihapus — dipakai untuk scan sisa. */
const BRAND_NAVY = "rgb(21, 34, 105)";
const BRAND_YELLOW = "rgb(244, 201, 34)";
const HEX_LAMA = [
  "#0b1446", "#233285", "#3949a2", "#5766b7", "#eeeff7", // navy variants lama
  "#886e07", "#d4ab12", "#ffe58a", "#fefbe9", // yellow variants lama
  "#00b4d8", // teal-accent
  "#f6d143", // yellow-400 (color-mix 85%) lama
];

const toHex = (rgb) => {
  const m = rgb.match(/[\d.]+/g);
  if (!m) return rgb;
  return "#" + m.slice(0, 3).map((n) => Math.round(+n).toString(16).padStart(2, "0")).join("");
};

let failures = 0;
const fail = (m) => { failures++; console.log("  FAIL " + m); };
const pass = (m) => console.log("  ok   " + m);

const browser = await chromium.launch();

/* ============ Part 1: layout sweep 8 route × 3 viewport ============ */
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(400);

    const label = `${vp.name} ${route}`;
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > vp.width + 1) fail(`${label}: overflowX scrollWidth=${sw}`);
    else pass(`${label}: no overflowX`);

    const real = errors.filter((e) => !e.includes("favicon") && !e.includes("React DevTools"));
    if (real.length) fail(`${label}: console errors — ${real.slice(0, 2).join(" | ")}`);
    else pass(`${label}: no console errors`);

    /* scan SEMUA elemen: computed color/bg/border tidak boleh = hex lama */
    const sisa = await page.evaluate((hexList) => {
      const bad = [];
      const norm = (v) => {
        const m = v && v.match(/[\d.]+/g);
        if (!m || m.length < 3) return null;
        if (m.length === 4 && +m[3] === 0) return null;
        return "#" + m.slice(0, 3).map((n) => Math.round(+n).toString(16).padStart(2, "0")).join("");
      };
      for (const el of document.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        for (const prop of ["color", "backgroundColor", "borderTopColor", "borderLeftColor", "outlineColor"]) {
          const h = norm(cs[prop]);
          if (h && hexList.includes(h)) {
            bad.push(`${el.tagName}.${(el.className + "").toString().slice(0, 40)} ${prop}=${h}`);
          }
        }
        if (bad.length > 5) return bad;
      }
      return bad;
    }, HEX_LAMA);
    if (sisa.length) fail(`${label}: warna lama tersisa — ${sisa.join("; ")}`);
    else pass(`${label}: nol warna lama`);

    await page.screenshot({ path: `/tmp/brand-${route.replace(/\//g, "_") || "-home"}-${vp.name}.png` });
    await page.close();
  }
  await ctx.close();
}

/* ============ Part 2: mobile menu ============ */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const burger = page.locator('button[aria-controls="menu-mobile"]');
  await burger.click();
  await page.waitForTimeout(300);
  const open = await page.locator('#menu-mobile a', { hasText: "Layanan" }).first().isVisible().catch(() => false);
  open ? pass("mobile menu opens") : fail("mobile menu did not open");
  const active = page.locator('#menu-mobile a[aria-current="page"]').first();
  if (await active.count()) {
    const cls = (await active.getAttribute("class")) || "";
    const bg = await active.evaluate((el) => getComputedStyle(el).backgroundColor);
    cls.includes("text-navy-900") && cls.includes("font-extrabold")
      ? pass("drawer active: navy + extrabold")
      : fail("drawer active classes: " + cls);
    toHex(bg) === "#f4c922" && /0\.1[25]/.test(getComputedStyle ? bg : "")
      ? pass(`drawer active tint = brand yellow/12 (${bg})`)
      : /0\.1[125]/.test(bg) ? pass(`drawer active tint alpha ok (${bg})`) : fail("drawer active tint: " + bg);
  }
  await burger.click();
  await page.waitForTimeout(300);
  (await page.locator("#menu-mobile").getAttribute("hidden")) !== null
    ? pass("mobile menu closes") : fail("mobile menu did not close");
  await page.screenshot({ path: "/tmp/brand-mobile-menu.png" });
  await ctx.close();
}

/* ============ Part 3: computed-style spot checks (desktop) ============ */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

/* --- Navbar di /layanan --- */
await page.goto(BASE + "/layanan", { waitUntil: "networkidle" });
const nav = await page.evaluate(() => {
  const out = {};
  const sub = document.querySelector("header span[class*='text-navy-900']");
  out.sub = sub ? getComputedStyle(sub).color : null;
  const active = document.querySelector('header nav a[aria-current="page"]');
  if (active) {
    const cs = getComputedStyle(active);
    out.actColor = cs.color; out.actWeight = cs.fontWeight;
    const af = getComputedStyle(active, "::after");
    out.underline = af.backgroundColor; out.underlineW = af.width;
  }
  const inact = document.querySelector('header nav a:not([aria-current="page"])');
  out.inact = inact ? getComputedStyle(inact).color : null;
  out.ctaBg = getComputedStyle(document.querySelector("header a.bg-yellow-500") || document.body).backgroundColor;
  return out;
});
nav.sub === BRAND_NAVY ? pass("navbar subjudul navy (bukan kuning)") : fail("navbar subjudul = " + nav.sub);
nav.actColor === BRAND_NAVY ? pass("nav aktif teks navy") : fail("nav aktif teks = " + nav.actColor);
+nav.actWeight >= 800 ? pass(`nav aktif weight ${nav.actWeight}`) : fail("nav aktif weight = " + nav.actWeight);
nav.underline === BRAND_YELLOW ? pass("nav underline kuning resmi #F4C922") : fail("nav underline = " + nav.underline);
nav.inact === BRAND_NAVY ? pass("nav non-aktif navy") : fail("nav non-aktif = " + nav.inact);
toHex(nav.ctaBg) === "#f4c922" ? pass("CTA navbar bg kuning resmi") : fail("CTA navbar bg = " + nav.ctaBg);

/* --- Hover CTA utama: bg TETAP kuning, feedback via transform/shadow --- */
const cta = page.locator("header a.bg-yellow-500").first();
const before = await cta.evaluate((el) => {
  const cs = getComputedStyle(el);
  return { bg: cs.backgroundColor, tf: cs.transform, sh: cs.boxShadow };
});
await cta.hover();
await page.waitForTimeout(450);
const after = await cta.evaluate((el) => {
  const cs = getComputedStyle(el);
  return { bg: cs.backgroundColor, tf: cs.transform, sh: cs.boxShadow };
});
after.bg === BRAND_YELLOW && before.bg === BRAND_YELLOW
  ? pass("hover CTA: bg tetap #F4C922 (tanpa langkah warna)")
  : fail("hover CTA bg berubah: " + before.bg + " -> " + after.bg);
after.tf !== before.tf || after.sh !== before.sh
  ? pass("hover CTA: feedback transform/shadow aktif")
  : fail("hover CTA: tanpa feedback transform/shadow");

/* --- Eyebrow badge kuning resmi di latar navy (/layanan) --- */
const badge = await page.evaluate(() => {
  const el = [...document.querySelectorAll("main span")].find((s) =>
    /border-yellow-500\/45|border-yellow-500\/40|border-yellow-500\/60/.test(s.className));
  if (!el) return null;
  const cs = getComputedStyle(el);
  return { border: cs.borderColor, bg: cs.backgroundColor, color: cs.color };
});
if (badge) {
  // Chrome dapat mem-serialize rgba brand sebagai rgb() ATAU oklab(/0.6)
  const borderOk = /244,\s*201,\s*34/.test(badge.border) || /\/\s*0?\.?6\s*\)/.test(badge.border);
  borderOk ? pass(`badge border kuning resmi/60 (${badge.border.slice(0, 46)}…)`) : fail("badge border = " + badge.border);
  /244,\s*201,\s*34/.test(badge.color) || badge.color === BRAND_NAVY
    ? pass("badge text ok: " + badge.color) : fail("badge text = " + badge.color);
} else fail("badge eyebrow tidak ditemukan di /layanan");

/* --- Footer di / --- */
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const foot = await page.evaluate(() => {
  const f = document.querySelector("footer");
  const ps = [...f.querySelectorAll("p")];
  const copy = ps.find((p) => (p.className || "").includes("text-white/55")) ?? ps.at(-1);
  const head = f.querySelector("h4, h3");
  return {
    bg: getComputedStyle(f).backgroundColor,
    copy: getComputedStyle(copy).color,
    head: head ? getComputedStyle(head).color : null,
    accent: getComputedStyle(f.querySelector("h4") || f).backgroundColor,
  };
});
foot.bg === BRAND_NAVY ? pass("footer bg navy resmi") : fail("footer bg = " + foot.bg);
/\/\s*0?\.?55\s*\)/.test(foot.copy) ? pass("footer copyright white/55") : fail("footer copyright = " + foot.copy);
foot.head === "rgb(255, 255, 255)" ? pass("footer heading putih") : fail("footer heading = " + foot.head);

/* --- Hero + section bg navy, kuning highlight di navy --- */
const hero = await page.evaluate(() => {
  const h1 = document.querySelector("main h1");
  const sec = h1 && h1.closest("section");
  const span = h1 && h1.querySelector("span");
  return {
    bg: sec ? getComputedStyle(sec).backgroundColor : null,
    span: span ? getComputedStyle(span).color : null,
  };
});
hero.bg === BRAND_NAVY ? pass("hero bg navy resmi") : fail("hero bg = " + hero.bg);
hero.span === BRAND_YELLOW ? pass("highlight judul kuning resmi") : fail("highlight judul = " + hero.span);

/* --- Teks KUNING di latar TERANG = dilarang (kecuali ikon/star ber-stroke) --- */
const kuningDiTerang = await page.evaluate(() => {
  const bad = [];
  const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const parse = (v) => { const m = v.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
  const alphaOf = (v) => { const m = v.match(/[\d.]+/g); return m && m.length === 4 ? +m[3] : 1; };
  /* Berhenti di bg OPAK pertama (a>0.6): itu latar efektif — termasuk bg elemen sendiri. */
  const bgTerang = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const v = getComputedStyle(n).backgroundColor;
      const a = alphaOf(v);
      if (a > 0.6) return lum(parse(v)) > 0.7;
      n = n.parentElement;
    }
    return false;
  };
  for (const el of document.querySelectorAll("*")) {
    if (el.closest("svg") || el.querySelector("svg")) continue; // ikon/star: kategori terpisah
    const teks = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!teks) continue; // elemen bg-dot tanpa teks
    const cs = getComputedStyle(el);
    const c = parse(cs.color);
    if (!c) continue;
    const isKuning = Math.abs(c[0] - 244) < 6 && Math.abs(c[1] - 201) < 6 && c[2] < 60;
    if (isKuning && cs.opacity === "1" && bgTerang(el)) {
      bad.push(`${el.tagName}.${(el.className + "").slice(0, 50)}`);
    }
    if (bad.length > 4) break;
  }
  return bad;
});
kuningDiTerang.length === 0
  ? pass("nol teks kuning di latar terang (non-ikon)")
  : fail("teks kuning di latar terang: " + kuningDiTerang.join("; "));

/* --- Kalkulator: focus ring ganda brand --- */
await page.goto(BASE + "/kalkulator-pajak", { waitUntil: "networkidle" });
const input = page.locator("main input").first();
await input.focus();
await page.waitForTimeout(150);
const focus = await input.evaluate((el) => {
  const cs = getComputedStyle(el);
  return { border: cs.borderColor, outline: cs.outline, shadow: cs.boxShadow };
});
/21,\s*34,\s*105/.test(focus.border) ? pass("focus border input navy") : fail("focus border = " + focus.border);
/21,\s*34,\s*105/.test(focus.outline) ? pass("focus outline navy 2px") : fail("focus outline = " + focus.outline);
/244,\s*201,\s*34/.test(focus.shadow) ? pass("focus ring kuning resmi") : fail("focus shadow = " + focus.shadow);

/* --- /tulisan-pajak: panel navy + link hover underline --- */
await page.goto(BASE + "/tulisan-pajak", { waitUntil: "networkidle" });
const panel = await page.evaluate(() => {
  const el = [...document.querySelectorAll("main div")].find((d) =>
    (d.className || "").includes("bg-navy-900") && (d.className || "").includes("rounded-xl"));
  return el ? getComputedStyle(el).backgroundColor : null;
});
panel === BRAND_NAVY ? pass("panel CTA navy resmi") : fail("panel CTA = " + panel);
const linkTitle = page.locator("main h2 a, main h3 a").first();
if (await linkTitle.count()) {
  await linkTitle.hover();
  await page.waitForTimeout(350);
  const deco = await linkTitle.evaluate((el) => getComputedStyle(el).textDecorationLine);
  deco.includes("underline") ? pass("link judul hover: underline (bukan ganti warna)") : fail("link hover deco = " + deco);
}

/* --- Eyebrow pill terang (tint kuning 12-15%) wajib teks navy, bukan kuning --- */
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const label = await page.evaluate(() => {
  const el = [...document.querySelectorAll("main p")].find((p) =>
    (p.className || "").includes("bg-yellow-500/1"));
  return el ? getComputedStyle(el).color : null;
});
label === BRAND_NAVY ? pass("eyebrow pill terang teks = navy") : fail("eyebrow pill = " + label);

await ctx.close();

/* ============ Part 4: tabel kontras terukur (dihitung di sini) ============ */
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const mix = (fg, bg, al) => fg.map((c, i) => c * al + bg[i] * (1 - al));
const navy = [21, 34, 105], yellow = [244, 201, 34], white = [255, 255, 255];
const lat = [244, 247, 251], sekunder = [71, 85, 105], redup = [99, 112, 131], terang = [203, 213, 225];
const pairs = [
  ["teks utama navy / putih", ratio(navy, white), 4.5],
  ["navy / netral-lat", ratio(navy, lat), 4.5],
  ["putih / navy", ratio(white, navy), 4.5],
  ["navy / kuning (CTA)", ratio(navy, yellow), 4.5],
  ["kuning / navy (highlight)", ratio(yellow, navy), 4.5],
  ["teks-sekunder / putih", ratio(sekunder, white), 4.5],
  ["teks-redup / putih", ratio(redup, white), 4.5],
  ["teks-redup / netral-lat", ratio(redup, lat), 4.5],
  ["teks-terang / navy", ratio(terang, navy), 4.5],
  ["white/55 / navy (copyright)", ratio(mix(white, navy, 0.55), navy), 4.5],
  ["navy/70 / putih (eyebrow terang)", ratio(mix(navy, white, 0.7), white), 4.5],
  ["navy/70 / kuning (eyebrow kartu)", ratio(mix(navy, yellow, 0.7), yellow), 4.5],
  ["navy teks / tint kuning 12-15% (badge)", ratio(navy, mix(yellow, white, 0.15)), 4.5],
  ["navy teks / bg kuning solid (CTA)", ratio(navy, yellow), 4.5],
  ["fokus outline navy / putih", ratio(navy, white), 3],
  ["fokus ring kuning / navy", ratio(yellow, navy), 3],
  ["stroke bintang navy / putih", ratio(navy, white), 3],
];
console.log("\n== Tabel kontras terukur (WCAG 2.2 AA) ==");
for (const [name, r, target] of pairs) {
  const ok = r >= target;
  ok ? pass(`${name}: ${r.toFixed(2)}:1 (min ${target})`) : fail(`${name}: ${r.toFixed(2)}:1 < ${target}`);
}
console.log(
  "\n* CATATAN (dokumentasi pengecualian fungsional):\n" +
  "  - underline nav kuning/putih & border badge kuning/putih = indikator/aksen dekoratif,\n" +
  "    bukan info wajib-identifikasi (WCAG 1.4.11): state nav juga dibawa cue non-warna\n" +
  "    (lebar garis 0→100% + font-extrabold) dan pill teridentifikasi dari teks navy 14.34:1\n" +
  "    + tint bg kuning. Keduanya memakai KUNING RESMI sesuai mandat §5A/§5E."
);

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures ? 1 : 0);
