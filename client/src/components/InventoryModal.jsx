import { useEffect } from 'react';
import { getImageUrl } from '../utils/api';

function formatNumber(value) {
  if (value === null || value === undefined) return '—';
  return Number(value).toLocaleString();
}

export default function InventoryModal({ item, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!item) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal__header">
          <div>
            <h2>{item.name}</h2>
            <p className="modal__subtitle">
              {item.lot} • {item.origin}
            </p>
          </div>
          <div className="modal__header-actions">
            <a
              href={`https://inventory.agmimports.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal__live-link"
              title="View on live inventory site"
            >
              View Live Site →
            </a>
            <button
              type="button"
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="modal__content">
          {/* Image Gallery */}
          {item.images && item.images.length > 0 && (
            <section className="modal__gallery">
              <h3 className="modal__section-title">Images</h3>
              <div className="modal__images">
                {item.images.map((img, idx) => (
                  <figure key={idx} className="modal__image-container">
                    <img
                      src={getImageUrl(img)}
                      alt={`${item.name} - View ${idx + 1}`}
                      className="modal__image"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Product Details */}
          <section className="modal__section">
            <h3 className="modal__section-title">Product Details</h3>
            <dl className="modal__details">
              <div className="modal__detail-item">
                <dt>Type</dt>
                <dd>{item.type}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Category</dt>
                <dd>{item.category}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Finish</dt>
                <dd>{item.finish || '—'}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Thickness</dt>
                <dd>{item.thicknessCm ? `${item.thicknessCm} cm` : '—'}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Color Family</dt>
                <dd>
                  {item.colorFamily && item.colorFamily.length > 0
                    ? item.colorFamily.join(', ')
                    : '—'}
                </dd>
              </div>
              <div className="modal__detail-item">
                <dt>Origin</dt>
                <dd>{item.origin}</dd>
              </div>
            </dl>
          </section>

          {/* Inventory Details */}
          <section className="modal__section">
            <h3 className="modal__section-title">Inventory</h3>
            <dl className="modal__details">
              <div className="modal__detail-item">
                <dt>Location</dt>
                <dd>{item.location}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Status</dt>
                <dd>
                  <span className={`status status--${(item.status || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status || 'Unknown'}
                  </span>
                </dd>
              </div>
              <div className="modal__detail-item">
                <dt>Available Slabs</dt>
                <dd>{formatNumber(item.availableSlabs)}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Total Sq Ft</dt>
                <dd>{formatNumber(item.availableSqFt)}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Avg Length</dt>
                <dd>{item.avgLengthIn ? `${formatNumber(item.avgLengthIn)}″` : '—'}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Avg Width</dt>
                <dd>{item.avgWidthIn ? `${formatNumber(item.avgWidthIn)}″` : '—'}</dd>
              </div>
              <div className="modal__detail-item">
                <dt>Price Tier</dt>
                <dd>{item.priceTier || '—'}</dd>
              </div>
            </dl>
          </section>

          {/* Notes */}
          {item.notes && (
            <section className="modal__section">
              <h3 className="modal__section-title">Notes</h3>
              <p className="modal__notes">{item.notes}</p>
            </section>
          )}

          {/* Metadata */}
          <section className="modal__section modal__metadata">
            <div className="modal__meta-item">
              <span className="modal__meta-label">Created:</span>{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div className="modal__meta-item">
              <span className="modal__meta-label">Updated:</span>{' '}
              {new Date(item.updatedAt).toLocaleDateString()}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
