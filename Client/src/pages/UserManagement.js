import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, ShieldCheck, ClipboardList, Database, UserPlus, Plus,
  CheckCircle2, UserCheck, Shield, Key, Building2, Monitor, Hash, Mail, Phone,
  Briefcase, MapPin, Fingerprint, Clock, Search, Eye, Edit, UserCog, Ban,
  CheckCircle, Trash2, Copy, Download, LogIn, ShieldAlert, Lock
} from "lucide-react";

const e = React.createElement;

// ── Shared Components ──────────────────────────────────────────────────────
function Badge({ variant = "neutral", children }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    danger: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    info: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
    neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-400/20",
    purple: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20",
    orange: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20"
  };
  return e("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono whitespace-nowrap ${styles[variant] || styles.neutral}` }, children);
}

const AVATAR_COLORS = { SC: "bg-blue-500", DP: "bg-emerald-500", LT: "bg-violet-500", MJ: "bg-amber-500", JL: "bg-rose-500", AR: "bg-slate-500", MG: "bg-cyan-600", JW: "bg-purple-600", RP: "bg-blue-600", CA: "bg-pink-500" };

function Av({ initials, size = "sm" }) {
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-xs";
  return e("div", { className: `${sz} rounded-full ${AVATAR_COLORS[initials] || "bg-blue-500"} flex items-center justify-center text-white font-semibold flex-shrink-0` }, initials || "?");
}

