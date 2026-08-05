function Navbar({ onToggle, onSearchChange, notifications = [], onToggleNotifications }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="toggle-button" onClick={onToggle} aria-label="Toggle sidebar">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="topbar-title-group">
          <p className="page-tag">Renewal Management</p>
          <h2>Contract Obligation Tracker</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <input placeholder="Search contracts, obligations" onChange={e => onSearchChange?.(e.target.value)} />
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={onToggleNotifications} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Notifications">
            <div style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 8C18 5.23858 15.7614 3 13 3H11C8.23858 3 6 5.23858 6 8V13C6 14.0543 5.57857 15.0533 4.82843 15.8284L4 16.6569V17H20V16.6569L19.1716 15.8284C18.4214 15.0533 18 14.0543 18 13V8Z" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', right: -6, top: -6, background: '#ef4444', color: '#fff', borderRadius: 999, padding: '2px 6px', fontSize: 11 }}>{notifications.length}</span>
              )}
            </div>
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">SC</div>
          <div className="profile-details">
            <div className="profile-name">Sarah Chen</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
