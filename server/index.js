const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');

const DATA_FILE = path.join(__dirname, '..', 'data', 'mockInventory.json');
const PORT = process.env.PORT || 5000;

let inventory = [];

async function loadInventory() {
  const file = await fs.readFile(DATA_FILE, 'utf-8');
  inventory = JSON.parse(file);
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

async function main() {
  await loadInventory();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', updatedAt: new Date().toISOString() });
  });

  app.get('/api/inventory', (req, res) => {
    const filtered = filterInventory(inventory, req.query);
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    res.json(paginate(filtered, page, pageSize));
  });

  app.get('/api/inventory/:id', (req, res) => {
    const item = inventory.find((entry) => entry.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(item);
  });

  app.post('/api/inventory', (req, res) => {
    const payload = req.body || {};
    if (!payload.id || !payload.name) {
      return res.status(400).json({ error: 'id and name are required' });
    }
    if (inventory.some((item) => item.id === payload.id)) {
      return res.status(409).json({ error: 'Inventory id already exists' });
    }
    const newItem = {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
  });

  app.put('/api/inventory/:id', (req, res) => {
    const index = inventory.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    const updated = {
      ...inventory[index],
      ...req.body,
      id: inventory[index].id,
      updatedAt: new Date().toISOString(),
    };
    inventory[index] = updated;
    res.json(updated);
  });

  app.delete('/api/inventory/:id', (req, res) => {
    const index = inventory.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    inventory.splice(index, 1);
    res.status(204).send();
  });

  app.post('/api/refresh', async (_req, res, next) => {
    try {
      await loadInventory();
      res.json({ status: 'reloaded', total: inventory.length });
    } catch (error) {
      next(error);
    }
  });

  // Serve product images from public directory
  app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

  // Serve client build
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

  // Catch-all route for client-side routing
  app.use((req, res, next) => {
    // Only handle GET requests that don't start with /api or /images
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/images')) {
      const indexHtml = path.join(__dirname, '..', 'client', 'dist', 'index.html');
      return res.sendFile(indexHtml, (err) => {
        if (err) next(err);
      });
    }
    next();
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Inventory server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
