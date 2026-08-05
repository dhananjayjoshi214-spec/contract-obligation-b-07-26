import { useState, useEffect } from "react";
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, Shield, Users, LayoutDashboard, CheckSquare, Settings, Bell, Search, LogOut, X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, Download, Plus, Eye, Edit, Activity, Lock, Mail, ChevronLeft, ChevronRight, Database, RefreshCw, Globe, Info, AlertCircle, Archive, Paperclip, Flag, Star, EyeOff, Phone, Building2, UserCheck, KeyRound, ShieldAlert, ShieldCheck, ShieldX, Clock, ArrowRight, CheckCircle2, XCircle, LogIn, RotateCcw, Hourglass, BellRing, ClipboardList, BarChart2, Send, Filter, SortAsc, Trash2, Copy, MessageSquare, ThumbsUp, ThumbsDown, FileCheck, Timer, Layers, CalendarDays, CalendarCheck, CalendarX, CalendarClock, Repeat2, Zap, Hash, FileBarChart, FileSpreadsheet, FilePieChart, MapPin, UserCog, Monitor, UserPlus, Fingerprint, Ban } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AddRenewalModal from "./components/AddRenewalModal.js";

// ── LIVE DATA CONTAINERS ──────────────────────────────────────────────────
let CONTRACTS = [];
let OBLIGATIONS = [];
let USERS = [];
let CONTRACT_ACTIVITY = [];
let DEPT_COMPLIANCE = [];
let CONTRACT_TYPES_PIE = [];
let RISK_TREND = [];
let ACTIVITY_LOG = [];
let NOTIFICATIONS = [];
let RENEWALS = [];
let RENEWAL_TREND = [];
let RENEWAL_STATUS_PIE = [];
let REMINDER_TEMPLATES = [];
let APPROVAL_STEPS = [];
let RENEWAL_HISTORY = [];
let CALENDAR_EVENTS = [];
let RENEWAL_MGMT_DATA = [];
let MGMT_WORKFLOW_STEPS = [];
let MGMT_ACTIVITIES = [];
let MGMT_HISTORY = [];
let MGMT_REMINDER_CONFIG = [];
let MGMT_TREND = [];
let MGMT_STATUS_PIE = [];
let MGMT_CALENDAR_EVENTS = {};
let RPT_CONTRACT_TABLE = [];
let RPT_COMPLIANCE_TABLE = [];
let RPT_RENEWAL_TABLE = [];
let RPT_OBLIGATION_TABLE = [];
let RPT_AUDIT_TABLE = [];
let RPT_RECENT_REPORTS = [];
let RPT_CONTRACT_STATUS_PIE = [];
let RPT_DEPT_BAR = [];
let RPT_COMPLIANCE_TREND = [];
let RPT_RENEWAL_MONTHLY = [];
let RPT_OBL_DONUT = [];
let RPT_AUDIT_DAILY = [];
let UM_USERS = [];
let UM_ROLES = [];
let UM_PERMISSION_MATRIX = [];
let UM_ACTIVITY_LOG = [];
let UM_SESSIONS = [];

