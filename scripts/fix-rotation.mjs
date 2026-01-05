import sharp from 'sharp';

const imagePath = './public/properties/property-3.jpg';

async function fixRotation() {
  console.log('Fixing rotation for property-3.jpg...');

  // Read, rotate, and save
  await sharp(imagePath)
    .rotate() // Auto-rotate based on EXIF, or specify degrees
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(imagePath + '.tmp');

  // Replace original
  const { rename, unlink, stat } = await import('fs/promises');
  await unlink(imagePath);
  await rename(imagePath + '.tmp', imagePath);

  const stats = await stat(imagePath);
  console.log(`Done! New size: ${(stats.size / 1024).toFixed(0)} KB`);
}

fixRotation().catch(console.error);
