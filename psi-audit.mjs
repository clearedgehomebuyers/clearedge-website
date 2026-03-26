import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const BASE = 'https://www.clearedgehomebuyers.com';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CWD = process.cwd();

const PAGES = [
  '/','/how-it-works','/calculator','/about','/contact','/testimonials',
  '/are-cash-home-buyers-legit','/cash-buyer-vs-realtor','/privacy-policy','/terms','/blog',
  '/locations/nepa','/locations/lehigh-valley','/locations/poconos',
  '/locations/scranton','/locations/wilkes-barre','/locations/hazleton','/locations/pittston',
  '/locations/kingston','/locations/nanticoke','/locations/carbondale','/locations/dunmore',
  '/locations/honesdale','/locations/bloomsburg','/locations/allentown','/locations/bethlehem',
  '/locations/easton','/locations/reading','/locations/pottsville','/locations/stroudsburg',
  '/locations/east-stroudsburg','/locations/pocono-pines','/locations/tannersville',
  '/situations/foreclosure','/situations/inherited-property','/situations/divorce',
  '/situations/job-relocation','/situations/major-repairs','/situations/tax-liens-code-violations',
  '/situations/tired-landlord','/situations/vacant-property','/situations/foundation-structural-issues',
  '/blog/avoid-foreclosure-scranton-pa','/blog/cash-home-buyers-berks-county',
  '/blog/cash-home-buyers-lackawanna-county-no-fees','/blog/cash-home-buyers-pottsville-pa',
  '/blog/documents-required-selling-inherited-property-pennsylvania',
  '/blog/easton-pa-rental-inspection-checklist-2026',
  '/blog/hazleton-residential-occupancy-inspection-checklist',
  '/blog/how-to-stop-berks-county-judicial-sale-2026',
  '/blog/luzerne-county-rental-property-registration-inspection-requirements-2026',
  '/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights',
  '/blog/pennsylvania-job-relocation-home-buyout-fast-equity-release-2026',
  '/blog/scranton-pa-major-structural-damage-disclosure-law-2026',
  '/blog/sell-deceased-parents-house-without-probate-pennsylvania',
  '/blog/sell-hoarder-house-reading-pa-without-cleanout',
  '/blog/sell-house-fast-during-divorce-lehigh-county-pa',
  '/blog/sell-house-wilkes-barre-code-violations',
  '/blog/sell-my-house-fast-allentown',
  '/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien',
  '/blog/sell-my-house-fast-dunmore-mine-subsidence',
  '/blog/sell-my-house-fast-lehigh-valley',
  '/blog/sell-my-house-fast-luzerne-county-pa',
  '/blog/sell-my-house-fast-poconos-pa',
  '/blog/selling-house-international-property-maintenance-code-violations-bethlehem',
  '/blog/selling-water-damaged-house-18102-mold-issues',
  '/blog/stop-govos-fines-poconos-house',
];

function runLighthouse(path, index) {
  const url = `${BASE}${path}`;
  const outFile = resolve(CWD, `lh-out-${index}.json`);
  try {
    if (existsSync(outFile)) unlinkSync(outFile);
    const cmd = `npx lighthouse "${url}" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --output=json --output-path="${outFile}" --only-categories=performance,seo,accessibility,best-practices --emulated-form-factor=mobile --quiet`;
    try {
      execSync(cmd, { timeout: 120000, stdio: ['pipe','pipe','pipe'], env: { ...process.env, CHROME_PATH }, cwd: CWD });
    } catch (e) {}
    if (!existsSync(outFile)) return { path, error: 'No output', scores: {}, failingAudits: [] };
    const data = JSON.parse(readFileSync(outFile, 'utf-8'));
    const cats = data.categories || {};
    const audits = data.audits || {};
    const scores = {};
    for (const [key, cat] of Object.entries(cats)) scores[key] = Math.round((cat.score || 0) * 100);
    const failingAudits = [];
    for (const [id, audit] of Object.entries(audits)) {
      if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'manual' && audit.scoreDisplayMode !== 'notApplicable') {
        const entry = { id, title: audit.title, score: audit.score, displayValue: audit.displayValue || '' };
        if (audit.details?.items?.length) {
          entry.items = audit.details.items.slice(0, 5).map(item => {
            const c = {};
            if (item.url) c.url = item.url;
            if (item.node?.snippet) c.snippet = item.node.snippet;
            if (item.wastedBytes) c.wastedKB = Math.round(item.wastedBytes / 1024);
            if (item.wastedMs) c.wastedMs = Math.round(item.wastedMs);
            if (item.totalBytes) c.totalKB = Math.round(item.totalBytes / 1024);
            return Object.keys(c).length ? c : undefined;
          }).filter(Boolean);
        }
        failingAudits.push(entry);
      }
    }
    try { unlinkSync(outFile); } catch (e) {}
    return { path, scores, failingAudits, error: null };
  } catch (err) {
    try { if (existsSync(outFile)) unlinkSync(outFile); } catch (e) {}
    return { path, error: err.message?.substring(0, 300), scores: {}, failingAudits: [] };
  }
}

async function main() {
  console.error(`Starting Lighthouse audit for ${PAGES.length} pages...\n`);
  const results = [];
  const resultsFile = resolve(CWD, 'psi-results.json');
  for (let i = 0; i < PAGES.length; i++) {
    const path = PAGES[i];
    console.error(`[${i+1}/${PAGES.length}] ${path}`);
    const result = runLighthouse(path, i);
    results.push(result);
    if (result.error) console.error(`  ERROR: ${result.error.substring(0,100)}`);
    else {
      const s = result.scores;
      console.error(`  Perf: ${s.performance} | SEO: ${s.seo} | A11y: ${s.accessibility} | BP: ${s['best-practices']} | Fails: ${result.failingAudits.length}`);
    }
    writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  }
  console.error(`\nDone! ${results.length} pages.`);
  const ok = results.filter(r => !r.error);
  if (ok.length) {
    const avg = (key) => Math.round(ok.reduce((s,r) => s + (r.scores[key]||0), 0) / ok.length);
    console.error(`Averages: Perf: ${avg('performance')} | SEO: ${avg('seo')} | A11y: ${avg('accessibility')} | BP: ${avg('best-practices')}`);
  }
}
main();
