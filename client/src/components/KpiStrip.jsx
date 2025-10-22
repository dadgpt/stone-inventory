function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export default function KpiStrip({ items = [] }) {
  if (!items.length) {
    return null;
  }

  const totals = items.reduce(
    (acc, item) => {
      acc.slabs += toNumber(item.availableSlabs);
      acc.squareFeet += toNumber(item.availableSqFt);
      acc.locations.add(item.location);
      acc.types.add(item.type);
      return acc;
    },
    { slabs: 0, squareFeet: 0, locations: new Set(), types: new Set() }
  );

  const metrics = [
    { label: 'Visible Slabs', value: totals.slabs.toLocaleString() },
    { label: 'Visible Sq Ft', value: totals.squareFeet.toLocaleString() },
    { label: 'Locations', value: totals.locations.size },
    { label: 'Material Types', value: totals.types.size },
  ];

  return (
    <section className="kpis">
      {metrics.map((metric) => (
        <article key={metric.label}>
          <h4>{metric.label}</h4>
          <p>{metric.value}</p>
        </article>
      ))}
    </section>
  );
}
