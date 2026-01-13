import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const propertiesDir = join(__dirname, 'public/properties');
const originalsDir = join(propertiesDir, 'originals');

// Get all jpg files from originals
const files = readdirSync(originalsDir).filter(f => f.endsWith('.jpg'));

console.log('Property Photo Optimization\n');
console.log('=' .repeat(70));

let totalBefore = 0;
let totalAfter = 0;

async function optimizePhotos() {
  for (const file of files) {
    const inputPath = join(originalsDir, file);
    const outputPath = join(propertiesDir, file);

    // Get original size
    const beforeSize = statSync(inputPath).size;
    totalBefore += beforeSize;

    // Optimize: resize to max 800px width, 65% quality, progressive
    await sharp(inputPath)
      .resize(800, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 65,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);

    // Get new size
    const afterSize = statSync(outputPath).size;
    totalAfter += afterSize;

    const savings = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1);

    console.log(`\n${file}`);
    console.log(`  Before: ${(beforeSize / 1024).toFixed(0)} KB`);
    console.log(`  After:  ${(afterSize / 1024).toFixed(0)} KB`);
    console.log(`  Saved:  ${savings}%`);
  }

  console.log('\n' + '=' .repeat(70));
  console.log('\nTOTAL:');
  console.log(`  Before: ${(totalBefore / 1024).toFixed(0)} KB (${(totalBefore / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`  After:  ${(totalAfter / 1024).toFixed(0)} KB (${(totalAfter / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`  Saved:  ${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%`);
}

// Create alt text JSON
const altText = {
  "scranton-pa-cash-home-buyers-clearedge-1.jpg": "Two-story home with covered porch in Scranton, PA - sold as-is to ClearEdge Home Buyers for cash",
  "allentown-pa-sell-house-fast-as-is-2.jpg": "Single-family house in Allentown, PA purchased by ClearEdge - no repairs needed before sale",
  "wilkes-barre-pa-inherited-property-sale-3.jpg": "Multi-unit property in Wilkes-Barre, PA - inherited home sold quickly for cash",
  "lehigh-valley-real-estate-investors-4.jpg": "Distressed duplex in Lehigh Valley, PA - bought as-is by local cash home buyers",
  "nepa-distressed-house-cleanout-service-5.jpg": "NEPA property with deferred maintenance - ClearEdge bought with no cleanout required"
};

writeFileSync(
  join(propertiesDir, 'alt-text.json'),
  JSON.stringify(altText, null, 2)
);

console.log('\nAlt text saved to public/properties/alt-text.json');

optimizePhotos().catch(console.error);
