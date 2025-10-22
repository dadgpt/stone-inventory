const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const S3_BASE = 'https://s3.us-east-1.amazonaws.com/productionagmimports-sps-files/';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products');
const LOCATIONS = ['Hardeeville', 'Raleigh', 'Charlotte', 'Charleston', 'Atlanta'];
const STATUSES = ['In Stock', 'Reserved', 'Low Stock'];
const TYPES = ['Quartzite', 'Marble', 'Granite', 'Dolomite', 'Soapstone'];
const FINISHES = ['Polished', 'Honed', 'Leathered', 'Brushed'];
const PRICE_TIERS = ['Premium', 'Standard', 'Value'];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateAnalytics() {
  const views = Math.floor(Math.random() * 2000) + 100;
  const searchAppearances = Math.floor(Math.random() * 1500) + 80;
  const clicks = Math.floor(Math.random() * views * 0.6);
  const shares = Math.floor(Math.random() * 50);

  return { views, searchAppearances, clicks, shares };
}

async function downloadImage(filename, outputPath) {
  try {
    const url = S3_BASE + filename;
    console.log(`Downloading: ${filename}`);

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
  // Load full inventory
  const inventoryPath = path.join(__dirname, '..', 'data', 'inventory.json');
  const inventory = JSON.parse(await fs.readFile(inventoryPath, 'utf-8'));

  // Load current mock inventory
  const mockPath = path.join(__dirname, '..', 'data', 'mockInventory.json');
  const mockInventory = JSON.parse(await fs.readFile(mockPath, 'utf-8'));

  console.log(`Found ${inventory.items.length} items in full inventory`);
  console.log(`Current mock inventory has ${mockInventory.length} items`);

  // Get existing IDs to avoid duplicates
  const existingIds = new Set(mockInventory.map(item => item.id));
  const existingNames = new Set(mockInventory.map(item => item.name.toLowerCase()));

  // Find 30 new unique products with images
  const newProducts = [];
  const imagesToDownload = [];

  // Shuffle inventory items
  const shuffled = [...inventory.items].sort(() => Math.random() - 0.5);

  for (const item of shuffled) {
    if (newProducts.length >= 30) break;

    // Skip if we already have this product
    if (existingIds.has(item.id) || existingNames.has(item.name?.toLowerCase())) {
      continue;
    }

    // Must have a name and primary image
    const primaryImage = item.detail?.primaryImage;
    if (!item.name || !primaryImage) continue;

    // Add to new products
    const productId = `INV-${String(mockInventory.length + newProducts.length + 1).padStart(3, '0')}`;
    const location = getRandomItem(LOCATIONS);
    const status = getRandomItem(STATUSES);
    const type = item.type || getRandomItem(TYPES);

    const newProduct = {
      id: productId,
      name: item.name,
      type: type,
      finish: item.finish || getRandomItem(FINISHES),
      location: location,
      lot: `LOT-${Math.floor(Math.random() * 9000) + 1000}`,
      status: status,
      priceTier: getRandomItem(PRICE_TIERS),
      availableSlabs: status === 'Out of Stock' ? 0 : Math.floor(Math.random() * 20) + 1,
      availableSqFt: status === 'Out of Stock' ? 0 : Math.floor(Math.random() * 500) + 50,
      colorFamily: item.colorFamily || [],
      images: [],
      analytics: generateAnalytics(),
      detail: {
        description: item.description || `Beautiful ${type.toLowerCase()} with unique characteristics.`,
        thickness: item.thickness || '3cm',
        origin: item.origin || 'Unknown',
        pattern: item.pattern || 'Natural',
      }
    };

    newProducts.push(newProduct);
    imagesToDownload.push({
      filename: primaryImage,
      productId: productId
    });
  }

  console.log(`\nSelected ${newProducts.length} new products`);
  console.log(`Downloading ${imagesToDownload.length} images...\n`);

  // Ensure output directory exists
  await fs.ensureDir(OUTPUT_DIR);

  // Download images
  let successCount = 0;
  const downloadedMap = new Map();

  for (const img of imagesToDownload) {
    const outputPath = path.join(OUTPUT_DIR, img.filename);

    // Check if file already exists
    if (await fs.pathExists(outputPath)) {
      console.log(`⊙ Already exists: ${img.filename}`);
      downloadedMap.set(img.productId, `/images/products/${img.filename}`);
      successCount++;
      continue;
    }

    const success = await downloadImage(img.filename, outputPath);

    if (success) {
      successCount++;
      downloadedMap.set(img.productId, `/images/products/${img.filename}`);
    }

    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Successfully processed ${successCount}/${imagesToDownload.length} images`);

  // Add image paths to products
  for (const product of newProducts) {
    const imagePath = downloadedMap.get(product.id);
    if (imagePath) {
      product.images = [imagePath];
    }
  }

  // Filter out products without images
  const validProducts = newProducts.filter(p => p.images.length > 0);
  console.log(`✓ ${validProducts.length} products have valid images`);

  // Merge with existing mock inventory
  const updatedMockInventory = [...mockInventory, ...validProducts];

  // Save updated mock inventory
  await fs.writeFile(mockPath, JSON.stringify(updatedMockInventory, null, 2));
  console.log(`✓ Updated mock inventory saved with ${updatedMockInventory.length} total items`);

  // Print location distribution
  console.log('\nLocation distribution:');
  const locationCounts = {};
  for (const product of updatedMockInventory) {
    locationCounts[product.location] = (locationCounts[product.location] || 0) + 1;
  }
  for (const [location, count] of Object.entries(locationCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${location}: ${count} products`);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
