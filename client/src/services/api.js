const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
}

export async function fetchInventory(params = {}) {
  const query = buildQuery(params);
  const response = await fetch(`${API_BASE}/api/inventory${query ? `?${query}` : ''}`);
  if (!response.ok) {
    throw new Error('Failed to load inventory list');
  }
  return response.json();
}

export async function fetchInventoryItem(id) {
  const response = await fetch(`${API_BASE}/api/inventory/${id}`);
  if (!response.ok) {
    throw new Error('Inventory item not found');
  }
  return response.json();
}

export async function updateInventoryItem(id, payload) {
  const response = await fetch(`${API_BASE}/api/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update inventory item');
  }
  return response.json();
}

export async function createInventoryItem(payload) {
  const response = await fetch(`${API_BASE}/api/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to create inventory item');
  }
  return response.json();
}

export async function reloadInventory() {
  const response = await fetch(`${API_BASE}/api/refresh`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to refresh inventory data');
  }
  return response.json();
}