// ── Helpers ────────────────────────────────────────────────────────────────
function Badge({ variant, children }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    danger: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    info: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
    neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-400/20",
    purple: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20",
    orange: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20"
  };
  return /*#__PURE__*/_jsx("span", {
    className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono whitespace-nowrap ${styles[variant]}`,
    children: children
  });
}
function statusBadge(status) {
  const map = {
    "Active": "success", "Expiring Soon": "warning", "Under Review": "info",
    "Draft": "neutral", "Terminated": "danger", "Pending": "info",
    "In Progress": "purple", "Completed": "success", "Overdue": "danger"
  };
  return /*#__PURE__*/_jsx(Badge, { variant: map[status] || "neutral", children: status });
}
function priorityBadge(priority) {
  const map = { "Critical": "danger", "High": "warning", "Medium": "info", "Low": "neutral" };
  return /*#__PURE__*/_jsx(Badge, { variant: map[priority] || "neutral", children: priority });
}
function renewalStatusBadge(status) {
  const map = {
    "Renewed": "success", "Upcoming": "warning", "Due Soon": "orange",
    "Expired": "danger", "In Progress": "info", "Cancelled": "neutral", "Pending Review": "purple"
  };
  return /*#__PURE__*/_jsx(Badge, { variant: map[status] || "neutral", children: status });
}
function CountdownTimer({ days }) {
  if (days < 0) return /*#__PURE__*/_jsxs("span", { className: "font-mono text-xs font-bold text-red-600", children: [Math.abs(days), "d overdue"] });
  if (days === 0) return /*#__PURE__*/_jsx("span", { className: "font-mono text-xs font-bold text-red-600", children: "Expires today" });
  const color = days <= 7 ? "text-red-600" : days <= 30 ? "text-orange-600" : days <= 90 ? "text-amber-600" : "text-emerald-600";
  return /*#__PURE__*/_jsxs("span", { className: `font-mono text-xs font-bold ${color} flex items-center gap-1`, children: [/*#__PURE__*/_jsx(Timer, { size: 10 }), days, "d remaining"] });
}
const AVATAR_COLORS = { SC: "bg-blue-500", DP: "bg-emerald-500", LT: "bg-violet-500", MJ: "bg-amber-500", JL: "bg-rose-500", AR: "bg-slate-500", MG: "bg-cyan-600", JW: "bg-purple-600", CQ: "bg-blue-700" };
function Av({ initials, size = "sm" }) {
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-xs";
  return /*#__PURE__*/_jsx("div", { className: `${sz} rounded-full ${AVATAR_COLORS[initials] || "bg-blue-500"} flex items-center justify-center text-white font-semibold flex-shrink-0`, children: initials });
}
function MetricCard({ title, value, delta, deltaPositive, icon: Icon, iconBg }) {
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow",
    children: [/*#__PURE__*/_jsxs("div", { className: "flex items-start justify-between mb-3", children: [/*#__PURE__*/_jsx("div", { className: `p-2 rounded-lg ${iconBg}`, children: /*#__PURE__*/_jsx(Icon, { size: 15, className: "text-white" }) }), delta && /*#__PURE__*/_jsxs("span", { className: `text-xs font-medium flex items-center gap-0.5 ${deltaPositive ? "text-emerald-600" : "text-red-500"}`, children: [deltaPositive ? /*#__PURE__*/_jsx(TrendingUp, { size: 11 }) : /*#__PURE__*/_jsx(TrendingDown, { size: 11 }), delta] })] }), /*#__PURE__*/_jsx("p", { className: "text-2xl font-bold text-foreground font-mono mb-0.5", children: value }), /*#__PURE__*/_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: title })]
  });
}
function Card({ children, className = "" }) {
  return /*#__PURE__*/_jsx("div", { className: `bg-card border border-border rounded-lg ${className}`, children: children });
}
function SectionLabel({ children }) {
  return /*#__PURE__*/_jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: children });
}

// ── Nav ────────────────────────────────────────────────────────────────────
const ALL_ROLES = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"];
const MGMT_ROLES = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head"];
const LEGAL_ROLES = ["Administrator", "Legal Manager", "Compliance Officer"];
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "core", roles: ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head"] },
  { id: "compliance", label: "Compliance", icon: Shield, group: "core", roles: LEGAL_ROLES },
  { id: "contracts", label: "Contract Repository", icon: FileText, group: "core", roles: [...ALL_ROLES] },
  { id: "obligations", label: "Obligation Tracker", icon: CheckSquare, group: "core", roles: [...ALL_ROLES] },
  { id: "renewal-management", label: "Renewal Management", icon: CalendarCheck, group: "renewals", roles: ["Administrator", "Legal Manager", "Contract Manager", "Department Head"] },
  { id: "reports", label: "Reports & Export", icon: FileBarChart, group: "reports", roles: MGMT_ROLES },
  { id: "notifications", label: "Notification Center", icon: Bell, group: "tools", roles: [...ALL_ROLES] },
  { id: "user-management", label: "User & Role Mgmt", icon: Users, group: "tools", roles: ["Administrator"] },
  { id: "admin", label: "Admin Panel", icon: Settings, group: "admin", roles: ["Administrator"] }
];

function Sidebar({ screen, onNavigate, role, collapsed, onToggle }) {
  return /*#__PURE__*/_jsxs("div", {
    className: `flex-shrink-0 flex flex-col h-screen transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`,
    style: { background: "#0D1B2E" },
    children: [/*#__PURE__*/_jsxs("div", {
      className: `flex items-center gap-2.5 h-14 border-b px-4 flex-shrink-0 ${collapsed ? "justify-center" : ""}`,
      style: { borderColor: "rgba(255,255,255,0.07)" },
      children: [/*#__PURE__*/_jsx("div", { className: "w-7 h-7 bg-blue-600 rounded flex items-center justify-center flex-shrink-0", children: /*#__PURE__*/_jsx(FileText, { size: 13, className: "text-white" }) }), !collapsed && /*#__PURE__*/_jsx("span", { className: "text-white font-bold text-base tracking-tight", children: "ContractIQ" })]
    }), !collapsed && /*#__PURE__*/_jsx("div", {
      className: "px-3 py-3 border-b flex-shrink-0",
      style: { borderColor: "rgba(255,255,255,0.07)" },
      children: /*#__PURE__*/_jsxs("div", {
        className: "rounded px-2.5 py-2",
        style: { background: "rgba(255,255,255,0.05)" },
        children: [/*#__PURE__*/_jsx("p", { className: "text-[10px] uppercase tracking-widest mb-1", style: { color: "#4B6A8A" }, children: "Signed in as" }), /*#__PURE__*/_jsx("p", { className: "text-xs font-bold mb-1", style: { color: "#E2E8F0" }, children: "Sarah Chen" }), /*#__PURE__*/_jsx("span", { className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-900/60 text-blue-300`, children: role })]
      })
    }), /*#__PURE__*/_jsx("nav", {
      className: "flex-1 px-2 py-3 overflow-y-auto",
      children: (() => {
        const filtered = NAV_ITEMS.filter(item => item.roles.includes(role));
        const groups = ["core", "renewals", "reports", "tools", "admin"];
        const groupLabels = { core: "Workspace", renewals: "Renewals", reports: "Reports", tools: "Tools", admin: "Admin" };
        return groups.map(group => {
          const items = filtered.filter(i => i.group === group);
          if (!items.length) return null;
          return /*#__PURE__*/_jsxs("div", {
            className: "mb-3",
            children: [!collapsed && /*#__PURE__*/_jsx("p", { className: "text-xs font-semibold uppercase tracking-widest px-3 mb-1.5 mt-1", style: { color: "#2A4A6A" }, children: groupLabels[group] }), /*#__PURE__*/_jsx("div", {
              className: "space-y-0.5",
              children: items.map(item => {
                const isActive = screen === item.id || screen === "contract-detail" && item.id === "contracts";
                return /*#__PURE__*/_jsxs("button", {
                  onClick: () => onNavigate(item.id),
                  title: collapsed ? item.label : undefined,
                  className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"} ${collapsed ? "justify-center" : ""}`,
                  children: [/*#__PURE__*/_jsx(item.icon, { size: 15, className: "flex-shrink-0" }), !collapsed && /*#__PURE__*/_jsx("span", { className: "font-medium text-sm", children: item.label })]
                }, item.id);
              })
            })]
          }, group);
        });
      })()
    }), /*#__PURE__*/_jsx("div", {
      className: "p-2 border-t flex-shrink-0",
      style: { borderColor: "rgba(255,255,255,0.07)" },
      children: /*#__PURE__*/_jsx("button", { onClick: onToggle, className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-colors", style: { justifyContent: collapsed ? "center" : "flex-start" }, children: collapsed ? /*#__PURE__*/_jsx(ChevronRight, { size: 14 }) : /*#__PURE__*/_jsxs(_Fragment, { children: [/*#__PURE__*/_jsx(ChevronLeft, { size: 14 }), /*#__PURE__*/_jsx("span", { children: "Collapse sidebar" })] }) })
    })]
  });
}