const PermBox = ({ on }) => e("div", { className: "flex items-center justify-center" }, on ? e(CheckCircle2, { size: 14, className: "text-emerald-500" }) : e("div", { className: "w-3.5 h-3.5 rounded-sm border border-border bg-muted" }));

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function UserManagementScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [toast, setToast] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  // Modal States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRoleData, setNewRoleData] = useState({ role: "", permissions: [] });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUserData, setViewUserData] = useState(null);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [roleChangeTarget, setRoleChangeTarget] = useState(null);
  const [newAssignedRole, setNewAssignedRole] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", dept: "", role: "Employee" });

  // Live Data States
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [sessionsList, setSessionsList] = useState([]);
  const [permissionMatrix, setPermissionMatrix] = useState([]);

  // Fetch Live Data on Mount
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(res => res.ok ? res.json() : [])
      .then(data => { if (data.length) setUsersList(data); })
      .catch(err => console.error("Failed to fetch users:", err));

    fetch("http://localhost:8000/users/activity")
      .then(res => res.ok ? res.json() : [])
      .then(data => { if (data.length) setActivityLogs(data); })
      .catch(err => console.error("Failed to fetch activity:", err));

    fetch("http://localhost:8000/users/roles")
      .then(res => res.ok ? res.json() : [])
      .then(data => { if (data.length) setRolesList(data); })
      .catch(err => console.error("Failed to fetch roles:", err));
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // ── CSV EXPORT ──
  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Successfully exported ${filename}`);
  };

  const handleExportUsers = () => {
    const headers = ["ID", "Name", "Department", "Role", "Email", "Status"];
    const rows = filteredUsers.map(u => `"${u.id}","${u.name}","${u.dept}","${u.role}","${u.email}","${u.status}"`);
    downloadCSV([headers.join(","), ...rows].join("\n"), "ContractIQ_Users.csv");
  };

  const handleExportActivity = () => {
    const headers = ["Timestamp", "User", "Activity", "IP Address", "Device", "Status"];
    const rows = activityLogs.map(a => `"${a.ts}","${a.user}","${a.activity}","${a.ip}","${a.device}","${a.status}"`);
    downloadCSV([headers.join(","), ...rows].join("\n"), "Activity_Logs.csv");
  };

  // ── DATABASE ACTIONS ──
  const handleAddUser = (ev) => {
    ev.preventDefault();
    
    // Auto-generate initials for Avatar
    const nameParts = newUser.name.trim().split(" ");
    const initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[nameParts.length-1][0]).toUpperCase() 
      : newUser.name.substring(0, 2).toUpperCase();

    const payload = {
      ...newUser,
      id: `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: "Active",
      lastLogin: "Never",
      initials: initials
    };

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      setUsersList(prev => [...prev, data]);
      fetch("http://localhost:8000/users/activity")
        .then(res => res.ok ? res.json() : [])
        .then(actData => { if (actData.length) setActivityLogs(actData); });
      setShowInviteModal(false);
      setNewUser({ name: "", email: "", dept: "", role: "Employee" });
      showToast(`${data.name} has been invited!`);
    })
    .catch(() => showToast("Failed to invite user. Check server connection."));
  };

  const handleEditUserSubmit = (ev) => {
    ev.preventDefault();
    if (!editUserData) return;
    fetch(`http://localhost:8000/users/${editUserData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUserData)
    })
    .then(res => res.json())
    .then(updated => {
      setUsersList(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
      fetch("http://localhost:8000/users/activity")
        .then(res => res.ok ? res.json() : [])
        .then(data => { if (data.length) setActivityLogs(data); });
      setShowEditModal(false);
      setEditUserData(null);
      showToast("User details updated successfully!");
    })
    .catch(() => showToast("Failed to update user. Check server connection."));
  };

  const handleAddRole = (ev) => {
    ev.preventDefault();
    if (!newRoleData.role) return;
    fetch("http://localhost:8000/users/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: newRoleData.role,
        permissions: newRoleData.permissions,
        color: "border-violet-300 bg-violet-50",
        icon: "ShieldCheck"
      })
    })
    .then(res => res.json())
    .then(role => {
      setRolesList(prev => [...prev, role]);
      setShowRoleModal(false);
      setNewRoleData({ role: "", permissions: [] });
      showToast(`Role "${role.role}" created successfully!`);
    })
    .catch(() => showToast("Failed to create role. Check server connection."));
  };

  const handleResetPassword = (user) => {
    if (window.confirm(`Send password reset email to ${user.email}?`)) {
      fetch(`http://localhost:8000/users/${user.id}/reset-password`, { method: "POST" })
        .then(() => showToast(`Password reset link sent to ${user.email}.`))
        .catch(() => showToast("Failed to send reset link. Check server."));
    }
  };

  const handleRoleChangeSubmit = (ev) => {
    ev.preventDefault();
    if (!roleChangeTarget) return;
    fetch(`http://localhost:8000/users/${roleChangeTarget.id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newAssignedRole })
    })
      .then(() => {
        setUsersList(prev => prev.map(u => u.id === roleChangeTarget.id ? { ...u, role: newAssignedRole } : u));
        setShowChangeRoleModal(false);
        showToast(`Role updated to ${newAssignedRole} for ${roleChangeTarget.name}.`);
      })
      .catch(() => showToast("Failed to update role. Check server."));
  };

  const handleDuplicateRole = (roleItem) => {
    const duplicated = { role: `${roleItem.role} (Copy)`, permissions: roleItem.permissions, color: roleItem.color };
    fetch(`http://localhost:8000/users/roles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(duplicated)
    })
      .then(res => res.json())
      .then(data => {
        setRolesList(prev => [...prev, data]);
        showToast(`Duplicated role: ${roleItem.role}`);
      })
      .catch(() => showToast("Failed to duplicate role."));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:8000/users/${userId}`, { method: "DELETE" })
        .then(() => {
          setUsersList(prev => prev.filter(u => u.id !== userId));
          showToast("User deleted from database.");
        }).catch(() => showToast("Failed to delete user. Check server connection."));
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    fetch(`http://localhost:8000/users/${userId}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus })
    }).then(() => {
      setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      showToast(`User marked as ${newStatus}.`);
    }).catch(() => showToast("Failed to update status. Check server connection."));
  };

  const filteredUsers = usersList.filter(u => {
    const q = search.toLowerCase();
    const matchesSearch = !q || (u.name && u.name.toLowerCase().includes(q)) || (u.email && u.email.toLowerCase().includes(q)) || (u.role && u.role.toLowerCase().includes(q));
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All Statuses" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const TABS = [
    { id: "overview", label: "Overview & Profile", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
    { id: "permissions", label: "Permission Matrix", icon: ClipboardList },
    { id: "activity", label: "Activity Logs", icon: Database }
  ];

  // ── TAB 1: OVERVIEW ──
  const OverviewTab = activeTab === "overview" && e("div", { className: "space-y-5" },
    e("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4" },
      [
        { label: "Total Users", value: usersList.length.toString(), icon: Users, bg: "bg-blue-600" },
        { label: "Active Users", value: usersList.filter(u => u.status === "Active").length.toString(), icon: UserCheck, bg: "bg-emerald-500" },
        { label: "Roles Defined", value: rolesList.length.toString(), icon: ShieldCheck, bg: "bg-violet-500" },
        { label: "Permissions", value: "42", icon: Key, bg: "bg-amber-500" },
        { label: "Departments", value: "7", icon: Building2, bg: "bg-cyan-600" },
        { label: "Active Sessions", value: sessionsList.length.toString(), icon: Monitor, bg: "bg-slate-500" }
      ].map((k) => e("div", { key: k.label, className: "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow" },
        e("div", { className: `p-2 rounded-lg mb-3 w-fit ${k.bg}` }, e(k.icon, { size: 14, className: "text-white" })),
        e("p", { className: "text-2xl font-bold font-mono text-foreground" }, k.value),
        e("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide" }, k.label)
      ))
    ),
    e("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-5" },
      e("div", { className: "xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden shadow-sm" },
        e("div", { className: "px-5 py-3.5 border-b border-border flex items-center justify-between" },
          e("p", { className: "text-sm font-bold text-foreground" }, "My Profile"),
          e("button", { onClick: () => setEditProfile(!editProfile), className: "text-xs text-blue-600 font-medium hover:underline" }, editProfile ? "Cancel" : "Edit Profile")
        ),
        e("div", { className: "p-5" },
          e("div", { className: "flex items-center gap-4 mb-5" },
            e("div", { className: "w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0" }, "ME"),
            e("div", null,
              e("p", { className: "text-base font-bold text-foreground" }, "Current User"),
              e(Badge, { variant: "info" }, "Administrator"),
              e("p", { className: "text-xs text-muted-foreground mt-1" }, "Active System Admin")
            )
          ),
          e("div", { className: "space-y-3" },
            [
              { label: "Employee ID", value: "ADMIN-01", icon: Hash },
              { label: "Email", value: "admin@contractiq.com", icon: Mail },
              { label: "Department", value: "IT", icon: Building2 },
              { label: "Role", value: "Administrator", icon: ShieldCheck }
            ].map((f) => e("div", { key: f.label, className: "flex items-center gap-3" },
              e("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0" }, e(f.icon, { size: 12, className: "text-muted-foreground" })),
              e("div", { className: "flex-1 min-w-0" },
                e("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold" }, f.label),
                editProfile && f.label !== "Role" ? e("input", { defaultValue: f.value, className: "text-xs text-foreground w-full bg-input-background border border-border rounded px-2 py-1 mt-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500" }) : e("p", { className: "text-xs font-medium text-foreground truncate" }, f.value)
              )
            ))
          )
        )
      ),
      e("div", { className: "xl:col-span-3 space-y-5" },
        e("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm" },
          e("p", { className: "text-sm font-bold text-foreground mb-4" }, "Security & Authentication"),
          e("div", { className: "grid grid-cols-2 gap-4" },
            [
              { label: "Authentication Method", value: "JWT + Bearer Token", icon: Fingerprint, color: "text-violet-600", bg: "bg-violet-50" },
              { label: "Session Timeout", value: "8 hours", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Last Password Change", value: "Recently", icon: Key, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "2FA Status", value: "Enabled", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" }
            ].map((s) => e("div", { key: s.label, className: `${s.bg} border border-border rounded-xl p-3.5 flex items-start gap-3` },
              e(s.icon, { size: 16, className: s.color }),
              e("div", null, e("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-semibold" }, s.label), e("p", { className: "text-xs font-bold text-foreground mt-0.5" }, s.value))
            ))
          )
        )
      )
    )
  );

  // ── TAB 2: USERS ──
  const roleVariant = { Administrator: "purple", "Legal Manager": "info", "Compliance Officer": "success", "Contract Manager": "warning", "Department Head": "orange", Employee: "neutral" };
  const UsersTab = activeTab === "users" && e("div", { className: "space-y-4" },
    e("div", { className: "bg-card border border-border rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm" },
      e("div", null,
        e("p", { className: "text-sm font-bold text-foreground" }, "All Users"),
        e("p", { className: "text-xs text-muted-foreground" }, filteredUsers.length, " of ", usersList.length, " users shown")
      ),
      e("div", { className: "flex items-center gap-2 flex-wrap" },
        e("div", { className: "relative" },
          e(Search, { size: 13, className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          e("input", { value: search, onChange: (ev) => setSearch(ev.target.value), placeholder: "Search users…", className: "pl-8 pr-3 py-1.5 bg-input-background border border-border rounded-lg text-xs w-44 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20" })
        ),
        e("select", { value: roleFilter, onChange: (ev) => setRoleFilter(ev.target.value), className: "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none" }, ["All Roles", "Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"].map((o) => e("option", { key: o }, o))),
        e("select", { value: statusFilter, onChange: (ev) => setStatusFilter(ev.target.value), className: "px-2.5 py-1.5 bg-input-background border border-border rounded-lg text-xs text-foreground focus:outline-none" }, ["All Statuses", "Active", "Inactive"].map((o) => e("option", { key: o }, o))),
        e("button", { onClick: handleExportUsers, className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted" }, e(Download, { size: 12 }), " Export CSV"),
        e("button", { onClick: () => setShowInviteModal(true), className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors" }, e(UserPlus, { size: 12 }), " Invite")
      )
    ),
    e("div", { className: "bg-card border border-border rounded-xl overflow-x-auto shadow-sm" },
      e("table", { className: "w-full text-xs" },
        e("thead", null, e("tr", { className: "border-b border-border bg-muted" }, ["Employee ID", "Name", "Department", "Role", "Email", "Status", "Actions"].map((h) => e("th", { key: h, className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap" }, h)))),
        e("tbody", { className: "divide-y divide-border" },
          usersList.length === 0 ? e("tr", null, e("td", { colSpan: 7, className: "text-center py-10 text-muted-foreground" }, "No users found in the database. Fetching...")) : 
          filteredUsers.map((u) => e("tr", { key: u.id, className: "hover:bg-muted/40 transition-colors" },
            e("td", { className: "px-4 py-3 font-mono text-muted-foreground" }, u.id),
            e("td", { className: "px-4 py-3" }, e("div", { className: "flex items-center gap-2" }, e(Av, { initials: u.initials || "US", size: "sm" }), e("span", { className: "font-semibold text-foreground whitespace-nowrap" }, u.name))),
            e("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap" }, u.dept),
            e("td", { className: "px-4 py-3" }, e(Badge, { variant: roleVariant[u.role] || "neutral" }, u.role)),
            e("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap" }, u.email),
            e("td", { className: "px-4 py-3" }, e(Badge, { variant: u.status === "Active" ? "success" : "neutral" }, u.status)),
            e("td", { className: "px-4 py-3" },
              e("div", { className: "flex items-center gap-1" },
                e("button", { onClick: () => { setViewUserData(u); setShowViewModal(true); }, className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors", title: "View" }, e(Eye, { size: 12 })),
                e("button", { onClick: () => { setEditUserData(u); setShowEditModal(true); }, className: "p-1.5 text-slate-500 hover:bg-muted rounded transition-colors", title: "Edit" }, e(Edit, { size: 12 })),
                e("button", { onClick: () => handleResetPassword(u), className: "p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors", title: "Reset Password" }, e(Key, { size: 12 })),
                e("button", { onClick: () => { setRoleChangeTarget(u); setNewAssignedRole(u.role); setShowChangeRoleModal(true); }, className: "p-1.5 text-violet-600 hover:bg-violet-50 rounded transition-colors", title: "Change Role" }, e(UserCog, { size: 12 })),
                e("button", { onClick: () => handleToggleStatus(u.id, u.status), className: `p-1.5 rounded transition-colors ${u.status === "Active" ? "text-orange-500 hover:bg-orange-50" : "text-emerald-600 hover:bg-emerald-50"}`, title: u.status === "Active" ? "Disable" : "Enable" }, u.status === "Active" ? e(Ban, { size: 12 }) : e(CheckCircle, { size: 12 })),
                e("button", { onClick: () => handleDeleteUser(u.id), className: "p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors", title: "Delete" }, e(Trash2, { size: 12 }))
              )
            )
          ))
        )
      )
    ),
    e("div", { className: "px-5 py-3 border-t border-border flex items-center justify-between" },
      e("p", { className: "text-xs text-muted-foreground" }, "Showing ", filteredUsers.length, " of ", usersList.length, " users"),
      e("div", { className: "flex items-center gap-1" }, [1, 2].map((p) => e("button", { key: p, className: `w-7 h-7 text-xs rounded transition-colors ${p === 1 ? "bg-blue-600 text-white font-bold" : "text-muted-foreground hover:bg-muted"}` }, p)))
    )
  );

  // ── TAB 3: ROLES ──
  const RolesTab = activeTab === "roles" && e("div", { className: "space-y-5" },
    rolesList.length === 0 ? e("div", { className: "text-center text-muted-foreground py-10" }, "No roles retrieved from database yet.") :
    e("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" },
      rolesList.map((r) => {
        const RIcon = r.icon || ShieldCheck;
        return e("div", { key: r.role, className: `border-2 rounded-xl p-5 hover:shadow-md transition-shadow ${r.color || "border-slate-300 bg-slate-50"}` },
          e("div", { className: "flex items-start justify-between mb-3" },
            e("div", { className: "flex items-center gap-2.5" },
              e("div", { className: "p-2 bg-white/70 rounded-lg" }, e(RIcon, { size: 16, className: "text-foreground" })),
              e("div", null,
                e("p", { className: "text-sm font-bold text-foreground" }, r.role),
                e("p", { className: "text-xs text-muted-foreground" }, r.count || 0, " user(s) assigned")
              )
            ),
            e("button", { onClick: () => showToast(`Editing ${r.role} role.`), className: "p-1.5 bg-white/60 hover:bg-white rounded-lg text-muted-foreground transition-colors" }, e(Edit, { size: 12 }))
          ),
          e("div", { className: "space-y-1.5" },
            e("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" }, "Permissions"),
            (r.permissions || []).map((p) => e("div", { key: p, className: "flex items-center gap-2" }, e(CheckCircle2, { size: 11, className: "text-emerald-600 flex-shrink-0" }), e("span", { className: "text-xs text-foreground" }, p)))
          ),
          e("div", { className: "flex gap-2 mt-4" },
            e("button", { onClick: () => showToast(`Viewing ${r.role} configuration.`), className: "flex-1 py-1.5 bg-white/60 hover:bg-white rounded-lg text-xs font-semibold transition-colors" }, "View Details"),
            e("button", { onClick: () => handleDuplicateRole(r), className: "px-3 py-1.5 bg-white/60 hover:bg-white rounded-lg text-xs transition-colors" }, e(Copy, { size: 11 }))
          )
        );
      })
    )
  );

  // ── TAB 4: PERMISSIONS ──
  const colRoles = ["Admin", "Legal Mgr", "Compliance", "Contract Mgr", "Dept Head", "Employee"];
  const PermissionsTab = activeTab === "permissions" && e("div", { className: "space-y-4" },
    e("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm" },
      e("div", { className: "px-5 py-3.5 border-b border-border flex items-center justify-between" },
        e("div", null,
          e("p", { className: "text-sm font-bold text-foreground" }, "Permission Matrix"),
          e("p", { className: "text-xs text-muted-foreground" }, "CRUD + Export + Approve permissions per role per module")
        ),
        e("button", { onClick: () => showToast("Permission matrix exported."), className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors" }, e(Download, { size: 11 }), " Export")
      ),
      e("div", { className: "overflow-x-auto" },
        e("table", { className: "w-full text-xs" },
          e("thead", null,
            e("tr", { className: "border-b border-border bg-muted" },
              e("th", { className: "text-left px-5 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap w-36" }, "Module"),
              colRoles.map((r) => e("th", { key: r, className: "text-center px-3 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap", colSpan: 6 }, r))
            ),
            e("tr", { className: "border-b border-border bg-muted/50" },
              e("th", { className: "px-5 py-2" }),
              colRoles.map((r) => ["C", "R", "U", "D", "Ex", "Ap"].map((perm) => e("th", { key: `${r}-${perm}`, className: "text-center px-2 py-2 text-[10px] font-semibold text-muted-foreground whitespace-nowrap" }, perm)))
            )
          ),
          e("tbody", { className: "divide-y divide-border" },
            permissionMatrix.length === 0 ? e("tr", null, e("td", { colSpan: 37, className: "text-center py-10 text-muted-foreground" }, "No permissions defined in database yet.")) :
            permissionMatrix.map((row) => e("tr", { key: row.module, className: "hover:bg-muted/30 transition-colors" },
              e("td", { className: "px-5 py-3 font-semibold text-foreground whitespace-nowrap" }, row.module),
              [row.admin, row.manager, row.compliance, row.contract_mgr, row.dept_head, row.employee].map((perms, roleIdx) => perms.map((val, permIdx) => e("td", { key: `${roleIdx}-${permIdx}`, className: "px-2 py-3 text-center" }, e(PermBox, { on: val }))))
            ))
          )
        )
      )
    )
  );

  // ── TAB 5: ACTIVITY ──
  const ActivityTab = activeTab === "activity" && e("div", { className: "space-y-5" },
    e("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4" },
      [
        { label: "Login Events", value: "186", icon: LogIn, bg: "bg-blue-50", text: "text-blue-600" },
        { label: "Failed Attempts", value: "12", icon: ShieldAlert, bg: "bg-red-50", text: "text-red-600" },
        { label: "Password Changes", value: "8", icon: Key, bg: "bg-amber-50", text: "text-amber-600" },
        { label: "Role Changes", value: "4", icon: UserCog, bg: "bg-violet-50", text: "text-violet-600" },
        { label: "Account Locks", value: "2", icon: Lock, bg: "bg-slate-50", text: "text-slate-600" }
      ].map((k) => e("div", { key: k.label, className: `${k.bg} border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm` },
        e(k.icon, { size: 18, className: k.text }),
        e("div", null, e("p", { className: `text-xl font-bold font-mono ${k.text}` }, k.value), e("p", { className: "text-xs text-muted-foreground" }, k.label))
      ))
    ),
    e("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm" },
      e("div", { className: "flex items-center justify-between px-5 py-3.5 border-b border-border" },
        e("div", null,
          e("p", { className: "text-sm font-bold text-foreground" }, "Activity Log"),
          e("p", { className: "text-xs text-muted-foreground" }, "Login history · Failed attempts · Password & role changes · Account locks")
        ),
        e("button", { onClick: handleExportActivity, className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors" }, e(Download, { size: 11 }), " Export")
      ),
      e("div", { className: "overflow-x-auto" },
        e("table", { className: "w-full text-xs" },
          e("thead", null, e("tr", { className: "border-b border-border bg-muted" }, ["Timestamp", "User", "Activity", "IP Address", "Device", "Status"].map((h) => e("th", { key: h, className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap" }, h)))),
          e("tbody", { className: "divide-y divide-border" },
            activityLogs.length === 0 ? e("tr", null, e("td", { colSpan: 6, className: "text-center py-10 text-muted-foreground" }, "No system activity recorded yet.")) :
            activityLogs.map((r, i) => e("tr", { key: i, className: `hover:bg-muted/40 transition-colors ${r.status === "Failed" ? "bg-red-50/30" : r.status === "Locked" ? "bg-amber-50/30" : ""}` },
              e("td", { className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]" }, r.ts),
              e("td", { className: "px-4 py-3" }, e("div", { className: "flex items-center gap-2" }, r.initials !== "??" ? e(Av, { initials: r.initials, size: "sm" }) : e("div", { className: "w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold" }, "?"), e("span", { className: "font-semibold text-foreground whitespace-nowrap" }, r.user))),
              e("td", { className: "px-4 py-3 text-foreground max-w-[240px]" }, e("p", { className: "truncate" }, r.activity)),
              e("td", { className: "px-4 py-3 font-mono text-muted-foreground whitespace-nowrap text-[10px]" }, r.ip),
              e("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap" }, r.device),
              e("td", { className: "px-4 py-3" }, e(Badge, { variant: r.status === "Success" ? "success" : r.status === "Failed" ? "danger" : "warning" }, r.status))
            ))
          )
        )
      )
    )
  );

  // ── INVITE USER MODAL ──
  const InviteModal = showInviteModal && e("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" },
    e("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden" },
      e("div", { className: "px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30" },
        e("h3", { className: "font-bold text-lg text-foreground" }, "Invite New User"),
        e("button", { onClick: () => setShowInviteModal(false), className: "text-muted-foreground hover:text-foreground text-xl leading-none" }, "×")
      ),
      e("form", { onSubmit: handleAddUser, className: "p-5 space-y-4" },
        e("div", null,
          e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Full Name"),
          e("input", { required: true, value: newUser.name, onChange: (ev) => setNewUser({...newUser, name: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g. Jane Doe" })
        ),
        e("div", null,
          e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Email Address"),
          e("input", { required: true, type: "email", value: newUser.email, onChange: (ev) => setNewUser({...newUser, email: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "jane@contractiq.com" })
        ),
        e("div", null,
          e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Department"),
          e("input", { required: true, value: newUser.dept, onChange: (ev) => setNewUser({...newUser, dept: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g. Legal" })
        ),
        e("div", null,
          e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Role"),
          e("select", { value: newUser.role, onChange: (ev) => setNewUser({...newUser, role: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" },
            ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"].map(r => e("option", { key: r }, r))
          )
        ),
        e("div", { className: "flex justify-end gap-3 pt-4 mt-2" },
          e("button", { type: "button", onClick: () => setShowInviteModal(false), className: "px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors" }, "Cancel"),
          e("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors" }, "Send Invite")
        )
      )
    )
  );

  return e("div", { className: "flex flex-col h-full overflow-hidden bg-background relative" },
    toast && e("div", { className: "fixed top-4 right-4 z-[70] bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2" }, e(CheckCircle2, { size: 13, className: "text-emerald-400" }), toast),

    e("div", { className: "bg-card border-b border-border px-6 pt-5 pb-0 flex-shrink-0" },
      e("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3" },
        e("div", null, e("h1", { className: "text-xl font-bold text-foreground" }, "User & Role Management"), e("p", { className: "text-xs text-muted-foreground mt-0.5" }, "Manage users, roles, permissions, and authentication across ContractIQ")),
        e("div", { className: "flex items-center gap-2" },
          e("button", { onClick: () => setShowInviteModal(true), className: "flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors" }, e(UserPlus, { size: 12 }), " Invite User"),
          e("button", { onClick: () => setShowRoleModal(true), className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors" }, e(Plus, { size: 12 }), " New Role")
        )
      ),
      e("div", { className: "flex items-center gap-0 overflow-x-auto" }, TABS.map((tab) => e("button", { key: tab.id, onClick: () => setActiveTab(tab.id), className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-blue-600 text-blue-600 border-b-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"}` }, e(tab.icon, { size: 13 }), tab.label)))
    ),
    e("div", { className: "flex-1 overflow-y-auto" }, e("div", { className: "p-5 space-y-5 max-w-[1400px] mx-auto" }, OverviewTab, UsersTab, RolesTab, PermissionsTab, ActivityTab)),
    
    // Mount the modals at the very end
    InviteModal,
    showEditModal && editUserData && e("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" },
      e("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden" },
        e("div", { className: "px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30" },
          e("h3", { className: "font-bold text-lg text-foreground" }, "Edit User Profile"),
          e("button", { onClick: () => setShowEditModal(false), className: "text-muted-foreground hover:text-foreground text-xl leading-none" }, "×")
        ),
        e("form", { onSubmit: handleEditUserSubmit, className: "p-5 space-y-4" },
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Full Name"),
            e("input", { required: true, value: editUserData.name || "", onChange: (ev) => setEditUserData({...editUserData, name: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" })
          ),
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Email Address"),
            e("input", { required: true, type: "email", value: editUserData.email || "", onChange: (ev) => setEditUserData({...editUserData, email: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" })
          ),
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Department"),
            e("input", { required: true, value: editUserData.dept || "", onChange: (ev) => setEditUserData({...editUserData, dept: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" })
          ),
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Role"),
            e("select", { value: editUserData.role || "Employee", onChange: (ev) => setEditUserData({...editUserData, role: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" },
              ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"].map(r => e("option", { key: r }, r))
            )
          ),
          e("div", { className: "flex justify-end gap-3 pt-4 mt-2" },
            e("button", { type: "button", onClick: () => setShowEditModal(false), className: "px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors" }, "Cancel"),
            e("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors" }, "Save Changes")
          )
        )
      )
    ),
    showRoleModal && e("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" },
      e("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden" },
        e("div", { className: "px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30" },
          e("h3", { className: "font-bold text-lg text-foreground" }, "Create New Role"),
          e("button", { onClick: () => setShowRoleModal(false), className: "text-muted-foreground hover:text-foreground text-xl leading-none" }, "×")
        ),
        e("form", { onSubmit: handleAddRole, className: "p-5 space-y-4" },
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Role Name"),
            e("input", { required: true, value: newRoleData.role, onChange: (ev) => setNewRoleData({...newRoleData, role: ev.target.value}), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "e.g. Audit Lead" })
          ),
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-2" }, "Assign Permissions"),
            e("div", { className: "space-y-2 max-h-40 overflow-y-auto p-2 border border-border rounded-lg bg-input-background" },
              ["Full System Access", "Contract Creation", "Contract Approval", "Legal Review", "Compliance Monitoring", "Reports & Export", "Audit Logs"].map(p =>
                e("label", { key: p, className: "flex items-center gap-2 text-xs text-foreground cursor-pointer" },
                  e("input", {
                    type: "checkbox",
                    checked: newRoleData.permissions.includes(p),
                    onChange: (ev) => {
                      const perms = ev.target.checked
                        ? [...newRoleData.permissions, p]
                        : newRoleData.permissions.filter(x => x !== p);
                      setNewRoleData({ ...newRoleData, permissions: perms });
                    },
                    className: "rounded text-blue-600 focus:ring-blue-500"
                  }),
                  p
                )
              )
            )
          ),
          e("div", { className: "flex justify-end gap-3 pt-4 mt-2" },
            e("button", { type: "button", onClick: () => setShowRoleModal(false), className: "px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors" }, "Cancel"),
            e("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors" }, "Create Role")
          )
        )
      )
    ),
    showViewModal && viewUserData && e("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" },
      e("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden" },
        e("div", { className: "px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30" },
          e("h3", { className: "font-bold text-lg text-foreground" }, "User Profile Details"),
          e("button", { onClick: () => setShowViewModal(false), className: "text-muted-foreground hover:text-foreground text-xl leading-none" }, "×")
        ),
        e("div", { className: "p-5 space-y-4" },
          e("div", { className: "flex items-center gap-3 pb-3 border-b border-border" },
            e(Av, { initials: viewUserData.initials || "US", size: "lg" }),
            e("div", null,
              e("p", { className: "font-bold text-base text-foreground" }, viewUserData.name),
              e(Badge, { variant: roleVariant[viewUserData.role] || "neutral" }, viewUserData.role)
            )
          ),
          e("div", { className: "space-y-2 text-xs" },
            e("div", { className: "flex justify-between" }, e("span", { className: "text-muted-foreground font-medium" }, "Employee ID:"), e("span", { className: "font-mono font-bold text-foreground" }, viewUserData.id)),
            e("div", { className: "flex justify-between" }, e("span", { className: "text-muted-foreground font-medium" }, "Email Address:"), e("span", { className: "font-medium text-foreground" }, viewUserData.email)),
            e("div", { className: "flex justify-between" }, e("span", { className: "text-muted-foreground font-medium" }, "Department:"), e("span", { className: "font-medium text-foreground" }, viewUserData.dept || "IT")),
            e("div", { className: "flex justify-between" }, e("span", { className: "text-muted-foreground font-medium" }, "Status:"), e(Badge, { variant: viewUserData.status === "Active" ? "success" : "neutral" }, viewUserData.status))
          ),
          e("div", { className: "flex justify-end pt-3 border-t border-border" },
            e("button", { onClick: () => setShowViewModal(false), className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors" }, "Close")
          )
        )
      )
    ),
    showChangeRoleModal && roleChangeTarget && e("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" },
      e("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden" },
        e("div", { className: "px-5 py-4 border-b border-border flex justify-between items-center bg-muted/30" },
          e("h3", { className: "font-bold text-lg text-foreground" }, `Change Role for ${roleChangeTarget.name}`),
          e("button", { onClick: () => setShowChangeRoleModal(false), className: "text-muted-foreground hover:text-foreground text-xl leading-none" }, "×")
        ),
        e("form", { onSubmit: handleRoleChangeSubmit, className: "p-5 space-y-4 text-xs" },
          e("div", null,
            e("label", { className: "block text-xs font-semibold text-muted-foreground uppercase mb-1.5" }, "Select New Role"),
            e("select", { value: newAssignedRole, onChange: (ev) => setNewAssignedRole(ev.target.value), className: "w-full px-3 py-2 border border-border rounded-lg bg-input-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500" },
              ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"].map(r => e("option", { key: r }, r))
            )
          ),
          e("div", { className: "flex justify-end gap-3 pt-4 mt-2 border-t border-border" },
            e("button", { type: "button", onClick: () => setShowChangeRoleModal(false), className: "px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors" }, "Cancel"),
            e("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors" }, "Save Role")
          )
        )
      )
    )
  );
}