const { loadInventory } = require('../_utils');

let inventory = [];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    inventory = await loadInventory();
    const { id } = req.query;

    if (req.method === 'GET') {
      const item = inventory.find((entry) => entry.id === id);
      if (!item) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(item);
    }

    if (req.method === 'PUT') {
      const index = inventory.findIndex((item) => item.id === id);
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
      return res.json(updated);
    }

    if (req.method === 'DELETE') {
      const index = inventory.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Not found' });
      }
      inventory.splice(index, 1);
      return res.status(204).send();
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
