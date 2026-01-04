import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const PROPERTIES_DIR = './public/properties';
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  const files = await readdir(PROPERTIES_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const file of imageFiles) {
    const filePath = join(PROPERTIES_DIR, file);
    const beforeStats = await stat(filePath);
    const beforeSize = (beforeStats.size / 1024 / 1024).toFixed(2);

    console.log(`Processing: ${file} (${beforeSize} MB)`);

    // Read and optimize
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if wider than MAX_WIDTH
    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Convert to optimized JPEG
    const outputPath = filePath.replace(/\.(jpeg|png|webp)$/i, '.jpg');
    await pipeline
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outputPath + '.tmp');

    // Replace original with optimized version
    const { rename, unlink } = await import('fs/promises');

    // If original was not .jpg, remove it
    if (outputPath !== filePath) {
      await unlink(filePath);
    } else {
      await unlink(filePath);
    }
    await rename(outputPath + '.tmp', outputPath);

    const afterStats = await stat(outputPath);
    const afterSize = (afterStats.size / 1024 / 1024).toFixed(2);
    const savings = (((beforeStats.size - afterStats.size) / beforeStats.size) * 100).toFixed(1);

    console.log(`  → ${outputPath.split('/').pop()} (${afterSize} MB) - ${savings}% smaller\n`);
  }

  console.log('Done!');
}

optimizeImages().catch(console.error);
