const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const S3_BASE = 'https://s3.us-east-1.amazonaws.com/productionagmimports-sps-files/';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

async function downloadImage(filename, outputPath) {
  try {
    const url = S3_BASE + filename;
    console.log(`Downloading: ${url}`);

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    await fs.writeFile(outputPath, response.data);
    console.log(`✓ Saved: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to download ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  // Load inventory
  const inventoryPath = path.join(__dirname, '..', 'data', 'inventory.json');
  const inventory = JSON.parse(await fs.readFile(inventoryPath, 'utf-8'));

  // Ensure output directory exists
  await fs.ensureDir(OUTPUT_DIR);

  console.log(`Found ${inventory.items.length} items in inventory`);
  console.log(`Downloading sample images to: ${OUTPUT_DIR}\n`);

  // Collect unique images
  const imagesToDownload = [];
  const imageMap = new Map();

  for (const item of inventory.items) {
    const primaryImage = item.detail?.primaryImage;

    if (primaryImage && imagesToDownload.length < 15) {
      if (!imageMap.has(primaryImage)) {
        imagesToDownload.push({
          filename: primaryImage,
          itemName: item.name,
          itemId: item.id
        });
        imageMap.set(primaryImage, item);
      }
    }

    if (imagesToDownload.length >= 15) break;
  }

  console.log(`Attempting to download ${imagesToDownload.length} images...\n`);

  // Download images
  let successCount = 0;
  const downloadedImages = [];

  for (const img of imagesToDownload) {
    const outputPath = path.join(OUTPUT_DIR, img.filename);
    const success = await downloadImage(img.filename, outputPath);

    if (success) {
      successCount++;
      downloadedImages.push({
        filename: img.filename,
        itemName: img.itemName,
        itemId: img.itemId,
        path: `/images/products/${img.filename}`
      });
    }

    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Successfully downloaded ${successCount}/${imagesToDownload.length} images`);

  // Save mapping file
  const mappingPath = path.join(__dirname, '..', 'data', 'imageMapping.json');
  await fs.writeFile(mappingPath, JSON.stringify(downloadedImages, null, 2));
  console.log(`✓ Image mapping saved to: ${mappingPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
