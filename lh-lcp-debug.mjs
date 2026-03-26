import { readFileSync } from 'fs';

const d = JSON.parse(readFileSync('lh-lcp-debug.json', 'utf8'));
const audits = d.audits;

// LCP element
const lcpAudit = audits['largest-contentful-paint-element'];
if (lcpAudit && lcpAudit.details && lcpAudit.details.items) {
  console.log('=== LCP ELEMENT ===');
  lcpAudit.details.items.forEach(item => {
    if (item.node) console.log('  Element:', item.node.snippet);
    if (item.node) console.log('  Selector:', item.node.selector);
    console.log('  Phase breakdown:');
    for (const [k, v] of Object.entries(item)) {
      if (k !== 'node' && typeof v === 'number') {
        console.log('    ' + k + ':', Math.round(v) + 'ms');
      }
    }
  });
}

console.log();
console.log('LCP:', audits['largest-contentful-paint']?.displayValue, '(score:', Math.round((audits['largest-contentful-paint']?.score || 0) * 100) + ')');
console.log('FCP:', audits['first-contentful-paint']?.displayValue);
console.log('CLS:', audits['cumulative-layout-shift']?.displayValue);
console.log('TBT:', audits['total-blocking-time']?.displayValue);
console.log('Score:', Math.round((d.categories.performance.score || 0) * 100));

// Check CLS elements
const clsAudit = audits['layout-shift-elements'];
if (clsAudit && clsAudit.details && clsAudit.details.items) {
  console.log();
  console.log('=== CLS ELEMENTS ===');
  clsAudit.details.items.forEach(item => {
    if (item.node) console.log('  Element:', item.node.snippet);
    console.log('  Score:', item.score);
  });
}

// Check LCP phases from performance metrics
const lcpBreakdown = audits['lcp-lazy-loaded'];
if (lcpBreakdown) {
  console.log();
  console.log('=== LCP LAZY LOADED? ===');
  console.log('  Score:', lcpBreakdown.score);
  console.log('  Display:', lcpBreakdown.displayValue);
}
