import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function formatNumber(value) {
  if (value === null || value === undefined) return '0';
  return Number(value).toLocaleString();
}

function calculateEngagementRate(clicks, views) {
  if (!views || views === 0) return 0;
  return ((clicks / views) * 100).toFixed(1);
}

const LOCATION_COLORS = {
  'Hardeeville': '#3b82f6',
  'Raleigh': '#8b5cf6',
  'Charlotte': '#ec4899',
  'Charleston': '#f59e0b',
  'Atlanta': '#10b981'
};

export default function AnalyticsView({ items = [], loading }) {
  const [sortColumn, setSortColumn] = useState('views');
  const [sortDirection, setSortDirection] = useState('desc');
  const [subTab, setSubTab] = useState('slabs');

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  const totalViews = items.reduce((sum, item) => sum + (item.analytics?.views || 0), 0);
  const totalSearches = items.reduce((sum, item) => sum + (item.analytics?.searchAppearances || 0), 0);
  const totalClicks = items.reduce((sum, item) => sum + (item.analytics?.clicks || 0), 0);
  const totalShares = items.reduce((sum, item) => sum + (item.analytics?.shares || 0), 0);
  const overallEngagement = calculateEngagementRate(totalClicks, totalViews);

  // Location roll-up
  const locationStats = items.reduce((acc, item) => {
    const location = item.location;
    if (!acc[location]) {
      acc[location] = {
        location,
        products: 0,
        views: 0,
        searchAppearances: 0,
        clicks: 0,
        shares: 0,
      };
    }
    acc[location].products += 1;
    acc[location].views += item.analytics?.views || 0;
    acc[location].searchAppearances += item.analytics?.searchAppearances || 0;
    acc[location].clicks += item.analytics?.clicks || 0;
    acc[location].shares += item.analytics?.shares || 0;
    return acc;
  }, {});

  // Investment amounts per location (in dollars)
  const locationInvestments = {
    'Hardeeville': 1000,
    'Raleigh': 1000,
    'Charlotte': 1000,
    'Charleston': 1000,
    'Atlanta': 1000
  };

  const locationData = Object.values(locationStats).map(loc => {
    const investment = locationInvestments[loc.location] || 1000;
    const engagement = calculateEngagementRate(loc.clicks, loc.views);
    return {
      ...loc,
      investment,
      engagement,
      viewsPerDollar: (loc.views / investment).toFixed(2),
      clicksPerDollar: (loc.clicks / investment).toFixed(2),
      engagementPerDollar: (parseFloat(engagement) / (investment / 100)).toFixed(2)
    };
  });

  // Location insights for dashboard
  const topLocationByViews = locationData.reduce((max, loc) => loc.views > max.views ? loc : max, locationData[0] || {});
  const topLocationByEngagement = locationData.reduce((max, loc) => parseFloat(loc.engagement) > parseFloat(max.engagement) ? loc : max, locationData[0] || {});
  const topLocationByProducts = locationData.reduce((max, loc) => loc.products > max.products ? loc : max, locationData[0] || {});
  const topLocationByROI = locationData.reduce((max, loc) => parseFloat(loc.viewsPerDollar) > parseFloat(max.viewsPerDollar) ? loc : max, locationData[0] || {});
  const avgProductsPerLocation = locationData.reduce((sum, loc) => sum + loc.products, 0) / locationData.length;
  const totalInvestment = locationData.reduce((sum, loc) => sum + loc.investment, 0);

  // Chart data
  const pieDataProducts = locationData.map(loc => ({
    name: loc.location,
    value: loc.products
  }));

  const pieDataViews = locationData.map(loc => ({
    name: loc.location,
    value: loc.views
  }));

  const barDataEngagement = locationData.map(loc => ({
    location: loc.location,
    'Investment ($)': loc.investment,
    'Engagement (%)': parseFloat(loc.engagement)
  }));

  const barDataActivity = locationData.map(loc => ({
    location: loc.location,
    views: loc.views,
    clicks: loc.clicks,
    searches: loc.searchAppearances
  }));

  const barDataROI = locationData.map(loc => ({
    location: loc.location,
    'Investment ($)': loc.investment,
    'Views per $': parseFloat(loc.viewsPerDollar),
    'Clicks per $': parseFloat(loc.clicksPerDollar)
  }));

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    let aValue, bValue;

    switch (sortColumn) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      case 'location':
        aValue = a.location.toLowerCase();
        bValue = b.location.toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      case 'views':
        aValue = a.analytics?.views || 0;
        bValue = b.analytics?.views || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'searches':
        aValue = a.analytics?.searchAppearances || 0;
        bValue = b.analytics?.searchAppearances || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'clicks':
        aValue = a.analytics?.clicks || 0;
        bValue = b.analytics?.clicks || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'shares':
        aValue = a.analytics?.shares || 0;
        bValue = b.analytics?.shares || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'engagement':
        aValue = calculateEngagementRate(a.analytics?.clicks || 0, a.analytics?.views || 0);
        bValue = calculateEngagementRate(b.analytics?.clicks || 0, b.analytics?.views || 0);
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      default:
        return 0;
    }
  });

  const sortedLocations = [...locationData].sort((a, b) => {
    let aValue, bValue;

    switch (sortColumn) {
      case 'location':
        aValue = a.location.toLowerCase();
        bValue = b.location.toLowerCase();
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      case 'products':
        aValue = a.products || 0;
        bValue = b.products || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'investment':
        aValue = a.investment || 0;
        bValue = b.investment || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'views':
        aValue = a.views || 0;
        bValue = b.views || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'searches':
        aValue = a.searchAppearances || 0;
        bValue = b.searchAppearances || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'clicks':
        aValue = a.clicks || 0;
        bValue = b.clicks || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'shares':
        aValue = a.shares || 0;
        bValue = b.shares || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'engagement':
        aValue = parseFloat(a.engagement) || 0;
        bValue = parseFloat(b.engagement) || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      case 'roi':
        aValue = parseFloat(a.viewsPerDollar) || 0;
        bValue = parseFloat(b.viewsPerDollar) || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      default:
        return 0;
    }
  });

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return (
        <svg className="sort-icon sort-icon--inactive" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="sort-icon sort-icon--active" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ) : (
      <svg className="sort-icon sort-icon--active" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="analytics-view">
      {/* Summary Cards */}
      <div className="analytics-summary">
        <article className="analytics-card">
          <div className="analytics-card__icon analytics-card__icon--views">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="analytics-card__content">
            <h3>Total Views</h3>
            <p className="analytics-card__value">{formatNumber(totalViews)}</p>
            <span className="analytics-card__label">Product detail page views</span>
          </div>
        </article>

        <article className="analytics-card">
          <div className="analytics-card__icon analytics-card__icon--searches">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div className="analytics-card__content">
            <h3>Search Appearances</h3>
            <p className="analytics-card__value">{formatNumber(totalSearches)}</p>
            <span className="analytics-card__label">Times shown in results</span>
          </div>
        </article>

        <article className="analytics-card">
          <div className="analytics-card__icon analytics-card__icon--clicks">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div className="analytics-card__content">
            <h3>Total Clicks</h3>
            <p className="analytics-card__value">{formatNumber(totalClicks)}</p>
            <span className="analytics-card__label">Click-through events</span>
          </div>
        </article>

        <article className="analytics-card">
          <div className="analytics-card__icon analytics-card__icon--shares">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
          </div>
          <div className="analytics-card__content">
            <h3>Total Shares</h3>
            <p className="analytics-card__value">{formatNumber(totalShares)}</p>
            <span className="analytics-card__label">Social shares & forwards</span>
          </div>
        </article>

        <article className="analytics-card analytics-card--highlight">
          <div className="analytics-card__icon analytics-card__icon--engagement">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="analytics-card__content">
            <h3>Engagement Rate</h3>
            <p className="analytics-card__value">{overallEngagement}%</p>
            <span className="analytics-card__label">Clicks per view</span>
          </div>
        </article>
      </div>

      {/* Sub-tab Navigation */}
      <div className="analytics-subtabs">
        <button
          className={`analytics-subtab ${subTab === 'slabs' ? 'analytics-subtab--active' : ''}`}
          onClick={() => setSubTab('slabs')}
        >
          Slabs
        </button>
        <button
          className={`analytics-subtab ${subTab === 'locations' ? 'analytics-subtab--active' : ''}`}
          onClick={() => setSubTab('locations')}
        >
          Locations
        </button>
      </div>

      {/* Slabs Table */}
      {subTab === 'slabs' && (
        <div className="analytics-table-container">
          <h2 className="analytics-section-title">Product Performance</h2>
          <table className="analytics-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                <div className="sortable-header">
                  <span>Product Name</span>
                  <SortIcon column="name" />
                </div>
              </th>
              <th onClick={() => handleSort('type')}>
                <div className="sortable-header">
                  <span>Type</span>
                  <SortIcon column="type" />
                </div>
              </th>
              <th onClick={() => handleSort('location')}>
                <div className="sortable-header">
                  <span>Location</span>
                  <SortIcon column="location" />
                </div>
              </th>
              <th className="analytics-table__metric" onClick={() => handleSort('views')}>
                <div className="sortable-header">
                  <span>Views</span>
                  <SortIcon column="views" />
                </div>
              </th>
              <th className="analytics-table__metric" onClick={() => handleSort('searches')}>
                <div className="sortable-header">
                  <span>Searches</span>
                  <SortIcon column="searches" />
                </div>
              </th>
              <th className="analytics-table__metric" onClick={() => handleSort('clicks')}>
                <div className="sortable-header">
                  <span>Clicks</span>
                  <SortIcon column="clicks" />
                </div>
              </th>
              <th className="analytics-table__metric" onClick={() => handleSort('shares')}>
                <div className="sortable-header">
                  <span>Shares</span>
                  <SortIcon column="shares" />
                </div>
              </th>
              <th className="analytics-table__metric" onClick={() => handleSort('engagement')}>
                <div className="sortable-header">
                  <span>Engagement</span>
                  <SortIcon column="engagement" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => {
              const engagement = calculateEngagementRate(
                item.analytics?.clicks || 0,
                item.analytics?.views || 0
              );
              return (
                <tr key={item.id}>
                  <td className="analytics-table__name">{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.location}</td>
                  <td className="analytics-table__metric">{formatNumber(item.analytics?.views || 0)}</td>
                  <td className="analytics-table__metric">{formatNumber(item.analytics?.searchAppearances || 0)}</td>
                  <td className="analytics-table__metric">{formatNumber(item.analytics?.clicks || 0)}</td>
                  <td className="analytics-table__metric">{formatNumber(item.analytics?.shares || 0)}</td>
                  <td className="analytics-table__metric">
                    <span className={`engagement-badge engagement-badge--${
                      engagement > 60 ? 'high' : engagement > 40 ? 'medium' : 'low'
                    }`}>
                      {engagement}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}

      {/* Locations View */}
      {subTab === 'locations' && (
        <>
          {/* Total Investment Banner */}
          <div className="investment-banner">
            <div className="investment-banner__content">
              <div className="investment-banner__primary">
                <span className="investment-banner__label">Total Market Investment</span>
                <h2 className="investment-banner__value">${formatNumber(totalInvestment)}</h2>
              </div>
              <div className="investment-banner__secondary">
                <div className="investment-stat">
                  <span className="investment-stat__label">Markets</span>
                  <span className="investment-stat__value">{locationData.length}</span>
                </div>
                <div className="investment-stat">
                  <span className="investment-stat__label">Per Market</span>
                  <span className="investment-stat__value">${formatNumber(totalInvestment / locationData.length)}</span>
                </div>
                <div className="investment-stat">
                  <span className="investment-stat__label">Total Views</span>
                  <span className="investment-stat__value">{formatNumber(totalViews)}</span>
                </div>
                <div className="investment-stat">
                  <span className="investment-stat__label">Avg ROI</span>
                  <span className="investment-stat__value">{(totalViews / totalInvestment).toFixed(2)} views/$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Scorecards */}
          <div className="market-scorecards">
            {[...locationData]
              .sort((a, b) => {
                if (a.location === 'Hardeeville') return -1;
                if (b.location === 'Hardeeville') return 1;
                return a.location.localeCompare(b.location);
              })
              .map((location) => (
              <div key={location.location} className="market-card" style={{ borderLeftColor: LOCATION_COLORS[location.location] }}>
                <div className="market-card__header">
                  <h3 className="market-card__location">{location.location}</h3>
                  <div className="market-card__investment">
                    <span className="market-card__investment-label">Investment</span>
                    <span className="market-card__investment-value">${formatNumber(location.investment)}</span>
                  </div>
                </div>
                <div className="market-card__metrics">
                  <div className="market-metric">
                    <span className="market-metric__label">Views</span>
                    <span className="market-metric__value">{formatNumber(location.views)}</span>
                    <span className="market-metric__sub">{location.viewsPerDollar} per $</span>
                  </div>
                  <div className="market-metric">
                    <span className="market-metric__label">Clicks</span>
                    <span className="market-metric__value">{formatNumber(location.clicks)}</span>
                    <span className="market-metric__sub">{location.clicksPerDollar} per $</span>
                  </div>
                  <div className="market-metric">
                    <span className="market-metric__label">Products</span>
                    <span className="market-metric__value">{location.products}</span>
                    <span className="market-metric__sub">{location.engagement}% eng.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="location-charts">
            <div className="chart-container">
              <h3 className="chart-title">Inventory Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieDataProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={LOCATION_COLORS[entry.name] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} products`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3 className="chart-title">Views Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieDataViews}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataViews.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={LOCATION_COLORS[entry.name] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNumber(value) + ' views'} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container chart-container--wide">
              <h3 className="chart-title">Investment vs Engagement Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barDataEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis yAxisId="left" label={{ value: 'Investment ($)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Engagement (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'Engagement (%)') return `${value}%`;
                    return `$${formatNumber(value)}`;
                  }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Investment ($)" fill="#94a3b8" name="Investment ($)" />
                  <Bar yAxisId="right" dataKey="Engagement (%)" fill="#8b5cf6" name="Engagement (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container chart-container--wide">
              <h3 className="chart-title">Return on Investment Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barDataROI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis yAxisId="left" label={{ value: 'Investment ($)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Per Dollar', angle: 90, position: 'insideRight' }} />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'Investment ($)') return `$${formatNumber(value)}`;
                    return value;
                  }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Investment ($)" fill="#94a3b8" name="Investment ($)" />
                  <Bar yAxisId="right" dataKey="Views per $" fill="#3b82f6" name="Views per $" />
                  <Bar yAxisId="right" dataKey="Clicks per $" fill="#10b981" name="Clicks per $" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location Performance Table */}
          <div className="analytics-table-container">
            <h2 className="analytics-section-title">Detailed Location Metrics</h2>
            <table className="analytics-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('location')}>
                  <div className="sortable-header">
                    <span>Location</span>
                    <SortIcon column="location" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('investment')}>
                  <div className="sortable-header">
                    <span>Investment</span>
                    <SortIcon column="investment" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('products')}>
                  <div className="sortable-header">
                    <span>Products</span>
                    <SortIcon column="products" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('views')}>
                  <div className="sortable-header">
                    <span>Views</span>
                    <SortIcon column="views" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('clicks')}>
                  <div className="sortable-header">
                    <span>Clicks</span>
                    <SortIcon column="clicks" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('engagement')}>
                  <div className="sortable-header">
                    <span>Engagement</span>
                    <SortIcon column="engagement" />
                  </div>
                </th>
                <th className="analytics-table__metric" onClick={() => handleSort('roi')}>
                  <div className="sortable-header">
                    <span>Views/$</span>
                    <SortIcon column="roi" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLocations.map((location) => (
                <tr key={location.location}>
                  <td className="analytics-table__name">{location.location}</td>
                  <td className="analytics-table__metric">${formatNumber(location.investment)}</td>
                  <td className="analytics-table__metric">{formatNumber(location.products)}</td>
                  <td className="analytics-table__metric">{formatNumber(location.views)}</td>
                  <td className="analytics-table__metric">{formatNumber(location.clicks)}</td>
                  <td className="analytics-table__metric">
                    <span className={`engagement-badge engagement-badge--${
                      location.engagement > 60 ? 'high' : location.engagement > 40 ? 'medium' : 'low'
                    }`}>
                      {location.engagement}%
                    </span>
                  </td>
                  <td className="analytics-table__metric">
                    <span className="roi-value">{location.viewsPerDollar}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
