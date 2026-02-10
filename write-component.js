
const fs = require('fs');
const path = 'C:/Users/trs35/OneDrive/Desktop/clearedge-website/src/components/v0-comparison-merged.tsx';
const b64 = process.argv[1];
fs.writeFileSync(path, Buffer.from(b64, 'base64').toString('utf8'));
console.log('Written successfully');
