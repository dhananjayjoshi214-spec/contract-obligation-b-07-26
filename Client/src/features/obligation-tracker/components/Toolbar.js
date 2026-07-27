const DOT_ORDER = [
  { key: 'blue', label: 'blue' },
  { key: 'purple', label: 'purple' },
  { key: 'orange', label: 'orange' },
  { key: 'green', label: 'green' },
  { key: 'red', label: 'red' },
]

export default function Toolbar({
  view,
  onViewChange,
  search,
  onSearchChange,
  counts,
  onAddClick,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search obligations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="view-toggle">
          <button
            className={view === 'kanban' ? 'active' : ''}
            onClick={() => onViewChange('kanban')}
          >
            Kanban
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => onViewChange('list')}
          >
            List
          </button>
        </div>

        <div className="status-dots">
          {counts.map((c, i) => (
            <span className="status-dot" key={c.status}>
              <span className={`dot dot-${DOT_ORDER[i].key}`} />
              {c.count}
            </span>
          ))}
        </div>
      </div>

      <button className="add-obligation-btn" onClick={onAddClick}>
        <PlusIcon /> Add Obligation
      </button>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
