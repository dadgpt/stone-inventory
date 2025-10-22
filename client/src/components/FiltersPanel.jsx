import { useState } from 'react';

const fieldLabels = {
  search: 'Search',
  location: 'Location',
  type: 'Material Type',
  status: 'Status',
  tier: 'Price Tier',
  color: 'Color',
};

const EMPTY_VALUE = '';

export default function FiltersPanel({ filters, onChange, onReset, options = {} }) {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <section className="filters">
      <header className="filters__header">
        <h2>Inventory Filters</h2>
        <button type="button" className="filters__toggle" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? 'Hide' : 'Show'}
        </button>
      </header>
      {expanded && (
        <div className="filters__form">
          <div className="filters__field">
            <label htmlFor="filter-search">{fieldLabels.search}</label>
            <input
              id="filter-search"
              name="search"
              type="search"
              placeholder="Name, lot, location..."
              value={filters.search || ''}
              onChange={handleChange}
            />
          </div>

          <div className="filters__grid">
            {['location', 'type', 'status', 'tier', 'color'].map((field) => {
              const values = options[field] || [];
              return (
                <div className="filters__field" key={field}>
                  <label htmlFor={`filter-${field}`}>{fieldLabels[field]}</label>
                  <select
                    id={`filter-${field}`}
                    name={field}
                    value={filters[field] || EMPTY_VALUE}
                    onChange={handleChange}
                  >
                    <option value={EMPTY_VALUE}>All</option>
                    {values.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <div className="filters__actions">
            <button type="button" className="secondary" onClick={onReset}>
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
