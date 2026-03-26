/**
 * Multi-run Lighthouse benchmark
 * Runs Lighthouse N times against a URL and reports individual + averaged scores.
 * This eliminates the natural run-to-run variance that makes single PSI tests misleading.
 *
 * Usage:  node lh-multi-run.mjs [url-path] [runs]
 * Examples:
 *   node lh-multi-run.mjs              → 5 runs on homepage
 *   node lh-multi-run.mjs /about 3     → 3 runs on /about
 */
import { execSync } from 'child_process';
import { readFileSync, existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const BASE = process.env.LH_BASE || 'https://www.clearedgehomebuyers.com';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CWD = process.cwd();

// On Windows Git Bash, "/" gets mangled to "C:/Program Files/Git/"
// so we accept "home" as an alias and default to homepage
const rawPath = process.argv[2] || 'home';
const urlPath = rawPath === 'home' ? '/' : rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
const RUNS = parseInt(process.argv[3], 10) || 5;
const fullUrl = `${BASE}${urlPath}`;

const METRIC_KEYS = [
  ['FCP',  'first-contentful-paint'],
  ['LCP',  'largest-contentful-paint'],
  ['TBT',  'total-blocking-time'],
  ['CLS',  'cumulative-layout-shift'],
  ['SI',   'speed-index'],
  ['TTI',  'interactive'],
];

function runOnce(index) {
  const outFile = resolve(CWD, `lh-multirun-${index}.json`);
  try {
    if (existsSync(outFile)) unlinkSync(outFile);
    const cmd = [
      'npx lighthouse',
      `"${fullUrl}"`,
      '--chrome-flags="--headless=new --no-sandbox --disable-gpu"',
      '--output=json',
      `--output-path="${outFile}"`,
      '--only-categories=performance',
      '--emulated-form-factor=mobile',
      '--quiet',
    ].join(' ');

    // Lighthouse on Windows throws EPERM on temp cleanup after completing the audit.
    // The JSON output is already written, so we catch and check the file anyway.
    try {
      execSync(cmd, {
        timeout: 120_000,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, CHROME_PATH },
        cwd: CWD,
      });
    } catch { /* EPERM temp cleanup — output file is still valid */ }

    if (!existsSync(outFile)) return null;

    const data = JSON.parse(readFileSync(outFile, 'utf-8'));
    const score = Math.round((data.categories?.performance?.score || 0) * 100);
    const audits = data.audits || {};

    const metrics = {};
    for (const [label, key] of METRIC_KEYS) {
      const a = audits[key];
      if (a) {
        metrics[label] = {
          value: a.numericValue,
          display: a.displayValue,
          score: Math.round((a.score || 0) * 100),
        };
      }
    }

    unlinkSync(outFile);
    return { score, metrics };
  } catch (err) {
    try { if (existsSync(outFile)) unlinkSync(outFile); } catch {}
    return null;
  }
}

console.log(`\n  Lighthouse Multi-Run Benchmark`);
console.log(`  URL: ${fullUrl}`);
console.log(`  Runs: ${RUNS}`);
console.log(`  ${'─'.repeat(50)}\n`);

const results = [];

for (let i = 0; i < RUNS; i++) {
  process.stdout.write(`  Run ${i + 1}/${RUNS} ... `);
  const result = runOnce(i);
  if (result) {
    results.push(result);
    const parts = METRIC_KEYS.map(([label]) => {
      const m = result.metrics[label];
      return m ? `${label}: ${m.display}` : null;
    }).filter(Boolean);
    console.log(`Score: ${result.score}  |  ${parts.join('  |  ')}`);
  } else {
    console.log('FAILED');
  }
}

if (results.length === 0) {
  console.log('\n  All runs failed. Check Chrome path and network.\n');
  process.exit(1);
}

// ── Compute statistics ──
const scores = results.map(r => r.score);
const avg = arr => Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
const median = arr => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
};
const min = arr => Math.min(...arr);
const max = arr => Math.max(...arr);

console.log(`\n  ${'═'.repeat(50)}`);
console.log(`  RESULTS (${results.length} successful runs)`);
console.log(`  ${'═'.repeat(50)}`);
console.log(`  Performance Score:`);
console.log(`    Average: ${avg(scores)}   Median: ${median(scores)}   Range: ${min(scores)}–${max(scores)}   Spread: ±${Math.round((max(scores) - min(scores)) / 2)}`);
console.log();

console.log(`  Metric Averages:`);
for (const [label, key] of METRIC_KEYS) {
  const values = results.map(r => r.metrics[label]?.value).filter(v => v !== undefined);
  const metricScores = results.map(r => r.metrics[label]?.score).filter(v => v !== undefined);
  if (values.length === 0) continue;

  const avgVal = values.reduce((s, v) => s + v, 0) / values.length;
  const avgScore = avg(metricScores);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  let display;
  if (label === 'CLS') {
    display = `${avgVal.toFixed(3)}  (range: ${minVal.toFixed(3)}–${maxVal.toFixed(3)})`;
  } else {
    display = `${(avgVal / 1000).toFixed(1)}s  (range: ${(minVal / 1000).toFixed(1)}–${(maxVal / 1000).toFixed(1)}s)`;
  }

  const scoreColor = avgScore >= 90 ? '✓' : avgScore >= 50 ? '~' : '✗';
  console.log(`    ${scoreColor} ${label.padEnd(4)} avg: ${display}  [sub-score: ${avgScore}]`);
}

console.log(`\n  Variance: ${max(scores) - min(scores)} points across ${results.length} runs`);
if (max(scores) - min(scores) > 10) {
  console.log(`  ⚠ High variance detected — scores are unstable, likely due to server response time or third-party scripts.`);
} else {
  console.log(`  Scores are relatively stable across runs.`);
}
console.log();
