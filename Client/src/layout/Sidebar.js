import { FileText, LayoutGrid, ShieldCheck, ClipboardCheck, RefreshCw, BarChart3, Bell, ChevronLeft } from "lucide-react";

const WORKSPACE_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Compliance", icon: ShieldCheck },
  { label: "Contract Repository", icon: FileText,  active: true },
  { label: "Obligation Tracker", icon: ClipboardCheck },
];

const RENEWAL_ITEMS = [{ label: "Renewal Management", icon: RefreshCw }];
const REPORT_ITEMS = [{ label: "Reports & Export", icon: BarChart3 }];
const TOOL_ITEMS = [{ label: "Notification Center", icon: Bell }];

function NavGroup({ title, items }) {
  return (
    <div className="mb-5">
      <p className="px-3 mb-1.5 text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider">{title}</p>
      {items.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
            active ? "bg-primary text-primary-foreground" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"
          }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
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
