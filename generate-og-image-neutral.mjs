import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Geo-neutral OG image for paid landing pages (/cashoffernj).
 *
 * Same template as generate-og-image.mjs minus the service-areas line, which
 * reads "Eastern Pennsylvania • NEPA • Lehigh Valley • Poconos" and is
 * rendered into the artwork itself — so campaign pages that make no locality
 * claim cannot reuse the standard image no matter what their meta tags say.
 *
 * Deliberately a separate script rather than a flag on the original: running
 * that one would rewrite public/og-image.png, and there is no reason to risk
 * regenerating a working shared asset to produce a second one.
 *
 * Vertical rhythm is rebalanced rather than left with a hole where the
 * removed line was — the headline moves down and the CTA pill up, so the
 * three remaining elements stay evenly distributed on the 630px canvas.
 */

const logoSvg = readFileSync(join(__dirname, 'public/Primary.svg'), 'utf8');
const logoPathsMatch = logoSvg.match(/<path[^>]*>/g);
const logoPaths = logoPathsMatch ? logoPathsMatch.join('') : '';

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Subtle gradient overlay at top -->
  <defs>
    <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="200" fill="url(#topGradient)"/>

  <!-- Logo - scaled and centered -->
  <g transform="translate(250, 85) scale(0.43)">
    ${logoPaths}
  </g>

  <!-- Headline -->
  <text x="600" y="440"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="52"
        font-weight="700"
        fill="#1e293b"
        text-anchor="middle">
    Sell Your House Fast for Cash
  </text>

  <!-- No service-areas line: this image ships on pages that make no
       locality claim. -->

  <!-- CTA Button with pill background -->
  <rect x="390" y="510" width="420" height="50" rx="25" fill="#e6f7eb"/>
  <text x="600" y="543"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="28"
        font-weight="700"
        fill="#008a29"
        text-anchor="middle">
    Get Your Free Cash Offer &#x2192;
  </text>
</svg>`;

writeFileSync(join(__dirname, 'public/og-image-neutral-source.svg'), ogSvg);

async function generateOgImage() {
  try {
    await sharp(Buffer.from(ogSvg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(__dirname, 'public/og-image-neutral.png'));

    console.log('Neutral OG image generated successfully!');

    const stats = await import('fs').then((fs) =>
      fs.promises.stat(join(__dirname, 'public/og-image-neutral.png')),
    );
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  } catch (error) {
    console.error('Error generating neutral OG image:', error);
  }
}

generateOgImage();
