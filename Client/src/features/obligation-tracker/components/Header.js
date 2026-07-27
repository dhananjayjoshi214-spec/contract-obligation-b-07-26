import { useState } from 'react'

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'warning', title: 'Contract Expiring', body: 'Commercial Lease — HQ Tower A expires in 28 days.', time: '5 min ago', unread: true },
  { id: 2, type: 'overdue', title: 'Overdue Obligation', body: 'Annual Insurance Certificate Renewal is 3 days overdue.', time: '1 hr ago', unread: true },
  { id: 3, type: 'info', title: 'Approval Required', body: 'Legal Advisory Consulting Agreement needs your signature.', time: '2 hrs ago', unread: true },
  { id: 4, type: 'success', title: 'Obligation Completed', body: 'Q2 Lease Payment submitted successfully.', time: '4 hrs ago', unread: false },
  { id: 5, type: 'warning', title: 'Renewal Reminder', body: 'Enterprise SaaS License — Salesforce renews in 45 days.', time: '1 day ago', unread: false },
]

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="header">
      <div className="header-title-block">
        <h1>Obligation Tracker</h1>
        <p>June 3, 2024</p>
      </div>

      <div className={`header-search ${searchFocused ? 'header-search-focused' : ''}`}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search contracts, obligations"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className="header-right">
        <div className="notif-wrapper">
          <button className="bell-wrapper bell-button" onClick={() => setNotifOpen((v) => !v)}>
            <BellIcon />
            {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="notif-panel">
              <div className="notif-panel-header">
                <span>Notifications</span>
                <div className="notif-panel-actions">
                  <button
                    className="notif-link"
                    onClick={() => setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })))}
                  >
                    Mark all read
                  </button>
                  <button className="notif-close" onClick={() => setNotifOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <NotificationIcon type={n.type} />
                    <div className="notif-item-body">
                      <p className="notif-item-title">{n.title}</p>
                      <p className="notif-item-text">{n.body}</p>
                      <p className="notif-item-time">{n.time}</p>
                    </div>
                    {n.unread && <span className="notif-dot" />}
                  </div>
                ))}
              </div>

              <div className="notif-panel-footer">
                <button className="notif-link">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="user-block">
          <div className="avatar avatar-blue">SC</div>
          <div className="user-name-role">
            <span className="user-name">Sarah Chen</span>
            <span className="role-pill">Legal Manager</span>
          </div>
        </div>

        <LogoutIcon />
      </div>
    </header>
  )
}

function NotificationIcon({ type }) {
  if (type === 'warning') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" className="notif-icon">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  }
  if (type === 'overdue') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="notif-icon">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  }
  if (type === 'success') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="notif-icon">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="notif-icon">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
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

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#9ca3af' }}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
