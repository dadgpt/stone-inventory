export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="tab-navigation">
      <button
        className={`tab-navigation__tab ${activeTab === 'inventory' ? 'tab-navigation__tab--active' : ''}`}
        onClick={() => onTabChange('inventory')}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Inventory
      </button>
      <button
        className={`tab-navigation__tab ${activeTab === 'analytics' ? 'tab-navigation__tab--active' : ''}`}
        onClick={() => onTabChange('analytics')}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
        Analytics
      </button>
    </nav>
  );
}
