import sharp from 'sharp'
import { writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read the logo and convert to base64
const logoPath = join(__dirname, '..', 'public', 'logo.png')
let logoBase64 = ''
try {
  const logoBuffer = readFileSync(logoPath)
  logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`
} catch (e) {
  console.log('Logo not found, using text fallback')
}

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#162d4a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e3a5f;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0d9488;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#14b8a6;stop-opacity:1" />
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="40" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>

  <!-- Decorative teal circles -->
  <circle cx="100" cy="100" r="200" fill="#0d9488" opacity="0.15" filter="url(#glow)"/>
  <circle cx="1100" cy="530" r="250" fill="#14b8a6" opacity="0.1" filter="url(#glow)"/>
  <circle cx="900" cy="80" r="120" fill="#0d9488" opacity="0.08"/>

  <!-- Accent line -->
  <rect x="100" y="200" width="120" height="6" rx="3" fill="url(#tealGradient)"/>

  <!-- Logo placeholder / Company name -->
  <text x="100" y="170" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#14b8a6">
    CLEAREDGE
  </text>
  <text x="295" y="170" font-family="Arial, sans-serif" font-size="32" font-weight="normal" fill="#ffffff">
    Home Buyers
  </text>

  <!-- Main headline -->
  <text x="100" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">
    Sell Your House
  </text>
  <text x="100" y="385" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">
    Fast for
    <tspan fill="url(#tealGradient)">Cash</tspan>
  </text>

  <!-- Subheadline -->
  <text x="100" y="460" font-family="Arial, sans-serif" font-size="28" fill="#94a3b8">
    Eastern Pennsylvania  •  Cash Offers in 24 Hours
  </text>

  <!-- Bottom accent bar -->
  <rect x="0" y="600" width="1200" height="30" fill="url(#tealGradient)"/>

  <!-- Feature pills -->
  <rect x="100" y="500" width="180" height="44" rx="22" fill="#0d9488" opacity="0.2"/>
  <text x="130" y="528" font-family="Arial, sans-serif" font-size="18" fill="#14b8a6">No Repairs</text>

  <rect x="300" y="500" width="160" height="44" rx="22" fill="#0d9488" opacity="0.2"/>
  <text x="330" y="528" font-family="Arial, sans-serif" font-size="18" fill="#14b8a6">No Fees</text>

  <rect x="480" y="500" width="200" height="44" rx="22" fill="#0d9488" opacity="0.2"/>
  <text x="510" y="528" font-family="Arial, sans-serif" font-size="18" fill="#14b8a6">Close in 7 Days</text>

  <!-- Phone number -->
  <text x="1100" y="170" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="end">
    (570) 904-2059
  </text>
</svg>
`

async function generateOgImage() {
  try {
    const outputPath = join(__dirname, '..', 'public', 'og-image.png')

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath)

    console.log('OG image generated successfully at:', outputPath)
  } catch (error) {
    console.error('Error generating OG image:', error)
    process.exit(1)
  }
}

generateOgImage()
