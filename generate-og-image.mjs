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

// Create the OG image SVG with new beige/green design
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Top Section - Beige background (70% = 441px) -->
  <rect width="1200" height="441" fill="#FAF8F5"/>

  <!-- Bottom Section - Green bar (30% = 189px) -->
  <rect y="441" width="1200" height="189" fill="#008a29"/>

  <!-- Logo - scaled and centered in top section -->
  <g transform="translate(234, 60) scale(0.55)">
    ${logoPaths}
  </g>

  <!-- Main Headline - Serif style -->
  <text x="600" y="340"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="64"
        font-weight="500"
        fill="#1a1f1a"
        text-anchor="middle">
    Sell Your PA House Fast
  </text>

  <!-- Subheadline -->
  <text x="600" y="400"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#1a1f1a"
        opacity="0.6"
        text-anchor="middle">
    Cash Home Buyers Serving Eastern Pennsylvania
  </text>

  <!-- Trust Badges Row - White text on green -->
  <!-- Badge 1: Cash Offer in 24hrs -->
  <text x="200" y="510"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="26"
        font-weight="600"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; Cash Offer in 24hrs
  </text>

  <!-- Badge 2: No Fees -->
  <text x="600" y="510"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="26"
        font-weight="600"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; No Fees
  </text>

  <!-- Badge 3: Close in 7 Days -->
  <text x="1000" y="510"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="26"
        font-weight="600"
        fill="#ffffff"
        text-anchor="middle">
    &#x2713; Close in 7 Days
  </text>

  <!-- CTA Button/Pill -->
  <rect x="400" y="545" width="400" height="50" rx="25" fill="#ffffff" opacity="0.15"/>
  <text x="600" y="580"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-size="24"
        font-weight="700"
        fill="#ffffff"
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
