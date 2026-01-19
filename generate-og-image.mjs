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
 * EXACT VALUES EXTRACTED FROM v0-trust-bar.tsx:
 *
 * Background: bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]
 * Main text color: text-[#1a2e1a] = #1a2e1a
 * Main text font: font-serif = "Playfair Display", Georgia, serif
 * Main text weight: font-medium = 500
 * Subtext color: text-muted-foreground = oklch(0.5 0.01 250) ≈ #6b7280
 */

// Create the OG image SVG
// Upper section (75% = 472px): Beige #FAF8F5 with logo and headline
// Lower section (25% = 158px): Sage gradient from #f5f7f5 to #f0f4f1 with trust items
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Gradient matching trust bar: from-[#f5f7f5] to-[#f0f4f1] -->
    <linearGradient id="trustBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f7f5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f0f4f1;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Upper Section - Beige background (75% = 472px) -->
  <rect width="1200" height="472" fill="#FAF8F5"/>

  <!-- Lower Section - Trust bar gradient (25% = 158px) -->
  <rect y="472" width="1200" height="158" fill="url(#trustBarGradient)"/>

  <!-- Logo - 180px wide, centered, 140px from top -->
  <!-- Original SVG is 732x732, scale to 180px = 180/732 = 0.246 -->
  <!-- Center X: (1200 - 732*0.246) / 2 = (1200 - 180) / 2 = 510 -->
  <g transform="translate(510, 140) scale(0.246)">
    ${logoPaths}
  </g>

  <!-- Main Headline - 80px below logo bottom (140 + 180 + 80 = 400) -->
  <!-- Using EXACT trust bar styling: #1a2e1a, Playfair Display/Georgia, font-medium (500) -->
  <text x="600" y="400"
        font-family="'Playfair Display', Georgia, serif"
        font-size="52"
        font-weight="500"
        fill="#1a2e1a"
        text-anchor="middle">
    Sell Your PA House Fast
  </text>

  <!-- Lower Section: Trust Items -->
  <!-- Using EXACT trust bar styling: #1a2e1a, Playfair Display/Georgia, font-medium (500) -->

  <!-- Item 1: Cash Offer in 24hrs -->
  <text x="200" y="535"
        font-family="'Playfair Display', Georgia, serif"
        font-size="32"
        font-weight="500"
        fill="#1a2e1a"
        text-anchor="middle">
    Cash Offer in 24hrs
  </text>
  <text x="200" y="565"
        font-family="Inter, system-ui, sans-serif"
        font-size="16"
        font-weight="400"
        fill="#6b7280"
        text-anchor="middle">
    Fast Response
  </text>

  <!-- Item 2: No Fees -->
  <text x="600" y="535"
        font-family="'Playfair Display', Georgia, serif"
        font-size="32"
        font-weight="500"
        fill="#1a2e1a"
        text-anchor="middle">
    No Fees
  </text>
  <text x="600" y="565"
        font-family="Inter, system-ui, sans-serif"
        font-size="16"
        font-weight="400"
        fill="#6b7280"
        text-anchor="middle">
    Zero Commissions
  </text>

  <!-- Item 3: Close in 7 Days -->
  <text x="1000" y="535"
        font-family="'Playfair Display', Georgia, serif"
        font-size="32"
        font-weight="500"
        fill="#1a2e1a"
        text-anchor="middle">
    Close in 7 Days
  </text>
  <text x="1000" y="565"
        font-family="Inter, system-ui, sans-serif"
        font-size="16"
        font-weight="400"
        fill="#6b7280"
        text-anchor="middle">
    Your Timeline
  </text>

  <!-- CTA at bottom -->
  <text x="600" y="610"
        font-family="Inter, system-ui, sans-serif"
        font-size="18"
        font-weight="600"
        fill="#1a2e1a"
        opacity="0.7"
        text-anchor="middle">
    Get Your Free Cash Offer at clearedgehomebuyers.com
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
