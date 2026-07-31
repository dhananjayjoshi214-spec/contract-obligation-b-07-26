import { useState, useEffect } from 'react'

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then(setNotifications)
      .catch(() => setNotifications([]))
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllRead = () => {
    fetch('/api/notifications/mark-all-read', { method: 'PATCH' }).then(() =>
      setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })))
    )
  }

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
                  <button className="notif-link" onClick={markAllRead}>
                    Mark all read
                  </button>
                  <button className="notif-close" onClick={() => setNotifOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="notif-list">
                {notifications.length === 0 && (
                  <p style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>No notifications yet.</p>
                )}
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
  const stroke = type === 'warning' ? '#f59e0b' : type === 'overdue' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" className="notif-icon">
      <circle cx="12" cy="12" r="10" />
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
  
            
              

       
    
  
     
