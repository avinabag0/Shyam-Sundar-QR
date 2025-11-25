const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeFolder(folder) {
  const files = await fs.readdir(folder);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const input = path.join(folder, file);
      const output = path.join(folder, file.replace(/\.(jpg|jpeg)$/, '.webp'));
      await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })  // Max 1200px wide
        .webp({ quality: 80 })  // 80% quality = tiny but sharp
        .toFile(output);
      console.log(`Optimized ${file} → ${output}`);
      // Optional: Delete old JPG after testing
      // await fs.unlink(input);
    }
  }
}

optimizeFolder('saree');
optimizeFolder('textile');
// Add more folders as needed