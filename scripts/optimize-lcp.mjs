import sharp from 'sharp';

// Create 280w version for mobile
await sharp('public/properties/scranton-pa-cash-home-buyers-clearedge-1-mobile.webp')
  .resize(280, 210)
  .webp({ quality: 82 })
  .toFile('public/properties/scranton-pa-cash-home-buyers-clearedge-1-280w.webp');

// Create 320w version for desktop
await sharp('public/properties/scranton-pa-cash-home-buyers-clearedge-1-mobile.webp')
  .resize(320, 240)
  .webp({ quality: 82 })
  .toFile('public/properties/scranton-pa-cash-home-buyers-clearedge-1-320w.webp');

console.log('Done!');