function TopBar({ screen, role, onLogout, onToggleNotifications, unreadCount }) {
  const titles = {
    dashboard: "Dashboard", compliance: "Compliance", admin: "Admin Panel", contracts: "Contract Repository", "contract-detail": "Contract Details",
    obligations: "Obligation Tracker", renewals: "Renewal Dashboard", "renewal-management": "Renewal Management", reports: "Reports & Export", notifications: "Notification Center", "user-management": "User & Role Management"
  };
  return /*#__PURE__*/_jsxs("header", {
    className: "h-14 bg-card border-b border-border flex items-center px-5 gap-4 flex-shrink-0",
    children: [/*#__PURE__*/_jsxs("div", { className: "flex-1 min-w-0", children: [/*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground", children: titles[screen] || "ContractIQ" }), /*#__PURE__*/_jsx("p", { className: "text-xs text-muted-foreground", children: "June 3, 2024" })] }), /*#__PURE__*/_jsxs("button", { onClick: onToggleNotifications, className: "relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors", children: [/*#__PURE__*/_jsx(Bell, { size: 15, className: "text-muted-foreground" }), unreadCount > 0 && /*#__PURE__*/_jsx("span", { className: "absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold", children: unreadCount })] }), /*#__PURE__*/_jsxs("div", { className: "flex items-center gap-2 pl-3 border-l border-border", children: [/*#__PURE__*/_jsx(Av, { initials: "SC", size: "sm" }), /*#__PURE__*/_jsx("button", { onClick: onLogout, className: "ml-1 text-muted-foreground hover:text-foreground transition-colors", children: /*#__PURE__*/_jsx(LogOut, { size: 13 }) })] })]
  });
}

function NotificationPanel({ onClose }) {
  return /*#__PURE__*/_jsxs("div", { className: "absolute top-14 right-4 w-80 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden", children: [/*#__PURE__*/_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [/*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground", children: "Notifications" }), /*#__PURE__*/_jsx("button", { onClick: onClose, children: /*#__PURE__*/_jsx(X, { size: 13, className: "text-muted-foreground" }) })] }), /*#__PURE__*/_jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "No new notifications." })] });
}

