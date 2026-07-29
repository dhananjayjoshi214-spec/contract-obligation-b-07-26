import { useState } from 'react'

const NAV_SECTIONS = [
  {
    label: 'WORKSPACE',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
      { key: 'compliance', label: 'Compliance', icon: 'shield' },
      { key: 'contracts', label: 'Contract Repository', icon: 'folder' },
      { key: 'obligations', label: 'Obligation Tracker', icon: 'check-square' },
    ],
  },
  {
    label: 'RENEWALS',
    items: [{ key: 'renewals', label: 'Renewal Management', icon: 'calendar' }],
  },
  {
    label: 'REPORTS',
    items: [{ key: 'reports', label: 'Reports & Export', icon: 'file-text' }],
  },
]

export default function Sidebar({ activeKey = 'obligations' }) {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <aside className="sidebar sidebar-collapsed">
        <button className="sidebar-collapse-btn" onClick={() => setCollapsed(false)}>
          <ChevronIcon direction="right" />
        </button>
      </aside>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">
          <DocIcon />
        </span>
        <span className="sidebar-logo-text">ContractIQ</span>
      </div>

      <div className="sidebar-user">
        <span className="sidebar-user-label">SIGNED IN AS</span>
        <span className="sidebar-user-name">Sarah Chen</span>
        <span className="sidebar-user-role">Legal Manager</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => (
          <div className="sidebar-section" key={section.label}>
            <span className="sidebar-section-label">{section.label}</span>
            {section.items.map((item) => (
              <button
                key={item.key}
                className={`sidebar-nav-item ${activeKey === item.key ? 'active' : ''}`}
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-collapse-link" onClick={() => setCollapsed(true)}>
          <ChevronIcon direction="left" /> Collapse sidebar
        </button>
      </div>
    </aside>
  )
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function ChevronIcon({ direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

function NavIcon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
  switch (name) {
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...common}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z" />
        </svg>
      )
    case 'check-square':
      return (
        <svg {...common}>
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    case 'file-text':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
      )
    default:
      return null
  }
}
