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

// Create the OG image SVG with beige top / green bottom design
// Top: 70% (441px) - Beige with small centered logo
// Bottom: 30% (189px) - Green bar with headline, badges, and CTA
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Top Section - Beige background (70% = 441px) -->
  <rect width="1200" height="441" fill="#FAF8F5"/>

  <!-- Bottom Section - Green bar (30% = 189px) -->
  <rect y="441" width="1200" height="189" fill="#008a29"/>

  <!-- Logo - Small (~170px wide), centered horizontally, positioned in upper portion -->
  <!-- Original SVG is 732x732, scale to ~170px = 0.23 scale -->
  <!-- Center: (1200 - 732*0.23) / 2 = (1200 - 168) / 2 = 516 -->
  <g transform="translate(516, 80) scale(0.23)">
    ${logoPaths}
  </g>

  <!-- Bottom Green Section Content -->

  <!-- Main Headline - White, serif font -->
  <text x="600" y="490"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="42"
        font-weight="500"
        fill="#ffffff"
        text-anchor="middle">
    Sell Your PA House Fast
  </text>

  <!-- Trust Badges Row - White text with checkmarks -->
  <text x="200" y="545"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="22"
        font-weight="500"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; Cash Offer in 24hrs
  </text>

  <text x="600" y="545"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="22"
        font-weight="500"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; No Fees
  </text>

  <text x="1000" y="545"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="22"
        font-weight="500"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; Close in 7 Days
  </text>

  <!-- CTA Text -->
  <text x="600" y="600"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="20"
        font-weight="600"
        fill="#ffffff"
        opacity="0.9"
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