// ── Auth Components ────────────────────────────────────────────────────────
function AuthPanel({ slim }) { return /*#__PURE__*/_jsx("div", { className: "hidden lg:block", style: { background: "#0A1628", width: slim ? "360px" : "440px" } }); }
function FieldInput({ label, type = "text", value, onChange, placeholder, icon: Icon }) {
  return /*#__PURE__*/_jsxs("div", { children: [/*#__PURE__*/_jsx("label", { className: "block text-xs font-semibold text-foreground mb-1.5 uppercase", children: label }), /*#__PURE__*/_jsxs("div", { className: "relative", children: [Icon && /*#__PURE__*/_jsx(Icon, { size: 13, className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /*#__PURE__*/_jsx("input", { type: type, value: value, onChange: e => onChange?.(e.target.value), placeholder: placeholder, className: `w-full pl-9 pr-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary` })] })] });
}
function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("Legal Manager");
  return /*#__PURE__*/_jsxs("div", { className: "min-h-screen flex", children: [/*#__PURE__*/_jsx(AuthPanel, {}), /*#__PURE__*/_jsx("div", { className: "flex-1 flex items-center justify-center bg-background p-8", children: /*#__PURE__*/_jsxs("div", { className: "w-full max-w-sm", children: [/*#__PURE__*/_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Welcome back" }), /*#__PURE__*/_jsxs("div", { className: "space-y-4", children: [/*#__PURE__*/_jsx(FieldInput, { label: "Email Address", placeholder: "name@company.com", icon: Mail }), /*#__PURE__*/_jsxs("select", { value: role, onChange: e => setRole(e.target.value), className: "w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm", children: [/*#__PURE__*/_jsx("option", { value: "Administrator", children: "Administrator" }), /*#__PURE__*/_jsx("option", { value: "Legal Manager", children: "Legal Manager" }), /*#__PURE__*/_jsx("option", { value: "Employee", children: "Employee" })] }), /*#__PURE__*/_jsx("button", { onClick: () => onLogin(role), className: "w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-700", children: "Sign in" })] })] }) })] });
}
function AuthLoadingScreen({ onSuccess }) {
  useEffect(() => { setTimeout(onSuccess, 1500); }, []);
  return /*#__PURE__*/_jsx("div", { className: "min-h-screen flex items-center justify-center", style: { background: "#0A1628" }, children: /*#__PURE__*/_jsx("h2", { className: "text-white text-lg", children: "Signing In..." }) });
}
function AuthSuccessScreen({ onContinue }) {
  useEffect(() => { setTimeout(onContinue, 1000); }, []);
  return /*#__PURE__*/_jsx("div", { className: "min-h-screen flex items-center justify-center", style: { background: "#0A1628" }, children: /*#__PURE__*/_jsx("h2", { className: "text-white text-lg", children: "Success!" }) });
}
function UnauthorizedScreen({ onBack }) { return /*#__PURE__*/_jsxs("div", { className: "min-h-screen flex items-center justify-center", children: [/*#__PURE__*/_jsx("h2", { children: "Unauthorized" }), /*#__PURE__*/_jsx("button", { onClick: onBack, children: "Go Back" })] }); }

// ── Screen Components (Data logic removed) ─────────────────────────────────
function LegalDashboard() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Legal Dashboard - Waiting for data connection" }); }
function ComplianceDashboard() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Compliance Dashboard - Waiting for data connection" }); }
function AdminDashboard() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Admin Dashboard - Waiting for data connection" }); }
function ContractRepository() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Contract Repository - Waiting for data connection" }); }
function ContractDetail() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Contract Detail - Waiting for data connection" }); }
function ObligationTracker() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Obligations - Waiting for data connection" }); }
function RenewalTracking() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Tracking - Waiting for data connection" }); }
function ExpiryMonitoring() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Expiry - Waiting for data connection" }); }
function RenewalReminders() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Reminders - Waiting for data connection" }); }
function RenewalApprovalWorkflow() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Approvals - Waiting for data connection" }); }
function RenewalHistory() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "History - Waiting for data connection" }); }
function RenewalStatusOverview() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Status Overview - Waiting for data connection" }); }
function ReportsExportScreen() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Reports - Waiting for data connection" }); }
function NotificationCenterScreen() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "Notifications - Waiting for data connection" }); }
function UserManagementScreen() { return /*#__PURE__*/_jsx("div", { className: "p-6 text-center text-muted-foreground", children: "User Management - Waiting for data connection" }); }
function MiniCalendar() { return /*#__PURE__*/_jsx("div", { className: "bg-card border border-border rounded-lg p-4 text-center", children: "Calendar UI" }); }

// ── Renewal Dashboards (Wired up to use setShowAddModal) ───────────────────
function RenewalDashboard({ onNavigate, setShowAddModal }) {
  return /*#__PURE__*/_jsxs("div", {
    className: "p-6 space-y-5 max-w-screen-xl relative",
    children: [
      /*#__PURE__*/_jsxs("div", {
        className: "flex justify-between",
        children: [
          /*#__PURE__*/_jsx("h2", { className: "text-xl font-bold", children: "Renewal Dashboard" }),
          /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowAddModal(true),
            className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700",
            children: [/*#__PURE__*/_jsx(Plus, { size: 13 }), " Add Renewal"]
          })
        ]
      }),
      /*#__PURE__*/_jsx("div", { className: "text-center text-muted-foreground pt-10", children: "Fetching PostgreSQL Data..." })
    ]
  });
}

function RenewalManagementScreen({ renewals, setShowAddModal }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
 const [filterDept, setFilterDept] = useState("All");

  // 1. ADD THE EXPORT FUNCTION HERE
  const handleExportCSV = () => {
    if (!renewals || renewals.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Contract ID", "Contract Name", "Owner", "Department", "Renewal Date", "Days Remaining", "Status", "Priority"];
    const csvRows = renewals.map(r => {
      const escape = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
      return [
        escape(r.contractId), escape(r.name), escape(r.owner), escape(r.dept),
        escape(r.renewalDate), r.daysRemaining || 0, escape(r.status), escape(r.priority)
      ].join(",");
    });
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Contract_Renewals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = renewals.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || (r.name && r.name.toLowerCase().includes(q)) || (r.contractId && r.contractId.toLowerCase().includes(q)) || (r.owner && r.owner.toLowerCase().includes(q));
    const matchDept = filterDept === "All" || r.dept === filterDept;
    return matchSearch && matchDept;
  });

  const TABS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "tracking", label: "Tracking", icon: ClipboardList },
    { id: "approval", label: "Approval Workflow", icon: FileCheck },
    { id: "reminders", label: "Reminders", icon: BellRing },
    { id: "history", label: "Renewal History", icon: Layers },
    { id: "analytics", label: "Analytics", icon: BarChart2 }
  ];

  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full",
    children: [
      /* Top Navbar */
      /*#__PURE__*/_jsxs("div", {
        className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0",
        children: [
          /*#__PURE__*/_jsxs("div", {
            className: "flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4",
            children: [
              /*#__PURE__*/_jsxs("div", {
                children: [
                  /*#__PURE__*/_jsx("h1", { className: "text-xl font-bold text-foreground", children: "Renewal Management" }),
                  /*#__PURE__*/_jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "All contract renewals, approvals, reminders, and analytics in one place" })
                ]
              }),
              /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                  /*#__PURE__*/_jsxs("button", {
                    onClick: handleExportCSV, // 2. ATTACH THE FUNCTION TO THE BUTTON HERE
                    className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted",
                    children: [/*#__PURE__*/_jsx(Download, { size: 13 }), " Export"]
                  }),
                  /*#__PURE__*/_jsxs("button", {
                    onClick: () => setShowAddModal(true),
                    className: "flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-blue-700",
                    children: [/*#__PURE__*/_jsx(Plus, { size: 13 }), " Add Renewal"]
                  })
                ]
              })
            ]
          }),
          /*#__PURE__*/_jsx("div", {
            className: "flex items-center gap-0 overflow-x-auto",
            children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`,
              children: [/*#__PURE__*/_jsx(tab.icon, { size: 13 }), tab.label]
            }))
          })
        ]
      }),
      
      /* Main Content Area */
      /*#__PURE__*/_jsxs("div", {
        className: "flex-1 overflow-y-auto bg-muted/20 p-6 space-y-5",
        children: [
          activeTab === "overview" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-5 max-w-[1600px] mx-auto",
            children: [
              /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4",
                children: [
                  { title: "Upcoming Renewals", value: renewals.length, delta: "Live DB Data", icon: CalendarClock, iconBg: "bg-blue-600" },
                  { title: "Due This Month", value: renewals.filter(r => r.daysRemaining <= 30 && r.daysRemaining >= 0).length, delta: "Active window", icon: AlertTriangle, iconBg: "bg-amber-500" },
                  { title: "Renewed Contracts", value: renewals.filter(r => r.status === "Renewed").length, delta: "YTD Total", icon: CalendarCheck, iconBg: "bg-emerald-500" },
                  { title: "Expired Contracts", value: renewals.filter(r => r.status === "Expired" || r.daysRemaining < 0).length, delta: "Action required", icon: CalendarX, iconBg: "bg-red-500" },
                  { title: "Pending Approval", value: renewals.filter(r => r.status === "In Progress").length, delta: "Awaiting review", icon: Hourglass, iconBg: "bg-violet-500" }
                ].map(k => /*#__PURE__*/_jsx(MetricCard, { ...k, key: k.title }))
              }),
              /*#__PURE__*/_jsxs("div", {
                className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                children: [
                  /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Upcoming Renewals — Priority View (Live PostgreSQL Data)" }),
                  /*#__PURE__*/_jsx("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/_jsxs("table", {
                      className: "w-full text-xs",
                      children: [
                        /*#__PURE__*/_jsx("thead", {
                          children: /*#__PURE__*/_jsx("tr", {
                            className: "border-b border-border bg-muted/50 text-left text-muted-foreground font-semibold uppercase",
                            children: ["Contract Name", "Department", "Renewal Date", "Days Remaining", "Status", "Priority"].map(h => /*#__PURE__*/_jsx("th", { key: h, className: "px-4 py-3", children: h }))
                          })
                        }),
                        /*#__PURE__*/_jsx("tbody", {
                          className: "divide-y divide-border",
                          children: renewals.map(r => /*#__PURE__*/_jsxs("tr", {
                            className: "hover:bg-muted/40",
                            children: [
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: r.name }),
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3 text-muted-foreground", children: r.dept }),
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-mono", children: r.renewalDate }),
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: /*#__PURE__*/_jsx(CountdownTimer, { days: r.daysRemaining }) }),
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: renewalStatusBadge(r.status) }),
                              /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: priorityBadge(r.priority) })
                            ]
                          }, r.id || r.contractId))
                        })
                      ]
                    })
                  }),
                  renewals.length === 0 && /*#__PURE__*/_jsx("div", { className: "p-8 text-center text-muted-foreground", children: "No records found in PostgreSQL yet. Click 'Add Renewal' above to add one!" })
                ]
              })
            ]
          }),

          activeTab === "tracking" && /*#__PURE__*/_jsxs("div", {
            className: "space-y-4 max-w-[1600px] mx-auto",
            children: [
              /*#__PURE__*/_jsxs("div", {
                className: "bg-card border border-border rounded-xl px-5 py-4 flex justify-between items-center",
                children: [
                  /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold", children: `Tracking Table (${filtered.length} records)` }),
                  /*#__PURE__*/_jsx("input", { value: search, onChange: e => setSearch(e.target.value), placeholder: "Search records...", className: "px-3 py-1.5 border border-border rounded-lg text-xs w-48" })
                ]
              }),
              /*#__PURE__*/_jsx("div", {
                className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
                children: /*#__PURE__*/_jsx("table", {
                  className: "w-full text-xs",
                  children: [
                    /*#__PURE__*/_jsx("thead", {
                      children: /*#__PURE__*/_jsx("tr", {
                        className: "border-b border-border bg-muted/50 text-left text-muted-foreground font-semibold uppercase",
                        children: ["Contract ID", "Name", "Owner", "Department", "Status"].map(h => /*#__PURE__*/_jsx("th", { key: h, className: "px-4 py-3", children: h }))
                      })
                    }),
                    /*#__PURE__*/_jsx("tbody", {
                      className: "divide-y divide-border",
                      children: filtered.map(r => /*#__PURE__*/_jsxs("tr", {
                        className: "hover:bg-muted/40",
                        children: [
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-mono text-muted-foreground", children: r.contractId }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-semibold", children: r.name }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: r.owner }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 text-muted-foreground", children: r.dept }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: renewalStatusBadge(r.status) })
                        ]
                      }, r.id || r.contractId))
                    })
                  ]
                })
              })
            ]
          }),

          activeTab === "analytics" && (() => {
            // Calculate chart data from your live renewals database dynamically
            const statusCounts = renewals.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
            const pieData = Object.keys(statusCounts).map((k, i) => ({ name: k, value: statusCounts[k], color: ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#6B7280"][i % 5] }));

            const deptCounts = renewals.reduce((acc, r) => { acc[r.dept] = (acc[r.dept] || 0) + 1; return acc; }, {});
            const barData = Object.keys(deptCounts).map(k => ({ name: k, count: deptCounts[k] }));

            return /*#__PURE__*/_jsxs("div", {
              className: "p-5 space-y-5 max-w-[1400px] mx-auto",
              children: [
                /* 1. TOP KPI CARDS */
                /*#__PURE__*/_jsx("div", {
                  className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                  children: [
                    { title: "Total Live Contracts", value: renewals.length, icon: Database, bg: "bg-blue-600" },
                    { title: "Upcoming", value: renewals.filter(r => r.status === "Upcoming").length, icon: CalendarClock, bg: "bg-amber-500" },
                    { title: "Renewed", value: renewals.filter(r => r.status === "Renewed").length, icon: CalendarCheck, bg: "bg-emerald-500" },
                    { title: "Expired", value: renewals.filter(r => r.status === "Expired" || r.daysRemaining < 0).length, icon: CalendarX, bg: "bg-red-500" }
                  ].map(k => /*#__PURE__*/_jsxs("div", {
                    className: "bg-card border border-border rounded-xl p-4 shadow-sm",
                    children: [
                      /*#__PURE__*/_jsx("div", { className: `p-2 rounded-lg w-fit ${k.bg} mb-2`, children: /*#__PURE__*/_jsx(k.icon, { size: 14, className: "text-white" }) }),
                      /*#__PURE__*/_jsx("p", { className: "text-xl font-bold font-mono text-foreground", children: k.value }),
                      /*#__PURE__*/_jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide", children: k.title })
                    ]
                  }, k.title))
                }),

                /* 2. MIDDLE ROW: RECHARTS GRAPHICS */
                /*#__PURE__*/_jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-5",
                  children: [
                    /* Pie Chart */
                    /*#__PURE__*/_jsxs("div", {
                      className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                      children: [
                        /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Status Distribution" }),
                        pieData.length > 0 ? /*#__PURE__*/_jsx(ResponsiveContainer, {
                          width: "100%", height: 260,
                          children: /*#__PURE__*/_jsxs(PieChart, {
                            children: [
                              /*#__PURE__*/_jsx(Pie, {
                                data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: 65, outerRadius: 90, paddingAngle: 3,
                                children: pieData.map((e, i) => /*#__PURE__*/_jsx(Cell, { key: `cell-${i}`, fill: e.color }))
                              }),
                              /*#__PURE__*/_jsx(Tooltip, { contentStyle: { fontSize: '12px', borderRadius: '8px' } }),
                              /*#__PURE__*/_jsx(Legend, { wrapperStyle: { fontSize: '11px', paddingTop: '10px' } })
                            ]
                          })
                        }) : /*#__PURE__*/_jsx("p", { className: "text-xs text-muted-foreground text-center py-12", children: "No data available." })
                      ]
                    }),

                    /* Bar Chart */
                    /*#__PURE__*/_jsxs("div", {
                      className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                      children: [
                        /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Contracts by Department" }),
                        barData.length > 0 ? /*#__PURE__*/_jsx(ResponsiveContainer, {
                          width: "100%", height: 260,
                          children: /*#__PURE__*/_jsxs(BarChart, {
                            data: barData, margin: { top: 10, right: 10, left: -20, bottom: 0 },
                            children: [
                              /*#__PURE__*/_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e5e7eb" }),
                              /*#__PURE__*/_jsx(XAxis, { dataKey: "name", tick: {fontSize: 11, fill: "#6b7280"}, axisLine: false, tickLine: false }),
                              /*#__PURE__*/_jsx(YAxis, { tick: {fontSize: 11, fill: "#6b7280"}, axisLine: false, tickLine: false, allowDecimals: false }),
                              /*#__PURE__*/_jsx(Tooltip, { contentStyle: { fontSize: '12px', borderRadius: '8px' }, cursor: {fill: "#f3f4f6"} }),
                              /*#__PURE__*/_jsx(Bar, { dataKey: "count", name: "Contracts", fill: "#3B82F6", radius: [4, 4, 0, 0], barSize: 45 })
                            ]
                          })
                        }) : /*#__PURE__*/_jsx("p", { className: "text-xs text-muted-foreground text-center py-12", children: "No data available." })
                      ]
                    })
                  ]
                }),

                /* 3. BOTTOM ROW: BREAKDOWN LIST */
                /*#__PURE__*/_jsxs("div", {
                  className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                  children: [
                    /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold text-foreground mb-4", children: "Live Database Overview & Breakdown" }),
                    /*#__PURE__*/_jsx("div", {
                      className: "space-y-3",
                      children: renewals.map(r => /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center justify-between p-3 bg-muted/40 rounded-lg text-xs",
                        children: [
                          /*#__PURE__*/_jsxs("div", { children: [/*#__PURE__*/_jsx("p", { className: "font-semibold text-foreground", children: r.name }), /*#__PURE__*/_jsxs("p", { className: "text-muted-foreground", children: [r.dept, " · Owner: ", r.owner] })] }),
                          /*#__PURE__*/_jsxs("div", { className: "text-right", children: [/*#__PURE__*/_jsx("span", { className: "font-mono text-muted-foreground", children: r.renewalDate }), /*#__PURE__*/_jsx("div", { className: "mt-1", children: renewalStatusBadge(r.status) })] })
                        ]
                      }, r.id || r.contractId))
                    })
                  ]
                })
              ]
            });
          })(), 

          activeTab === "history" && /*#__PURE__*/_jsxs("div", {
            className: "p-5 space-y-4 max-w-[1600px] mx-auto",
            children: [
              /*#__PURE__*/_jsxs("div", {
                className: "bg-card border border-border rounded-xl px-5 py-4 flex justify-between items-center",
                children: [
                  /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold", children: "Renewal History Log (PostgreSQL)" }),
                  /*#__PURE__*/_jsx("span", { className: "text-xs text-muted-foreground", children: `${renewals.length} total logged entries` })
                ]
              }),
              /*#__PURE__*/_jsx("div", {
                className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
                children: /*#__PURE__*/_jsx("table", {
                  className: "w-full text-xs",
                  children: [
                    /*#__PURE__*/_jsx("thead", {
                      children: /*#__PURE__*/_jsx("tr", {
                        className: "border-b border-border bg-muted/50 text-left text-muted-foreground font-semibold uppercase",
                        children: ["Contract ID", "Name", "Department", "Renewal Date", "Status"].map(h => /*#__PURE__*/_jsx("th", { key: h, className: "px-4 py-3", children: h }))
                      })
                    }),
                    /*#__PURE__*/_jsx("tbody", {
                      className: "divide-y divide-border",
                      children: renewals.map(r => /*#__PURE__*/_jsxs("tr", {
                        className: "hover:bg-muted/40",
                        children: [
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-mono text-muted-foreground", children: r.contractId }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-semibold", children: r.name }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 text-muted-foreground", children: r.dept }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3 font-mono", children: r.renewalDate }),
                          /*#__PURE__*/_jsx("td", { className: "px-4 py-3", children: renewalStatusBadge(r.status) })
                        ]
                      }, r.id || r.contractId))
                    })
                  ]
                })
              })
            ]
          }),

          activeTab === "reminders" && /*#__PURE__*/_jsxs("div", {
            className: "p-5 space-y-4 max-w-[1400px] mx-auto",
            children: [
              /*#__PURE__*/_jsx("div", {
                className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                children: [
                  /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold mb-3", children: "Active Database Expiry Reminders" }),
                  /*#__PURE__*/_jsx("div", {
                    className: "space-y-3",
                    children: renewals.map(r => /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg text-xs",
                      children: [
                        /*#__PURE__*/_jsx("p", { className: "font-semibold", children: r.name }),
                        /*#__PURE__*/_jsx("span", { className: "font-mono text-amber-600", children: `${r.daysRemaining} days remaining` }),
                        /*#__PURE__*/_jsx("span", { className: "text-blue-600 font-medium", children: "Email & In-App Alert Configured" })
                      ]
                    }, r.id || r.contractId))
                  })
                ]
              })
            ]
          }),

          activeTab === "approval" && /*#__PURE__*/_jsxs("div", {
            className: "p-5 space-y-4 max-w-[1400px] mx-auto",
            children: [
              /*#__PURE__*/_jsx("div", {
                className: "bg-card border border-border rounded-xl p-5 shadow-sm",
                children: [
                  /*#__PURE__*/_jsx("p", { className: "text-sm font-semibold mb-3", children: "Database Approvals Workflow Queue" }),
                  /*#__PURE__*/_jsx("div", {
                    className: "space-y-3",
                    children: renewals.map(r => /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg text-xs",
                      children: [
                        /*#__PURE__*/_jsx("p", { className: "font-semibold", children: r.name }),
                        /*#__PURE__*/_jsx("span", { className: "text-muted-foreground", children: `Assigned to: ${r.assignedTo || r.owner}` }),
                        /*#__PURE__*/_jsx("span", { children: renewalStatusBadge(r.status) })
                      ]
                    }, r.id || r.contractId))
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("renewal-management");
  const [role, setRole] = useState("Administrator");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [renewals, setRenewals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch live records from FastAPI backend on mount
  useEffect(() => {
    fetch("http://localhost:8000/renewals")
      .then(res => res.json())
      .then(data => {
        RENEWALS = data;
        RENEWAL_MGMT_DATA = data;
        setRenewals(data);
      })
      .catch(err => console.error("Error loading database items:", err));
  }, []);

  // Submit new entry safely to PostgreSQL (preventing 422 errors)
  const handleAddRenewalSubmit = (newRenewalItem) => {
    let calcDays = 0;
    if (newRenewalItem.renewalDate) {
      const today = new Date();
      const target = new Date(newRenewalItem.renewalDate);
      if (!isNaN(target.getTime())) {
        calcDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 3600 * 24));
      }
    }
    const ownerStr = String(newRenewalItem.owner || "Sarah Chen");

    const completeData = {
      contractId: String(`CTR-${Math.floor(Math.random() * 9000) + 1000}`),
      name: String(newRenewalItem.name || newRenewalItem.contractName || "New Contract"),
      owner: ownerStr,
      initials: String(ownerStr.substring(0, 2).toUpperCase()),
      dept: String(newRenewalItem.department || newRenewalItem.dept || "IT"),
      type: String(newRenewalItem.type || "Software"),
      renewalDate: String(newRenewalItem.renewalDate || "2026-12-31"),
      daysRemaining: Number(calcDays),
      status: "Upcoming",
      assignedTo: ownerStr,
      priority: String(newRenewalItem.priority || "Medium")
    };

    fetch("http://localhost:8000/renewals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeData)
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text); });
        return res.json();
      })
      .then(savedItem => {
        setRenewals(prev => [...prev, savedItem]);
        setShowAddModal(false);
      })
      .catch(err => console.error("Database write error:", err));
  };

  const renderContent = () => {
    switch (screen) {
      case "renewal-management": return /*#__PURE__*/_jsx(RenewalManagementScreen, { renewals: renewals, setShowAddModal: setShowAddModal });
      default: return /*#__PURE__*/_jsx(RenewalManagementScreen, { renewals: renewals, setShowAddModal: setShowAddModal });
    }
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "flex h-screen bg-background overflow-hidden",
    children: [
      /*#__PURE__*/_jsx(Sidebar, { screen: screen, onNavigate: setScreen, role: role, collapsed: collapsed, onToggle: () => setCollapsed(!collapsed) }),
      /*#__PURE__*/_jsxs("div", {
        className: "flex-1 flex flex-col min-w-0 overflow-hidden",
        children: [
          /*#__PURE__*/_jsx(TopBar, { screen: screen, role: role, onLogout: () => setScreen("login"), onToggleNotifications: () => setShowNotifications(s => !s) }),
          /*#__PURE__*/_jsx("main", {
            className: "flex-1 overflow-y-auto",
            children: renderContent()
          }),
          showAddModal && /*#__PURE__*/_jsx(AddRenewalModal, {
            open: showAddModal,
            onClose: () => setShowAddModal(false),
            onSubmit: handleAddRenewalSubmit
          })
        ]
      })
    ]
  });
}