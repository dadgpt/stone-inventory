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
import './App.css';

// Testing Vercel deployment trigger

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
        const response = await fetchInventory({ ...filters, page, pageSize: PAGE_SIZE });
        if (!isCancelled) {
          setInventory(response.data);
          setMeta(response.meta);
          if (!response.data.some((item) => item.id === selectedId)) {
            setSelectedId(response.data[0]?.id || null);
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
  }, [filters, page, refreshKey]);

  useEffect(() => {
    let isCancelled = false;
    async function loadDetail() {
      if (!selectedId) {
        setSelectedItem(null);
        return;
      }
      setDetailLoading(true);
      try {
        const item = await fetchInventoryItem(selectedId);
        if (!isCancelled) {
          setSelectedItem(item);
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
      const item = await fetchInventoryItem(id);
      setModalItem(item);
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
          <h1>Stone Inventory Prototype</h1>
          <p>React + Node sandbox demonstrating catalog search, detail, and admin flows.</p>
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
