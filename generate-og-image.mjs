import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the Primary.svg logo
const logoSvg = readFileSync(join(__dirname, 'public/Primary.svg'), 'utf8');

// Extract just the paths from the logo SVG (remove the outer svg tag)
const logoPathsMatch = logoSvg.match(/<path[^>]*>/g);
const logoPaths = logoPathsMatch ? logoPathsMatch.join('') : '';

/*
 * EXTRACTED FROM v0-trust-bar.tsx:
 *
 * Section background: bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1] → using #f5f7f5
 * Main text color: text-[#1a2e1a] → #1a2e1a
 * Main text font: font-serif → Georgia, serif
 * Main text weight: font-medium → 500
 */

const TRUST_BAR_BG = '#f5f7f5';
const MAIN_TEXT_COLOR = '#1a2e1a';
const MAIN_FONT = 'Georgia, serif';
const MAIN_WEIGHT = '500';

// Layout calculations:
// Total height: 630px
// Upper section: 75% = 472.5px → 472px
// Lower section: 25% = 157.5px → 158px
//
// Logo: 300px wide
// Original SVG: 732x732
// Scale: 300/732 = 0.41
// Scaled height: 732 * 0.41 = 300px
//
// Upper section center Y: 472/2 = 236px
// Logo + text total height: ~300 + 20gap + 36text = 356px
// Start Y for logo: 236 - 356/2 = 236 - 178 = 58px → use 80px for padding
//
// Logo center X: (1200 - 300) / 2 = 450px

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Upper Section - Beige background (75% = 472px) -->
  <rect width="1200" height="472" fill="#FAF8F5"/>

  <!-- Lower Section - Trust bar background (25% = 158px) -->
  <rect y="472" width="1200" height="158" fill="${TRUST_BAR_BG}"/>

  <!-- Logo - 300px wide, centered horizontally and vertically in upper section -->
  <!-- Scale: 300/732 = 0.41, centered at x=450 -->
  <!-- Vertical center of upper section: 472/2 = 236, logo center at y=160 -->
  <g transform="translate(450, 80) scale(0.41)">
    ${logoPaths}
  </g>

  <!-- "Sell Your PA House Fast" - centered below logo -->
  <!-- Logo bottom: 80 + 300 = 380, text at y=420 (40px gap) -->
  <text x="600" y="420"
        font-family="${MAIN_FONT}"
        font-size="36"
        font-weight="${MAIN_WEIGHT}"
        fill="${MAIN_TEXT_COLOR}"
        text-anchor="middle">
    Sell Your PA House Fast
  </text>

  <!-- Lower Section: Trust badges with checkmarks -->
  <!-- Centered at y=530 (middle of lower section) -->
  <text x="600" y="530"
        font-family="${MAIN_FONT}"
        font-size="24"
        font-weight="${MAIN_WEIGHT}"
        fill="${MAIN_TEXT_COLOR}"
        text-anchor="middle">
    &#x2713; Cash Offer in 24hrs     &#x2713; No Fees     &#x2713; Close in 7 Days
  </text>

  <!-- CTA below -->
  <text x="600" y="580"
        font-family="${MAIN_FONT}"
        font-size="20"
        font-weight="${MAIN_WEIGHT}"
        fill="${MAIN_TEXT_COLOR}"
        text-anchor="middle">
    Get Your Free Cash Offer &#x2192;
  </text>
</svg>`;

// Write the SVG for debugging
writeFileSync(join(__dirname, 'public/og-image-source.svg'), ogSvg);

// Convert to PNG using sharp
async function generateOgImage() {
  try {
    await sharp(Buffer.from(ogSvg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(__dirname, 'public/og-image.png'));

    console.log('OG image generated successfully!');

    // Check file size and dimensions
    const metadata = await sharp(join(__dirname, 'public/og-image.png')).metadata();
    const stats = await import('fs').then(fs => fs.promises.stat(join(__dirname, 'public/og-image.png')));
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOgImage();
