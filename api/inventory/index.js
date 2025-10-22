const { loadInventory, filterInventory, paginate } = require('../_utils');

let inventory = [];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    inventory = await loadInventory();

    if (req.method === 'GET') {
      const filtered = filterInventory(inventory, req.query);
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 20;
      return res.json(paginate(filtered, page, pageSize));
    }

    if (req.method === 'POST') {
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
      return res.status(201).json(newItem);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
