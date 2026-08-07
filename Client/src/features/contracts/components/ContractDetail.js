import { useState } from "react";
import { ChevronLeft, Edit } from "lucide-react";
import { Card } from "../../../components/Card";
import { SectionLabel } from "../../../components/SectionLabel";
import { Badge, statusBadge, priorityBadge } from "../../../components/Badge";
import { useContract } from "../hooks/useContract";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}


function getDurationStats(effective, expiry) {
  if (!effective || !expiry) return null;
  const start = new Date(effective);
  const end = new Date(expiry);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(0, Math.round((end - start) / msPerDay));
  const daysElapsed = Math.min(totalDays, Math.max(0, Math.round((Date.now() - start.getTime()) / msPerDay)));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const elapsedPercent = totalDays === 0 ? 0 : Math.round((daysElapsed / totalDays) * 100);

  return { totalDays, daysElapsed, daysRemaining, elapsedPercent };
}

export function ContractDetail({ contractId, onBack }) {
  const { contract, obligations, loading, error } = useContract(contractId);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading contract…</div>;
  }
  if (error || !contract) {
    return (
      <div className="p-6 space-y-3">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={15} /> Back
        </button>
        <p className="text-sm text-red-600">{error || "Contract not found."}</p>
      </div>
    );
  }

  const duration = getDurationStats(contract.effective, contract.expiry);

  return (
    <div className="p-6 space-y-4 max-w-screen-xl">
      <div className="flex items-start gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0"
        >
          <ChevronLeft size={15} /> Back
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h1 className="text-base font-bold text-foreground">{contract.name}</h1>
            {statusBadge(contract.status)}
            <Badge variant="neutral">{contract.id}</Badge>
            {contract.type && <Badge variant="neutral">{contract.type}</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">
            {contract.party ? `Counterparty: ${contract.party}` : "No counterparty on file"} · Owner: {contract.owner || "—"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
            <Edit size={12} /> Edit Contract
          </button>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-border">
        {["overview", "obligations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <Card className="p-5">
              <SectionLabel>Contract Metadata</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Contract ID", value: contract.id },
                  { label: "Type", value: contract.type },
                  { label: "Counterparty", value: contract.party },
                  { label: "Status", value: contract.status },
                  { label: "Effective Date", value: formatDate(contract.effective) },
                  { label: "Expiry Date", value: formatDate(contract.expiry) },
                  { label: "Owner", value: contract.owner },
                  { label: "Value", value: contract.value },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value || "—"}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <SectionLabel>Legal Terms</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Governing Law", value: contract.governing_law },
                  { label: "Jurisdiction", value: contract.jurisdiction },
                  { label: "Auto Renewal", value: contract.auto_renewal },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value || "—"}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <SectionLabel>Contract Duration</SectionLabel>
              {duration ? (
                <>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Elapsed</span>
                      <span className="font-mono font-semibold text-foreground">{duration.elapsedPercent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${duration.elapsedPercent}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>{formatDate(contract.effective)}</span>
                      <span>{formatDate(contract.expiry)}</span>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-border">
                    {[
                      { label: "Days Elapsed", value: duration.daysElapsed },
                      { label: "Days Remaining", value: duration.daysRemaining },
                      { label: "Total Duration", value: `${duration.totalDays} days` },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-mono font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground py-2">Effective and expiry dates aren't both set for this contract.</p>
              )}
            </Card>
          </div>
        </div>
      )}

      {activeTab === "obligations" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["ID", "Obligation", "Assignee", "Due Date", "Priority", "Status", "Category"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {obligations.map((obl) => (
                  <tr key={obl.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{obl.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{obl.title}</td>
                    <td className="px-4 py-3 text-foreground">{obl.assignee || "—"}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{formatDate(obl.due)}</td>
                    <td className="px-4 py-3">{priorityBadge(obl.priority)}</td>
                    <td className="px-4 py-3">{statusBadge(obl.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{obl.category || "—"}</td>
                  </tr>
                ))}
                {obligations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">
                      No obligations for this contract.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
