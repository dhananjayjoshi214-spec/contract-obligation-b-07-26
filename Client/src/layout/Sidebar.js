const icons = {
  renewals: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 3H15L19 7V21H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3V7H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13L11.5 16L15 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  repository: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 7H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 7L8 3H16L21 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  compliance: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L4 6V11C4 16.523 7.58172 20.9361 12 22C16.4183 20.9361 20 16.523 20 11V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12.5L11.5 14.5L15.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 8C18 5.23858 15.7614 3 13 3H11C8.23858 3 6 5.23858 6 8V13C6 14.0543 5.57857 15.0533 4.82843 15.8284L4 16.6569V17H20V16.6569L19.1716 15.8284C18.4214 15.0533 18 14.0543 18 13V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21C13.5544 21.3031 13.2978 21.5544 12.9874 21.7319C12.677 21.9094 12.3241 22.0062 11.9657 22.0124C11.6072 22.0186 11.2565 21.9334 10.9421 21.7631C10.6278 21.5928 10.3606 21.3424 10.1627 21.0335C9.96484 20.7246 9.84343 20.3642 9.80825 19.9931" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15C19.5147 14.3432 19.5147 13.6568 19.4 13M4.6 11C4.48528 11.6568 4.48528 12.3432 4.6 13M6.8 6.8L8.4 8.4M17.6 15.6L19.2 17.2M6.8 17.2L8.4 15.6M17.6 8.4L19.2 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Sidebar({ open, onToggle }) {
  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">CI</div>
        {open && <div className="brand-text">ContractIQ</div>}
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <span className="nav-icon">{icons.renewals}</span>
          {open && <span>Renewal Management</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">{icons.repository}</span>
          {open && <span>Contract Repository</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">{icons.compliance}</span>
          {open && <span>Compliance</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">{icons.notifications}</span>
          {open && <span>Notification Center</span>}
        </button>
        <button className="nav-item">
          <span className="nav-icon">{icons.admin}</span>
          {open && <span>Admin Panel</span>}
        </button>
      </nav>

      <button className="sidebar-toggle" onClick={onToggle}>
        {open ? 'Collapse Sidebar' : 'Expand Sidebar'}
      </button>
    </aside>
  )
}

export default Sidebar
