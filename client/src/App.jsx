import { useEffect, useMemo, useState } from 'react';
import FiltersPanel from './components/FiltersPanel.jsx';
import InventoryTable from './components/InventoryTable.jsx';
import InventoryDetail from './components/InventoryDetail.jsx';
import InventoryModal from './components/InventoryModal.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import KpiStrip from './components/KpiStrip.jsx';
import TabNavigation from './components/TabNavigation.jsx';
import AnalyticsView from './components/AnalyticsView.jsx';
import {
  fetchInventory,
  fetchInventoryItem,
  updateInventoryItem,
  createInventoryItem,
  reloadInventory,
} from './services/api.js';
import { mockInventory } from './mockData.js';
import './App.css';

// MOCK MODE: Set to true to use hardcoded data instead of API (for prototype deployment)
const USE_MOCK_DATA = true;

const DEFAULT_FILTERS = {
  search: '',
  location: '',
  type: '',
  status: '',
  tier: '',
  color: '',
};

const PAGE_SIZE = 15;

function dedupe(values = []) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

// Helper functions for mock data filtering and pagination
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
    if (query.location && item.location?.toLowerCase() !== query.location.toLowerCase()) return false;
    if (query.type && item.type?.toLowerCase() !== query.type.toLowerCase()) return false;
    if (query.status && item.status?.toLowerCase() !== query.status.toLowerCase()) return false;
    if (query.tier && item.priceTier?.toLowerCase() !== query.tier.toLowerCase()) return false;

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

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [adminBusy, setAdminBusy] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('activeTab');
    return saved || 'inventory';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    let isCancelled = false;

    async function loadInventory() {
      setLoading(true);
      setError(null);
      try {
        if (USE_MOCK_DATA) {
          // Use mock data instead of API
          await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
          const filtered = filterInventory(mockInventory, filters);
          const paged = paginate(filtered, page, PAGE_SIZE);
          if (!isCancelled) {
            setInventory(paged.data);
            setMeta(paged.meta);
            if (!paged.data.some((item) => item.id === selectedId)) {
              setSelectedId(paged.data[0]?.id || null);
            }
          }
        } else {
          // Use API
          const response = await fetchInventory({ ...filters, page, pageSize: PAGE_SIZE });
          if (!isCancelled) {
            setInventory(response.data);
            setMeta(response.meta);
            if (!response.data.some((item) => item.id === selectedId)) {
              setSelectedId(response.data[0]?.id || null);
            }
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadInventory();
    return () => {
      isCancelled = true;
    };
  }, [filters, page, refreshKey, selectedId]);

  useEffect(() => {
    let isCancelled = false;
    async function loadDetail() {
      if (!selectedId) {
        setSelectedItem(null);
        return;
      }
      setDetailLoading(true);
      try {
        if (USE_MOCK_DATA) {
          // Use mock data
          await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
          const item = mockInventory.find((entry) => entry.id === selectedId);
          if (!isCancelled) {
            setSelectedItem(item || null);
          }
        } else {
          // Use API
          const item = await fetchInventoryItem(selectedId);
          if (!isCancelled) {
            setSelectedItem(item);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) setDetailLoading(false);
      }
    }
    loadDetail();
    return () => {
      isCancelled = true;
    };
  }, [selectedId]);

  const filterOptions = useMemo(() => {
    const locations = dedupe(inventory.map((item) => item.location));
    const types = dedupe(inventory.map((item) => item.type));
    const statuses = dedupe(inventory.map((item) => item.status));
    const tiers = dedupe(inventory.map((item) => item.priceTier));
    const colors = dedupe(inventory.flatMap((item) => item.colorFamily || []));
    return { location: locations, type: types, status: statuses, tier: tiers, color: colors };
  }, [inventory]);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleRefresh = async () => {
    try {
      await reloadInventory();
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, payload) => {
    setAdminBusy(true);
    try {
      const updated = await updateInventoryItem(id, payload);
      setSelectedItem(updated);
      setRefreshKey((key) => key + 1);
      return updated;
    } finally {
      setAdminBusy(false);
    }
  };

  const handleCreate = async (payload) => {
    setAdminBusy(true);
    try {
      const created = await createInventoryItem(payload);
      setSelectedId(created.id);
      setRefreshKey((key) => key + 1);
      return created;
    } finally {
      setAdminBusy(false);
    }
  };

  const handleOpenModal = async (id) => {
    setSelectedId(id);
    setModalOpen(true);
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
        const item = mockInventory.find((entry) => entry.id === id);
        setModalItem(item || null);
      } else {
        // Use API
        const item = await fetchInventoryItem(id);
        setModalItem(item);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalItem(null);
  };

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Foundation Inventory Management System</h1>
          <p>You're viewing a prototype of a modern feature-forward inventory system that gets the basics right so that you and your team can spend more time working on your business, not fighting with software.</p>
        </div>
        <button type="button" className="secondary" onClick={handleRefresh} disabled={loading}>
          Refresh Data
        </button>
      </header>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'inventory' ? (
        <>
          <FiltersPanel
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
            options={filterOptions}
          />

          {error && <p className="app__error">{error}</p>}

          <KpiStrip items={inventory} />

          <main className="layout">
            <section className="layout__primary">
              {loading ? (
                <div className="loading">Loading inventory...</div>
              ) : (
                <InventoryTable
                  items={inventory}
                  meta={meta}
                  onSelect={handleOpenModal}
                  selectedId={selectedId}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
            <section className="layout__secondary">
              {detailLoading ? <div className="loading">Loading details...</div> : <InventoryDetail item={selectedItem} />}
            </section>
          </main>

          {modalOpen && <InventoryModal item={modalItem} onClose={handleCloseModal} />}

          <AdminPanel
            selectedItem={selectedItem}
            onUpdate={handleUpdate}
            onCreate={handleCreate}
            isBusy={adminBusy}
          />
        </>
      ) : (
        <AnalyticsView items={inventory} loading={loading} />
      )}

      <footer className="app__footer">
        <small>
          Prototype for in-house review. Data is fictional and resets on server restart.
        </small>
      </footer>
    </div>
  );
}
