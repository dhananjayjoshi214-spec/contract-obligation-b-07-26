import { FileText, LayoutGrid, ShieldCheck, ClipboardCheck, RefreshCw, BarChart3, Bell, ChevronLeft } from "lucide-react";

const WORKSPACE_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Compliance", icon: ShieldCheck },
  { label: "Contract Repository", icon: FileText },
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

export function Sidebar({ userName = "Sarah Chen", userRole = "Legal Manager" }) {
  return (
    <aside className="w-60 bg-sidebar flex flex-col p-3 flex-shrink-0 min-h-screen">
      <div className="flex items-center gap-2 px-2 py-3 mb-2">
        <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
          <FileText size={15} className="text-white" />
        </div>
        <span className="text-sidebar-foreground font-bold text-sm">ContractIQ</span>
      </div>

      <div className="px-3 py-2 mb-4 border-b border-sidebar-border">
        <p className="text-[10px] text-sidebar-muted uppercase tracking-wider mb-1">Signed in as</p>
        <p className="text-sm text-sidebar-foreground font-semibold">{userName}</p>
        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-semibold rounded">
          {userRole}
        </span>
      </div>

      <NavGroup title="Workspace" items={WORKSPACE_ITEMS} />
      <NavGroup title="Renewals" items={RENEWAL_ITEMS} />
      <NavGroup title="Reports" items={REPORT_ITEMS} />
      <NavGroup title="Tools" items={TOOL_ITEMS} />

      <div className="mt-auto pt-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground transition-colors">
          <ChevronLeft size={14} />
          Collapse sidebar
        </button>
      </div>
    </aside>
  );
}
