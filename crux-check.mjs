/**
 * CrUX Field Data Checker
 * Fetches real-user Core Web Vitals from the Chrome UX Report via the PSI API.
 * This is the data Google actually uses for rankings — NOT the lab score.
 *
 * Usage:  node crux-check.mjs [url-path]
 * Examples:
 *   node crux-check.mjs            → check homepage + origin-level data
 *   node crux-check.mjs /about     → check /about page
 */
// Usage: node crux-check.mjs [url-path] [api-key]
// On Windows Git Bash, "/" gets mangled, so use "home" for homepage
const rawPath = process.argv[2] || 'home';
const urlPath = rawPath === 'home' ? '/' : rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
const API_KEY = process.argv[3] || '';
const BASE = 'https://www.clearedgehomebuyers.com';
const fullUrl = `${BASE}${urlPath}`;

const METRIC_LABELS = {
  CUMULATIVE_LAYOUT_SHIFT_SCORE: 'CLS  (Cumulative Layout Shift)',
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: 'TTFB (Time to First Byte)',
  FIRST_CONTENTFUL_PAINT_MS: 'FCP  (First Contentful Paint)',
  FIRST_INPUT_DELAY_MS: 'FID  (First Input Delay)',
  INTERACTION_TO_NEXT_PAINT: 'INP  (Interaction to Next Paint)',
  LARGEST_CONTENTFUL_PAINT_MS: 'LCP  (Largest Contentful Paint)',
};

const THRESHOLDS = {
  CUMULATIVE_LAYOUT_SHIFT_SCORE: { good: 0.1, poor: 0.25, unit: '' },
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: { good: 800, poor: 1800, unit: 'ms' },
  FIRST_CONTENTFUL_PAINT_MS: { good: 1800, poor: 3000, unit: 'ms' },
  FIRST_INPUT_DELAY_MS: { good: 100, poor: 300, unit: 'ms' },
  INTERACTION_TO_NEXT_PAINT: { good: 200, poor: 500, unit: 'ms' },
  LARGEST_CONTENTFUL_PAINT_MS: { good: 2500, poor: 4000, unit: 'ms' },
};

function formatDistribution(metric) {
  const dist = metric.distributions;
  if (!dist || dist.length < 3) return 'N/A';
  const good = (dist[0].proportion * 100).toFixed(1);
  const needs = (dist[1].proportion * 100).toFixed(1);
  const poor = (dist[2].proportion * 100).toFixed(1);
  return `${good}% good | ${needs}% needs improvement | ${poor}% poor`;
}

function formatP75(metric, key) {
  const p75 = metric.percentiles?.p75;
  if (p75 === undefined) return 'N/A';
  const threshold = THRESHOLDS[key];
  if (!threshold) return String(p75);

  let status;
  if (key === 'CUMULATIVE_LAYOUT_SHIFT_SCORE') {
    const val = p75 / 100; // CLS comes as integer in CrUX
    status = val <= threshold.good ? 'GOOD' : val <= threshold.poor ? 'NEEDS WORK' : 'POOR';
    return `${val.toFixed(2)} → ${status}`;
  } else {
    status = p75 <= threshold.good ? 'GOOD' : p75 <= threshold.poor ? 'NEEDS WORK' : 'POOR';
    return `${p75}${threshold.unit} → ${status}`;
  }
}

async function fetchCrUX(url, label) {
  let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE`;
  if (API_KEY) apiUrl += `&key=${API_KEY}`;

  console.log(`\n  Fetching ${label}...`);

  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    if (data.error) {
      console.log(`  ⚠ API Error: ${data.error.message}`);
      return null;
    }

    // Field data comes in loadingExperience (page-level) and originLoadingExperience (origin-level)
    return data;
  } catch (err) {
    console.log(`  ⚠ Fetch failed: ${err.message}`);
    return null;
  }
}

function printFieldData(experience, title) {
  if (!experience || !experience.metrics) {
    console.log(`\n  ${title}`);
    console.log(`  ${'─'.repeat(50)}`);
    console.log(`  No field data available (not enough real-user traffic recorded).`);
    console.log(`  CrUX requires sufficient traffic volume over the past 28 days.`);
    return;
  }

  console.log(`\n  ${title}`);
  console.log(`  Overall category: ${experience.overall_category || 'N/A'}`);
  console.log(`  ${'─'.repeat(60)}`);

  for (const [key, label] of Object.entries(METRIC_LABELS)) {
    const metric = experience.metrics[key];
    if (!metric) continue;
    const p75 = formatP75(metric, key);
    const dist = formatDistribution(metric);
    console.log(`  ${label}`);
    console.log(`    p75: ${p75}`);
    console.log(`    Distribution: ${dist}`);
    console.log();
  }
}

async function main() {
  console.log(`\n  CrUX Field Data Report`);
  console.log(`  URL: ${fullUrl}`);
  console.log(`  ${'═'.repeat(60)}`);
  console.log(`  This shows REAL user performance data from Chrome (28-day rolling).`);
  console.log(`  This is what Google uses for search rankings — not the lab score.`);

  const data = await fetchCrUX(fullUrl, 'page + origin data');

  if (!data) {
    console.log('\n  Could not fetch data. The PSI API quota may be exhausted.');
    console.log('  Try again tomorrow, or get a free API key from:');
    console.log('  https://developers.google.com/speed/docs/insights/v5/get-started#key');
    process.exit(1);
  }

  // Page-level field data
  printFieldData(data.loadingExperience, `PAGE-LEVEL FIELD DATA (${urlPath})`);

  // Origin-level field data (all pages on the domain)
  printFieldData(data.originLoadingExperience, `ORIGIN-LEVEL FIELD DATA (entire site)`);

  // Also show the lab score for reference
  const labScore = data.lighthouseResult?.categories?.performance?.score;
  if (labScore !== undefined) {
    console.log(`  ${'─'.repeat(60)}`);
    console.log(`  Lab score (this single run): ${Math.round(labScore * 100)}`);
    console.log(`  (Remember: this fluctuates ±15 points between runs)\n`);
  }
}

main();
