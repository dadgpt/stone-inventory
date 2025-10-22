const path = require('path');
const fs = require('fs/promises');

const DATA_FILE = path.join(__dirname, '..', 'data', 'mockInventory.json');

let cachedInventory = null;

async function loadInventory(forceReload = false) {
  if (!cachedInventory || forceReload) {
    const file = await fs.readFile(DATA_FILE, 'utf-8');
    cachedInventory = JSON.parse(file);
  }
  return cachedInventory;
}

function filterInventory(items, query) {
  return items.filter((item) => {
    if (query.search) {
      const term = query.search.toLowerCase();
      const candidate = [item.name, item.lot, item.location, item.type, item.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!candidate.includes(term)) return false;
    }
    if (query.location && item.location.toLowerCase() !== query.location.toLowerCase()) return false;
    if (query.type && item.type.toLowerCase() !== query.type.toLowerCase()) return false;
    if (query.status && item.status.toLowerCase() !== query.status.toLowerCase()) return false;
    if (query.tier && item.priceTier.toLowerCase() !== query.tier.toLowerCase()) return false;

    if (query.color) {
      const colors = item.colorFamily || [];
      const match = colors.some((c) => c.toLowerCase() === query.color.toLowerCase());
      if (!match) return false;
    }

    return true;
  });
}

function paginate(items, page = 1, pageSize = 20) {
  const currentPage = Math.max(1, Number(page));
  const perPage = Math.max(1, Math.min(100, Number(pageSize)));
  const start = (currentPage - 1) * perPage;
  const pagedItems = items.slice(start, start + perPage);
  return {
    meta: {
      total: items.length,
      page: currentPage,
      pageSize: perPage,
      totalPages: Math.ceil(items.length / perPage) || 1,
    },
    data: pagedItems,
  };
}

module.exports = { loadInventory, filterInventory, paginate };
