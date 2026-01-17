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

// Create the OG image SVG
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
  <g transform="translate(250, 120) scale(0.43)">
    ${logoPaths}
  </g>

  <!-- Tagline -->
  <text x="600" y="420"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="52"
        font-weight="700"
        fill="#1e293b"
        text-anchor="middle">
    Sell Your House Fast for Cash
  </text>

  <!-- Service Areas -->
  <text x="600" y="490"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#64748b"
        text-anchor="middle">
    Eastern Pennsylvania  •  NEPA  •  Lehigh Valley  •  Poconos
  </text>

  <!-- Bottom accent line -->
  <rect x="400" y="560" width="400" height="4" rx="2" fill="#008a29"/>
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

    // Check file size
    const stats = await import('fs').then(fs => fs.promises.stat(join(__dirname, 'public/og-image.png')));
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOgImage();
