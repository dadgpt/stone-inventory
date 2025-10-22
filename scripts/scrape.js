const axios = require('axios');
const https = require('https');
const fs = require('fs-extra');
const path = require('path');

const BASE_URL = 'https://inventory.agmimports.com';
const DATA_OUTPUT = path.join(__dirname, '..', 'data', 'inventory.json');
const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'images');
const CONCURRENCY = 5;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function axiosClient(authToken) {
  return axios.create({
    httpsAgent,
    headers: {
      Authorization: authToken,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Content-Type': 'application/json'
    },
  });
}

async function fetchText(url) {
  const { data } = await axios.get(url, {
    httpsAgent,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  return data;
}

async function discoverConfig() {
  const html = await fetchText(BASE_URL);
  const spsMatch = html.match(/var\s+SPSWebToken\s*=\s*"([^"]+)"/);
  const wcMatch = html.match(/WebconnectSettingID\s*=\s*"([^"]+)"/);
  const domainParts = new URL(BASE_URL).hostname.split('.');
  const candidates = Array.from(new Set([
    domainParts[0],
    domainParts[1],
    domainParts.slice(0, 2).join('')
  ].filter(Boolean)));
  let token = null;
  for (const candidate of candidates) {
    try {
      const script = await fetchText(`${BASE_URL}/custom/${candidate}/app.js?v=130.1.2`);
      if (script.trim().startsWith('<!DOCTYPE')) continue;
      const tokenMatch = script.match(/var\s+Token\s*=\s*'([^']+)'/);
      if (tokenMatch) {
        token = tokenMatch[1];
        break;
      }
    } catch (error) {
      // ignore and try next candidate
    }
  }
  if (!token) throw new Error('Unable to resolve Token from custom scripts');
  return {
    baseUrl: BASE_URL,
    spsWebToken: spsMatch && spsMatch[1],
    webconnectSettingID: (wcMatch && wcMatch[1]) || '1',
    token
  };
}

function buildApiUrl(config, act, params = {}) {
  const url = new URL(`https://${config.token}.stoneprofits.com/api/fetchdataAngularProductionToyota.ashx`);
  url.searchParams.set('act', act);
  url.searchParams.set('WebconnectSettingID', config.webconnectSettingID);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  url.searchParams.set('q', Date.now().toString());
  return url.toString();
}

async function withRetry(task, label) {
  let attempt = 0;
  while (attempt < RETRY_ATTEMPTS) {
    try {
      return await task();
    } catch (error) {
      attempt += 1;
      const wait = RETRY_DELAY_MS * attempt;
      console.warn(`[retry] ${label} failed (attempt ${attempt}/${RETRY_ATTEMPTS})`);
      if (attempt >= RETRY_ATTEMPTS) {
        throw error;
      }
      await new Promise(res => setTimeout(res, wait));
    }
  }
}

async function fetchSettings(config, client) {
  const url = buildApiUrl(config, 'getSettings');
  const { data } = await withRetry(() => client.get(url), 'getSettings');
  return data;
}

async function fetchSearchSettings(config, client, trimmedUserId) {
  const url = buildApiUrl(config, 'getSearchSettings', { userID: trimmedUserId });
  const { data } = await withRetry(() => client.get(url), 'getSearchSettings');
  return data;
}

async function fetchAllSearchDetails(config, client) {
  const url = buildApiUrl(config, 'getAllSearchDetails');
  const { data } = await withRetry(() => client.get(url), 'getAllSearchDetails');
  return data;
}

