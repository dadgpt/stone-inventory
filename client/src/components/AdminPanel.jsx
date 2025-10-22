import { useEffect, useState } from 'react';

const defaultForm = {
  id: '',
  name: '',
  location: '',
  type: 'Quartzite',
  status: 'In Stock',
  lot: '',
  availableSlabs: 0,
  priceTier: 'Performance',
};

export default function AdminPanel({ selectedItem, onUpdate, onCreate, isBusy }) {
  const [quickStatus, setQuickStatus] = useState(selectedItem?.status || '');
  const [quickNotes, setQuickNotes] = useState(selectedItem?.notes || '');
  const [createForm, setCreateForm] = useState(defaultForm);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setQuickStatus(selectedItem?.status || '');
    setQuickNotes(selectedItem?.notes || '');
  }, [selectedItem]);

  const resetCreateForm = () => setCreateForm(defaultForm);

  const handleQuickSubmit = async (event) => {
    event.preventDefault();
    if (!selectedItem) return;
    try {
      await onUpdate(selectedItem.id, {
        status: quickStatus,
        notes: quickNotes,
      });
      setFeedback({ type: 'success', message: 'Inventory updated.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...createForm,
        category: createForm.category || 'Natural Stone',
        availableSqFt: createForm.availableSlabs * 70,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await onCreate(payload);
      setFeedback({ type: 'success', message: 'New inventory item created.' });
      resetCreateForm();
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  };

  return (
    <section className="admin">
      <header>
        <h2>Admin Sandbox</h2>
        <p>Prototype tools for adding and managing slabs. Changes are in-memory only.</p>
      </header>

      {feedback && (
        <p className={`admin__feedback admin__feedback--${feedback.type}`}>{feedback.message}</p>
      )}

      <div className="admin__grid">
        <form className="card" onSubmit={handleQuickSubmit}>
          <h3>Quick Update</h3>
          {selectedItem ? (
            <>
              <p className="admin__muted">Updating <strong>{selectedItem.name}</strong> ({selectedItem.id})</p>
              <label>
                Status
                <select value={quickStatus} onChange={(event) => setQuickStatus(event.target.value)}>
                  {['In Stock', 'Reserved', 'Low Stock', 'Out of Stock'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Internal Notes
                <textarea
                  rows="3"
                  value={quickNotes}
                  onChange={(event) => setQuickNotes(event.target.value)}
                  placeholder="Add context for sales or yard teams"
                />
              </label>
              <button type="submit" disabled={isBusy}>
                Save Changes
              </button>
            </>
          ) : (
            <p className="admin__muted">Select a slab to enable quick updates.</p>
          )}
        </form>

        <form className="card" onSubmit={handleCreateSubmit}>
          <h3>Add New Slab</h3>
          <label>
            Inventory ID
            <input
              required
              value={createForm.id}
              onChange={(event) => setCreateForm({ ...createForm, id: event.target.value })}
              placeholder="e.g. INV-200"
            />
          </label>
          <label>
            Name
            <input
              required
              value={createForm.name}
              onChange={(event) => setCreateForm({ ...createForm, name: event.target.value })}
              placeholder="Stone name"
            />
          </label>
          <label>
            Lot Number
            <input
              value={createForm.lot}
              onChange={(event) => setCreateForm({ ...createForm, lot: event.target.value })}
              placeholder="LOT-XYZ"
            />
          </label>
          <label>
            Location
            <input
              value={createForm.location}
              onChange={(event) => setCreateForm({ ...createForm, location: event.target.value })}
              placeholder="Charleston"
            />
          </label>
          <label>
            Material Type
            <input
              value={createForm.type}
              onChange={(event) => setCreateForm({ ...createForm, type: event.target.value })}
              placeholder="Quartzite"
            />
          </label>
          <label>
            Status
            <select
              value={createForm.status}
              onChange={(event) => setCreateForm({ ...createForm, status: event.target.value })}
            >
              {['In Stock', 'Reserved', 'Low Stock', 'Out of Stock'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Available Slabs
            <input
              type="number"
              min="0"
              value={createForm.availableSlabs}
              onChange={(event) => setCreateForm({ ...createForm, availableSlabs: Number(event.target.value) })}
            />
          </label>
          <label>
            Price Tier
            <input
              value={createForm.priceTier}
              onChange={(event) => setCreateForm({ ...createForm, priceTier: event.target.value })}
              placeholder="Signature"
            />
          </label>
          <button type="submit" disabled={isBusy}>
            Create Item
          </button>
        </form>
      </div>
    </section>
  );
}
