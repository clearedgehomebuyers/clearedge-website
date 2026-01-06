import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Paths
const projectRoot = resolve(__dirname, '..')
const publicDir = resolve(projectRoot, 'public')

// Source logo files
const squareLogoPath = 'C:\\Users\\trs35\\OneDrive\\Desktop\\logo\\Secondary logo\\ClearEdge.jpg'
const horizontalLogoPath = 'C:\\Users\\trs35\\OneDrive\\Desktop\\logo\\Main logo\\ClearEdge Properties_SSa-R00a_Mil.png'

// Brand colors
const DARK_BLUE = '#1e3a5f'
const GREEN = '#00a651'
const WHITE = '#ffffff'

async function generateFavicons() {
  console.log('Generating favicon assets...')

  // Load the square CE icon
  const squareLogo = sharp(squareLogoPath)
  const metadata = await squareLogo.metadata()
  console.log(`Source icon: ${metadata.width}x${metadata.height}`)

  // Generate favicon-16x16.png
  await sharp(squareLogoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-16x16.png'))
  console.log('✓ favicon-16x16.png')

  // Generate favicon-32x32.png
  await sharp(squareLogoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-32x32.png'))
  console.log('✓ favicon-32x32.png')

  // Generate apple-touch-icon.png (180x180)
  await sharp(squareLogoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'))
  console.log('✓ apple-touch-icon.png')

  // Generate icon-192.png (PWA)
  await sharp(squareLogoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'icon-192.png'))
  console.log('✓ icon-192.png')

  // Generate icon-512.png (PWA)
  await sharp(squareLogoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'icon-512.png'))
  console.log('✓ icon-512.png')

  // Generate favicon.ico (32x32 PNG converted to ICO format)
  // Sharp doesn't support ICO directly, so we'll create a 32x32 PNG
  // and rename it - browsers handle PNG favicons fine
  await sharp(squareLogoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(publicDir, 'favicon.ico'))
  console.log('✓ favicon.ico (as PNG)')
}

async function generateOGImage() {
  console.log('\nGenerating OG image...')

  const width = 1200
  const height = 630

  // Get horizontal logo dimensions
  const logoMeta = await sharp(horizontalLogoPath).metadata()
  console.log(`Horizontal logo: ${logoMeta.width}x${logoMeta.height}`)

  // Scale logo to 60% of OG image width, maintaining aspect ratio
  const targetLogoWidth = Math.round(width * 0.55)
  const logoAspectRatio = logoMeta.width / logoMeta.height
  const targetLogoHeight = Math.round(targetLogoWidth / logoAspectRatio)

  // Resize the horizontal logo
  const resizedLogo = await sharp(horizontalLogoPath)
    .resize(targetLogoWidth, targetLogoHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  // Create SVG text for taglines
  const taglineSvg = `
    <svg width="${width}" height="${height}">
      <style>
        .tagline {
          fill: white;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
        }
        .subtitle {
          fill: #94a3b8;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: normal;
        }
      </style>
      <text x="${width / 2}" y="${height - 140}" font-size="42" class="tagline" text-anchor="middle">
        Sell Your House Fast for Cash
      </text>
      <text x="${width / 2}" y="${height - 80}" font-size="28" class="subtitle" text-anchor="middle">
        Eastern Pennsylvania • NEPA • Lehigh Valley • Poconos
      </text>
    </svg>
  `
  const taglineBuffer = Buffer.from(taglineSvg)

  // Calculate logo position (centered horizontally, upper-middle vertically)
  const logoLeft = Math.round((width - targetLogoWidth) / 2)
  const logoTop = Math.round((height - targetLogoHeight) / 2) - 80 // Shift up to make room for text

  // Create the OG image with dark blue background
  await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 30, g: 58, b: 95, alpha: 1 } // #1e3a5f
    }
  })
    .composite([
      {
        input: resizedLogo,
        top: logoTop,
        left: logoLeft,
      },
      {
        input: taglineBuffer,
        top: 0,
        left: 0,
      }
    ])
    .png()
    .toFile(resolve(publicDir, 'og-image.png'))

  console.log('✓ og-image.png (1200x630)')
}

async function main() {
  try {
    console.log('=== ClearEdge Asset Generator ===\n')

    // Verify source files exist
    if (!fs.existsSync(squareLogoPath)) {
      throw new Error(`Square logo not found: ${squareLogoPath}`)
    }
    if (!fs.existsSync(horizontalLogoPath)) {
      throw new Error(`Horizontal logo not found: ${horizontalLogoPath}`)
    }

    await generateFavicons()
    await generateOGImage()

    console.log('\n✅ All assets generated successfully!')
  } catch (error) {
    console.error('Error generating assets:', error)
    process.exit(1)
  }
}

main()
