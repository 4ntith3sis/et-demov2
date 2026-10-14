import { chromium } from 'playwright';
import sharp from 'sharp';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// capture console + network for css
const cssRequests = [];
page.on('response', async (res) => {
  const url = res.url();
  if (url.endsWith('.css') || url.includes('.css?')) {
    cssRequests.push({ url: url.split('/').pop(), status: res.status(), headers: res.headers() });
  }
});

await page.goto('http://localhost:3004/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// 1) computed styles of hero solid area
const computed = await page.evaluate(() => {
  // hero solid navy panel: find element with bg-navy-hero or bg-navy-900
  const candidates = [...document.querySelectorAll('section, div')];
  const heroSolid = candidates.find(el => {
    const cls = el.className?.toString() || '';
    return (cls.includes('bg-navy-hero') || cls.includes('bg-navy-900')) && el.offsetHeight > 300;
  });
  const heroImg = document.querySelector('img[class*="hero"], .gradasi-hero-foto, [class*="gradasi"]');
  const gradEl = document.querySelector('.gradasi-hero-foto');
  const h1 = document.querySelector('h1');
  const yellowSpan = h1 ? [...h1.querySelectorAll('span')].find(s => getComputedStyle(s).color.includes('244, 201, 34')) : null;
  return {
    heroSolidClass: heroSolid?.className?.toString().slice(0,80),
    heroSolidBg: heroSolid ? getComputedStyle(heroSolid).backgroundColor : null,
    heroSolidBgImage: heroSolid ? getComputedStyle(heroSolid).backgroundImage.slice(0,120) : null,
    heroSolidFilter: heroSolid ? getComputedStyle(heroSolid).filter : null,
    heroSolidMixBlend: heroSolid ? getComputedStyle(heroSolid).mixBlendMode : null,
    gradClass: gradEl?.className?.toString().slice(0,80),
    gradBgImage: gradEl ? getComputedStyle(gradEl).backgroundImage : null,
    gradFilter: gradEl ? getComputedStyle(gradEl).filter : null,
    gradMixBlend: gradEl ? getComputedStyle(gradEl).mixBlendMode : null,
    gradOpacity: gradEl ? getComputedStyle(gradEl).opacity : null,
    yellowSpanColor: yellowSpan ? getComputedStyle(yellowSpan).color : null,
    yellowSpanText: yellowSpan?.textContent,
  };
});
console.log('COMPUTED:', JSON.stringify(computed, null, 2));

// 2) pixel-sample the actual rendered hero at several points
// hero occupies roughly y=72..712 at 1440 width (below 72px navbar)
const points = [
  { name: 'hero-solid-left (text area)', x: 200, y: 300 },
  { name: 'hero-solid-mid', x: 500, y: 400 },
  { name: 'hero-gradient-zone', x: 850, y: 400 },
  { name: 'hero-photo-right', x: 1200, y: 300 },
  { name: 'hero-badge-yellow-text-area', x: 300, y: 190 },
  { name: 'navbar-bg', x: 700, y: 36 },
  { name: 'footer (scroll)', x: 0, y: 0 }, // placeholder, scroll later
];

// screenshot hero region only for precise pixel sampling
const heroBox = await page.evaluate(() => {
  const header = document.querySelector('header');
  const navH = header ? header.offsetHeight : 72;
  // find hero container = first main section/div after header with navy bg
  const hero = document.querySelector('main > section, main > div, section');
  const r = hero ? hero.getBoundingClientRect() : { top: navH, height: 640, width: 1440 };
  return { x: 0, y: Math.round(r.top), width: 1440, height: Math.round(r.height) };
});
console.log('HERO BOX:', heroBox);

const heroShot = await page.screenshot({ clip: heroBox, path: '/tmp/baseline-hero.png' });
const { data, info } = await sharp(heroShot).raw().toBuffer({ resolveWithObject: true });

function px(x, y) {
  const idx = (y * info.width + x) * info.channels;
  return { r: data[idx], g: data[idx+1], b: data[idx+2], a: info.channels === 4 ? data[idx+3] : 255 };
}
function hex({r,g,b}) { return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join(''); }

console.log('\nPIXEL SAMPLES (hero screenshot, relative to hero top):');
for (const p of [
  { name: 'solid navy text-area', x: 200, y: 230 },
  { name: 'solid navy lower', x: 300, y: 500 },
  { name: 'gradient mid-zone', x: 820, y: 350 },
  { name: 'photo area', x: 1150, y: 250 },
  { name: 'yellow headline glyph area', x: 620, y: 250 },
  { name: 'CTA button yellow', x: 250, y: 448 },
]) {
  const c = px(p.x, p.y);
  console.log(`  ${p.name.padEnd(30)} (${p.x},${p.y}) = rgb(${c.r},${c.g},${c.b}) ${hex(c)}`);
}

// navbar pixels
const navShot = await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 72 } });
const nd = await sharp(navShot).raw().toBuffer({ resolveWithObject: true });
const npx = (x,y) => { const i=(y*nd.info.width+x)*nd.info.channels; return {r:nd.data[i],g:nd.data[i+1],b:nd.data[i+2]}; };
console.log('\nNAVBAR pixels:');
for (const [x,y,n] of [[700,36,'nav-bg'],[1200,36,'cta-yellow'],[672,42,'active-underline-area']]) {
  const c = npx(x,y); console.log(`  ${n.padEnd(20)} = rgb(${c.r},${c.g},${c.b}) ${hex(c)}`);
}

