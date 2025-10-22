import { getImageUrl } from '../utils/api';

const placeholderImage = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60';

function Gallery({ images = [] }) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="detail__gallery">
      {images.map((imagePath, index) => (
        <figure key={imagePath || index}>
          <img
            src={getImageUrl(imagePath)}
            alt={`Product view ${index + 1}`}
            onError={(event) => {
              event.currentTarget.src = placeholderImage;
            }}
          />
        </figure>
      ))}
    </div>
  );
}

export default function InventoryDetail({ item }) {
  if (!item) {
    return (
      <aside className="detail detail--empty">
        <h2>Inventory detail</h2>
        <p>Select a slab to view specifications, imagery, and notes.</p>
      </aside>
    );
  }

  return (
    <aside className="detail">
      <header>
        <h2>{item.name}</h2>
        <p className="detail__meta">
          {item.type} • {item.location} • Lot {item.lot}
        </p>
      </header>

      <Gallery images={item.images} />

      <section className="detail__section">
        <h3>Material Overview</h3>
        <dl>
          <div>
            <dt>Type</dt>
            <dd>{item.type}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{item.category}</dd>
          </div>
          <div>
            <dt>Subcategory</dt>
            <dd>{item.subcategory || '—'}</dd>
          </div>
          <div>
            <dt>Thickness</dt>
            <dd>{item.thicknessCm ? `${item.thicknessCm} cm` : '—'}</dd>
          </div>
          <div>
            <dt>Finish</dt>
            <dd>{item.finish || '—'}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{item.origin || '—'}</dd>
          </div>
          <div>
            <dt>Color Family</dt>
            <dd>{item.colorFamily?.join(', ') || '—'}</dd>
          </div>
          <div>
            <dt>Price Tier</dt>
            <dd>{item.priceTier || '—'}</dd>
          </div>
        </dl>
      </section>

      <section className="detail__section">
        <h3>Inventory Metrics</h3>
        <dl>
          <div>
            <dt>Available Slabs</dt>
            <dd>{item.availableSlabs ?? '—'}</dd>
          </div>
          <div>
            <dt>Available Sq Ft</dt>
            <dd>{item.availableSqFt ?? '—'}</dd>
          </div>
          <div>
            <dt>Avg. Length</dt>
            <dd>{item.avgLengthIn ? `${item.avgLengthIn}"` : '—'}</dd>
          </div>
          <div>
            <dt>Avg. Width</dt>
            <dd>{item.avgWidthIn ? `${item.avgWidthIn}"` : '—'}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{item.status || '—'}</dd>
          </div>
        </dl>
      </section>

      <section className="detail__section">
        <h3>Notes</h3>
        <p>{item.notes || 'No internal notes yet.'}</p>
      </section>

      <footer className="detail__footer">
        <small>
          Last updated {new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleString()}
        </small>
      </footer>
    </aside>
  );
}
