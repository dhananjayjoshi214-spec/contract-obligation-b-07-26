import { useState } from "react";
import { Search, Download, Plus, Eye, Edit } from "lucide-react";
import { Card } from "../../../components/Card";
import { Dropdown } from "../../../components/Dropdown";
import { statusBadge } from "../../../components/Badge";
import { useContracts } from "../hooks/useContracts";
import { NewContractModal } from "./NewContractModal";

const TYPE_OPTIONS = ["All", "Vendor", "Employment", "Lease", "Software", "NDA", "Services", "Compliance"];
const STATUS_OPTIONS = ["All", "Active", "Expiring Soon", "Under Review", "Draft", "Terminated"];

export function ContractRepository({ onSelectContract }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewContract, setShowNewContract] = useState(false);

  const { contracts, summary, loading, error, refetch } = useContracts({
    search,
    type: typeFilter,
    status: statusFilter,
  });

  return (
    <div className="p-6 space-y-4 max-w-screen-xl">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, party, or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <Dropdown value={typeFilter} options={TYPE_OPTIONS} onChange={setTypeFilter} className="w-36" />
        <Dropdown value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} className="w-40" />
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <Download size={13} /> Export
          </button>
          <button
            onClick={() => setShowNewContract(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={13} /> New Contract
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Contracts", value: summary.total },
          { label: "Active", value: summary.active },
          { label: "Expiring Soon", value: summary.expiring_soon },
          { label: "Showing", value: summary.showing },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-xl font-bold font-mono text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted">
                {["ID", "Contract Name", "Type", "Counterparty", "Effective", "Expiry", "Status", "Owner", "Value", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-muted/50 transition-colors group cursor-pointer">
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.id}</td>
                  <td className="px-4 py-3 max-w-xs">
                    <button
                      onClick={() => onSelectContract(contract.id)}
                      className="font-semibold text-foreground group-hover:text-blue-600 transition-colors text-left truncate block max-w-xs"
                    >
                      {contract.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{contract.type}</td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.party}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.effective}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{contract.expiry}</td>
                  <td className="px-4 py-3">{statusBadge(contract.status)}</td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">{contract.owner}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-foreground whitespace-nowrap">{contract.value}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectContract(contract.id)}
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        <Eye size={13} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Edit size={13} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Download size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && contracts.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              {error ? `Couldn't load contracts: ${error}` : "No contracts match your search criteria."}
            </div>
          )}
          {loading && (
            <div className="text-center py-12 text-sm text-muted-foreground">Loading contracts…</div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {contracts.length} of {summary.total} contracts
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 text-xs rounded transition-colors ${
                  p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {showNewContract && (
        <NewContractModal onClose={() => setShowNewContract(false)} onCreated={() => refetch()} />
      )}
    </div>
  );
}