async function fetchGallery(config, client, trimmedUserId, wcSettings, searchValues) {
  const primary = wcSettings[0] || {};
  const inventoryGroupBy = (primary.GroupInventoryBy || 'IDOne,').replace(/,/g, '_');
  const showLocation = primary.ShowLocationinGallery === 'on' ? 'on' : '';
  const params = {
    InventoryGroupBy: inventoryGroupBy,
    TrimmedUserID: trimmedUserId,
    OnHold: primary.IncludeInventoryOnHold || '',
    OnSO: primary.IncludeInventoryOnSO || '',
    Intransit: primary.IncludeInventoryOnTransfer || '',
    showNotInStock: primary.IncludeProductsNotinStock || '',
    Alphabet: '',
    showLocation,
  };
  const act = primary.GalleryListType !== 'ListInventoryLots' ? 'getItemGallery' : 'getInventoryGallery';
  if (act === 'getItemGallery') {
    params.InventoryGroupBy = inventoryGroupBy || 'IDONE_';
    params.SearchbyItemIdentifiers = primary.SearchbyItemIdentifiers || '';
    params.ShowFeatureProductOnTop = primary.ShowFeatureProductsOnTop || '';
  }
  const url = buildApiUrl(config, act, params);
  const { data } = await withRetry(() => client.post(url, searchValues), 'getInventoryGallery');
  return data;
}

async function fetchProductDetails(config, client, itemId) {
  const url = buildApiUrl(config, 'getProductDetails', { id: itemId });
  const { data } = await withRetry(() => client.get(url), `getProductDetails:${itemId}`);
  return data;
}

async function fetchItemInventory(config, client, wcSettings, trimmedUserId, itemId) {
  const primary = wcSettings[0] || {};
  const inventoryGroupBy = (primary.GroupInventoryBy || 'IDOne,').replace(/,/g, '_');
  const params = {
    id: itemId,
    InventoryGroupBy: inventoryGroupBy,
    TrimmedUserID: trimmedUserId,
    OnHold: primary.IncludeInventoryOnHold || '',
    OnSO: primary.IncludeInventoryOnSO || '',
    Intransit: primary.IncludeInventoryOnTransfer || '',
    SelctdLocation: '',
    ShowLocationinGallery: primary.ShowLocationinGallery || '',
    LotPicturesRestrictToSIPL: primary.LotPictures_RestrictToSIPL || '',
    DetailLocation: '',
  };
  const url = buildApiUrl(config, 'getItemInventory', params);
  const { data } = await withRetry(() => client.get(url), `getItemInventory:${itemId}`);
  return data;
}

async function fetchItemColors(config, client, itemId) {
  const url = buildApiUrl(config, 'getAvailableColors', { id: itemId });
  const { data } = await withRetry(() => client.get(url), `getAvailableColors:${itemId}`);
  return data;
}

function extractSearchLookups(searchDetails) {
  const lookups = {};
  for (const entry of searchDetails) {
    const key = entry.SearchOption;
    if (!lookups[key]) lookups[key] = new Map();
    if (entry.ID !== null && entry.Value !== undefined) {
      lookups[key].set(String(entry.ID), entry.Value);
    }
  }
  return lookups;
}

function normalizeNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