// 3) footer pixels
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);
const footerBox = await page.evaluate(() => {
  const f = document.querySelector('footer');
  const r = f.getBoundingClientRect();
  return { x: 0, y: Math.max(0, Math.round(r.top)), width: 1440, height: Math.round(r.height) };
});
const footShot = await page.screenshot({ clip: footerBox });
const fd = await sharp(footShot).raw().toBuffer({ resolveWithObject: true });
const fpx = (x,y) => { const i=(y*fd.info.width+x)*fd.info.channels; return {r:fd.data[i],g:fd.data[i+1],b:fd.data[i+2]}; };
console.log('\nFOOTER pixels:');
for (const [x,y,n] of [[100,80,'footer-bg'],[700,200,'footer-bg-mid']]) {
  const c = fpx(x,y); console.log(`  ${n.padEnd(20)} = rgb(${c.r},${c.g},${c.b}) ${hex(c)}`);
}

// 4) CSS served to browser
console.log('\nCSS REQUESTS:');
for (const c of cssRequests) console.log(`  ${c.url} status=${c.status} cache-control=${c.headers['cache-control']} etag=${c.headers.etag}`);

// 5) extract the actual CSS text the browser has for brand tokens
const cssText = await page.evaluate(async () => {
  const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
  let out = '';
  for (const l of links) {
    try { out += await (await fetch(l.href)).text(); } catch {}
  }
  // also inline styles
  for (const s of document.querySelectorAll('style')) out += s.textContent;
  return out;
});
const navyMatches = cssText.match(/--color-brand-navy:\s*[^;]+/g);
const yellowMatches = cssText.match(/--color-brand-yellow:\s*[^;]+/g);
const legacyNavy = cssText.match(/#182265/gi);
const legacyYellow = cssText.match(/#efca4c/gi);
const navy900 = cssText.match(/--color-navy-900:\s*[^;]+/g);
console.log('\nBROWSER-SERVED CSS:');
console.log('  brand-navy:', navyMatches);
console.log('  brand-yellow:', yellowMatches);
console.log('  navy-900:', navy900);
console.log('  legacy #182265 count:', legacyNavy ? legacyNavy.length : 0);
console.log('  legacy #efca4c count:', legacyYellow ? legacyYellow.length : 0);

// 6) dev indicator content
const devIndicator = await page.evaluate(() => {
  // Next.js dev tools indicator - look for the nextjs-portal or dev indicator elements
  const portal = document.querySelector('nextjs-portal');
  const shadow = portal?.shadowRoot;
  if (!shadow) return { portal: !!portal, shadow: false };
  const texts = [...shadow.querySelectorAll('*')].map(e => e.textContent?.trim()).filter(t => t && t.length < 80);
  return { portal: true, shadow: true, uniqueTexts: [...new Set(texts)].slice(0, 40) };
});
console.log('\nDEV INDICATOR:', JSON.stringify(devIndicator, null, 2));

await browser.close();
