import { useState } from "react";
import { ChevronLeft, Download, Edit, CheckCircle, Paperclip } from "lucide-react";
import { Card } from "../../../components/Card";
import { SectionLabel } from "../../../components/SectionLabel";
import { Badge, statusBadge, priorityBadge } from "../../../components/Badge";
import { useContract } from "../hooks/useContract";

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

  const approvalSteps = contract.approvalSteps || [];
  const versions = contract.versions || [];
  const documents = contract.documents || [];
  const keyTerms = contract.keyTerms || [];
  const duration = contract.duration || {};

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
            {contract.currentVersion && <Badge variant="neutral">{contract.currentVersion}</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">
            {contract.type} · {contract.party} · Owner: {contract.owner}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-foreground hover:bg-muted transition-colors">
            <Download size={12} /> Download PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
            <Edit size={12} /> Edit Contract
          </button>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-border">
        {["overview", "obligations", "versions", "documents"].map((tab) => (
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
                  { label: "Contract Type", value: contract.type },
                  { label: "Counterparty", value: contract.party },
                  { label: "Effective Date", value: contract.effective },
                  { label: "Expiration Date", value: contract.expiry },
                  { label: "Contract Value", value: contract.value },
                  { label: "Assigned Owner", value: contract.owner },
                  { label: "Governing Law", value: contract.governing_law },
                  { label: "Jurisdiction", value: contract.jurisdiction },
                  { label: "Auto-Renewal", value: contract.auto_renewal },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value ?? "—"}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <SectionLabel>Key Terms</SectionLabel>
              <div className="space-y-3">
                {keyTerms.map((t) => (
                  <div key={t.term} className="border-l-2 border-blue-200 pl-3.5">
                    <p className="text-xs font-semibold text-foreground">{t.term}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.detail}</p>
                  </div>
                ))}
                {keyTerms.length === 0 && (
                  <p className="text-xs text-muted-foreground py-2">No key terms recorded for this contract.</p>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <SectionLabel>Contract Duration</SectionLabel>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Elapsed</span>
                  <span className="font-mono font-semibold text-foreground">
                    {duration.elapsedPercent != null ? `${duration.elapsedPercent}%` : "—"}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${duration.elapsedPercent ?? 0}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>{contract.effective}</span>
                  <span>{contract.expiry}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-border">
                {[
                  { label: "Days Elapsed", value: duration.daysElapsed },
                  { label: "Days Remaining", value: duration.daysRemaining },
                  { label: "Total Duration", value: duration.totalDays != null ? `${duration.totalDays} days` : undefined },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-semibold text-foreground">{item.value ?? "—"}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <SectionLabel>Approval Workflow</SectionLabel>
              <div>
                {approvalSteps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          step.status === "completed"
                            ? "bg-emerald-500"
                            : step.status === "current"
                            ? "bg-blue-500 ring-3 ring-blue-100"
                            : "bg-muted border border-border"
                        }`}
                      >
                        {step.status === "completed" && <CheckCircle size={11} className="text-white" />}
                        {step.status === "current" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      {i < approvalSteps.length - 1 && (
                        <div
                          className={`w-px my-0.5 ${step.status === "completed" ? "bg-emerald-300" : "bg-border"}`}
                          style={{ height: 22 }}
                        />
                      )}
                    </div>
                    <div className="pb-3 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-tight">{step.step}</p>
                      <p className="text-xs text-muted-foreground">{step.person}</p>
                      <p className="text-xs text-muted-foreground font-mono">{step.date}</p>
                    </div>
                  </div>
                ))}
                {approvalSteps.length === 0 && (
                  <p className="text-xs text-muted-foreground py-2">No approval workflow recorded for this contract.</p>
                )}
              </div>
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
                    <td className="px-4 py-3 text-foreground">{obl.assignee}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{obl.due}</td>
                    <td className="px-4 py-3">{priorityBadge(obl.priority)}</td>
                    <td className="px-4 py-3">{statusBadge(obl.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{obl.category}</td>
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

      {activeTab === "versions" && (
        <Card className="p-5">
          <SectionLabel>Version History</SectionLabel>
          <div className="divide-y divide-border">
            {versions.map((v) => (
              <div key={v.ver} className="flex items-center gap-4 py-3">
                <Badge variant="neutral">{v.ver}</Badge>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{v.note}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {v.author} · {v.date}
                  </p>
                </div>
                <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline whitespace-nowrap">
                  <Download size={11} /> Download
                </button>
              </div>
            ))}
            {versions.length === 0 && (
              <p className="text-xs text-muted-foreground py-4">No version history for this contract.</p>
            )}
          </div>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card className="p-5">
          <SectionLabel>Attached Documents</SectionLabel>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center flex-shrink-0">
                  <Paperclip size={12} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} · {doc.date}
                  </p>
                </div>
                <Badge variant="neutral">{doc.type}</Badge>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Download size={13} />
                </button>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="text-xs text-muted-foreground py-4">No documents attached to this contract.</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