async function downloadImage(url, destPath) {
  await fs.ensureDir(path.dirname(destPath));
  const response = await axios.get(url, {
    httpsAgent,
    responseType: 'stream',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  await new Promise((resolve, reject) => {
    const stream = response.data.pipe(fs.createWriteStream(destPath));
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function asyncPool(poolLimit, array, iteratorFn) {
  const executing = new Set();
  const results = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    results.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9-_\.]/g, '_');
}

function buildImageUrl(basePath, fileName) {
  if (!fileName) return null;
  const trimmedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const encodedName = encodeURIComponent(fileName).replace(/%2F/g, '/');
  return `${trimmedBase}${encodedName}`;
}

async function processGalleryItem(context, summary, index, total) {
  const { config, client, wcSettings, trimmedUserID, lookups, filePath, downloadRegistry } = context;
  const itemId = summary.ItemID;
  try {
    const [detailsRaw, inventoryRaw, colorsRaw] = await Promise.all([
      fetchProductDetails(config, client, itemId),
      fetchItemInventory(config, client, wcSettings, trimmedUserID, itemId),
      fetchItemColors(config, client, itemId)
    ]);

    const details = detailsRaw && detailsRaw[0] ? detailsRaw[0] : null;
    const inventory = ensureArray(inventoryRaw).map(entry => ({
      lotId: entry.IDOne || null,
      locationId: entry.LocationID !== undefined ? String(entry.LocationID) : null,
      location: entry.Location || null,
      availableQuantity: normalizeNumber(entry.AvailableQty),
      availableSlabs: normalizeNumber(entry.AvailableSlabs),
      averageLength: normalizeNumber(entry.AverageLength),
      averageWidth: normalizeNumber(entry.AverageWidth),
      unitOfMeasure: entry.UOM || null,
      fileName: entry.FileName || null,
      barcode: entry.Barcode || null,
    }));

    const colorList = colorsRaw && colorsRaw[0] && colorsRaw[0].Colors
      ? colorsRaw[0].Colors.split(',').map((c) => c.trim()).filter(Boolean)
      : [];

    const categoryName = summary.CategoryName || (details && details.ServiceCategoryValue) || null;
    const subCategoryName = details && details.ProductSubCategory ? details.ProductSubCategory : null;
    const colorName = details && details.ProductColor ? details.ProductColor : (summary.ColorID ? lookups.Color?.get(String(summary.ColorID)) || null : null);

    const mappedItem = {
      id: itemId,
      name: summary.ItemName,
      alternateName: details ? details.AlternateName || null : null,
      productForm: summary.ProductFormValue || (details && details.ProductFormValue) || null,
      category: {
        id: summary.CategoryID !== undefined ? String(summary.CategoryID) : null,
        name: categoryName,
        subCategoryId: summary.SubCategoryID !== undefined ? String(summary.SubCategoryID) : null,
        subCategoryName,
        groupId: summary.GroupID !== undefined && summary.GroupID !== null ? String(summary.GroupID) : null,
        groupName: summary.GroupID !== undefined && summary.GroupID !== null ? lookups.Group?.get(String(summary.GroupID)) || null : null,
      },
      measurements: {
        averageLength: normalizeNumber(summary.AverageLength),
        averageWidth: normalizeNumber(summary.AverageWidth),
        thickness: details ? details.ProductThickness || null : (summary.ThicknessID ? lookups.Thickness?.get(String(summary.ThicknessID)) || summary.ProductThickness : null),
      },
      quantities: {
        availableQuantity: normalizeNumber(summary.AvailableQty),
        availableSlabs: normalizeNumber(summary.AvailableSlabs),
        unit: summary.UOM || (details && details.UOM) || null,
      },
      pricing: {
        rangeId: summary.PriceRangeID !== undefined && summary.PriceRangeID !== null ? String(summary.PriceRangeID) : null,
        rangeName: summary.PriceRangeID !== undefined && summary.PriceRangeID !== null ? lookups.PriceRange?.get(String(summary.PriceRangeID)) || null : null,
      },
      origin: {
        id: summary.OriginID !== undefined && summary.OriginID !== null ? String(summary.OriginID) : null,
        name: summary.OriginID !== undefined && summary.OriginID !== null ? lookups.Origin?.get(String(summary.OriginID)) || null : (details ? details.OriginValue || null : null),
      },
      color: {
        id: summary.ColorID !== undefined && summary.ColorID !== null ? String(summary.ColorID) : null,
        name: colorName,
      },
      searchMetadata: {
        locationCodes: summary.Location ? summary.Location.split(',').map(s => s.trim()).filter(Boolean) : [],
        locationIds: summary.LocationID ? summary.LocationID.split(',').map(s => s.trim()).filter(Boolean) : [],
      },
      detail: details ? {
        featureProduct: details.FeatureProduct === 'on',
        newArrival: details.NewArrival === 'on',
        description: details.ProductDescription || details.DescriptiononWebsite || '',
        finish: details.Finish || null,
        sku: details.SKU || null,
        primaryImage: details.FileName || null,
      } : null,
      colors: colorList,
      inventory,
      images: [],
    };

    const imageCandidates = new Set();
    if (summary.Filename) imageCandidates.add(summary.Filename);
    if (details && details.FileName) imageCandidates.add(details.FileName);
    for (const entry of inventory) {
      if (entry.fileName) imageCandidates.add(entry.fileName);
    }

    const imageInfos = [];
    for (const fileName of imageCandidates) {
      const url = buildImageUrl(filePath, fileName);
      if (!url) continue;
      const safeName = sanitizeFileName(fileName);
      const localPath = path.join(IMAGES_ROOT, String(itemId), safeName);
      const relativePath = path.relative(path.join(__dirname, '..'), localPath).replace(/\\/g, '/');
      imageInfos.push({ fileName, url, localPath, relativePath });
    }

    mappedItem.images = imageInfos.map(({ fileName, url, relativePath }) => ({ fileName, url, path: relativePath }));

    for (const info of imageInfos) {
      if (!downloadRegistry.has(info.localPath)) {
        downloadRegistry.set(info.localPath, info.url);
      }
    }

    console.log(`[${index + 1}/${total}] Processed item ${itemId} (${mappedItem.name})`);
    return mappedItem;
  } catch (error) {
    console.error(`Failed to process item ${itemId}:`, error.message);
    return {
      id: itemId,
      name: summary.ItemName,
      error: error.message,
      inventory: [],
      images: [],
    };
  }
}

async function scrape() {
  console.log('Discovering site configuration...');
  const config = await discoverConfig();
  const client = axiosClient(config.spsWebToken);
  const trimmedUserID = Math.random().toString(36).slice(2);

  console.log('Fetching core configuration...');
  const settings = await fetchSettings(config, client);
  const searchSettings = await fetchSearchSettings(config, client, trimmedUserID);
  const allSearchDetails = await fetchAllSearchDetails(config, client);
  const lookups = extractSearchLookups(allSearchDetails);

  const searchValues = {
    ItemName: '',
    Location: '',
    Type: '',
    Category: '',
    Thickness: '',
    Finish: '',
    Group: '',
    Color: '',
    PriceRange: '',
    Origin: '',
    Kind: '',
    SubCategory: '',
    SlabOptions: '',
    SaleOptions: '',
    AvailableOptions: '',
    AvgCurrentAvailableQty: '',
    AvgCurrentSlabLength: '',
    AvgCurrentSlabWidth: '',
    AvailableSlabs: ''
  };

  console.log('Fetching gallery inventory...');
  const gallery = await fetchGallery(config, client, trimmedUserID, settings, searchValues);
  console.log(`Found ${gallery.length} inventory items.`);

  const filePath = settings[0]?.FilePath || settings[0]?.SecureFilePath || '';
  const downloadRegistry = new Map();

  const context = { config, client, wcSettings: settings, trimmedUserID, lookups, filePath, downloadRegistry };

  const items = await asyncPool(CONCURRENCY, gallery, (summary, index) =>
    processGalleryItem(context, summary, index, gallery.length)
  );

  const meta = {
    source: BASE_URL,
    scrapedAt: new Date().toISOString(),
    token: config.token,
    fileServer: settings[0]?.FileServer || null,
    virtualDirectory: settings[0]?.VirtualDirectoryName || null,
    filePath,
    totalItems: gallery.length,
  };

  await fs.writeJson(DATA_OUTPUT, { meta, items }, { spaces: 2 });
  console.log(`Inventory data saved to ${DATA_OUTPUT}`);

  console.log(`Downloading ${downloadRegistry.size} images...`);
  let completed = 0;
  await asyncPool(CONCURRENCY, Array.from(downloadRegistry.entries()), async ([localPath, url]) => {
    try {
      await downloadImage(url, localPath);
      completed += 1;
      if (completed % 25 === 0 || completed === downloadRegistry.size) {
        console.log(`Downloaded ${completed}/${downloadRegistry.size}`);
      }
    } catch (error) {
      console.error(`Failed to download ${url}: ${error.message}`);
    }
  });
  console.log('Image download complete.');
}

if (require.main === module) {
  scrape().catch(err => {
    console.error('Scrape failed:', err);
    process.exit(1);
  });
}
