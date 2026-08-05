import { Search, Bell } from "lucide-react";

export function Navbar({ title, subtitle, userName = "Sarah Chen", userRole = "Legal Manager" }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div>
        <h1 className="text-sm font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contracts, obligations…"
            className="pl-8 pr-3 py-1.5 bg-muted border border-border rounded-lg text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
            {userName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="text-xs">
            <p className="font-semibold text-foreground leading-tight">{userName}</p>
            <p className="text-muted-foreground leading-tight">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
