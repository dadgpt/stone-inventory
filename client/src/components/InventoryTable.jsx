import { getImageUrl } from '../utils/api';

function formatNumber(value) {
  if (value === null || value === undefined) return '�';
  return Number(value).toLocaleString();
}

export default function InventoryTable({ items = [], meta, onSelect, selectedId, onPageChange }) {
  return (
    <div className="inventory-table">
      <table>
        <thead>
          <tr>
            <th scope="col" style={{ width: '80px' }}>Image</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Finish</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
            <th scope="col">Slabs</th>
            <th scope="col">Sq Ft</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="8" className="inventory-table__empty">
                No inventory matches the current filters.
              </td>
            </tr>
          )}
          {items.map((item) => {
            const thumbnail = item.images && item.images.length > 0 ? item.images[0] : null;
            return (
              <tr
                key={item.id}
                className={item.id === selectedId ? 'is-selected' : ''}
                onClick={() => onSelect(item.id)}
              >
                <td>
                  {thumbnail ? (
                    <img
                      src={getImageUrl(thumbnail)}
                      alt={item.name}
                      className="inventory-table__thumbnail"
                    />
                  ) : (
                    <div className="inventory-table__thumbnail inventory-table__thumbnail--empty">
                      <span>No image</span>
                    </div>
                  )}
                </td>
                <td>
                  <span className="inventory-table__name">{item.name}</span>
                  <span className="inventory-table__lot">{item.lot}</span>
                  {item.colorFamily && item.colorFamily.length > 0 && (
                    <span className="inventory-table__colors">
                      {item.colorFamily.join(', ')}
                    </span>
                  )}
                </td>
                <td>{item.type}</td>
                <td>{item.finish || '—'}</td>
                <td>{item.location}</td>
                <td>
                  <span className={`status status--${(item.status || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status || 'Unknown'}
                  </span>
                </td>
                <td>{formatNumber(item.availableSlabs)}</td>
                <td>{formatNumber(item.availableSqFt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {meta && meta.total > meta.pageSize && (
        <nav className="pagination" aria-label="Inventory navigation">
          <button
            type="button"
            className="secondary"
            onClick={() => onPageChange(meta.page - 1)}
            disabled={meta.page <= 1}
          >
            Previous
          </button>
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <button
            type="button"
            className="secondary"
            onClick={() => onPageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
