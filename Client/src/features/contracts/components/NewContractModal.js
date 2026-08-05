import { useState } from "react";
import { X } from "lucide-react";
import { Dropdown } from "../../../components/Dropdown";
import { contractsApi } from "../services/contractsApi";

const TYPES = ["Vendor", "Employment", "Lease", "Software", "NDA", "Services", "Compliance"];
const STATUSES = ["Active", "Expiring Soon", "Under Review", "Draft", "Terminated"];

const EMPTY_FORM = {
  name: "",
  type: "Vendor",
  party: "",
  effective: "",
  expiry: "",
  status: "Draft",
  owner: "",
  value: "",
  governing_law: "State of Delaware, USA",
  jurisdiction: "US Federal Court",
  auto_renewal: "Yes — 60 days notice",
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

export function NewContractModal({ onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.party || !form.effective || !form.expiry || !form.owner) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const created = await contractsApi.create(form);
      onCreated?.(created);
      onClose();
    } catch (err) {
      setError(err.message || "Couldn't create the contract. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card rounded-t-lg">
          <div>
            <h2 className="text-sm font-bold text-foreground">New Contract</h2>
            <p className="text-xs text-muted-foreground">Add a new contract to the repository</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field label="Contract Name *">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Master Services Agreement — Acme Corp"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Type *">
              <Dropdown value={form.type} options={TYPES} onChange={(v) => update("type", v)} />
            </Field>
            <Field label="Status *">
              <Dropdown value={form.status} options={STATUSES} onChange={(v) => update("status", v)} />
            </Field>
          </div>

          <Field label="Counterparty *">
            <input
              type="text"
              value={form.party}
              onChange={(e) => update("party", e.target.value)}
              placeholder="e.g. Acme Corp"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Effective Date *">
              <input
                type="date"
                value={form.effective}
                onChange={(e) => update("effective", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Expiry Date *">
              <input
                type="date"
                value={form.expiry}
                onChange={(e) => update("expiry", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Owner *">
              <input
                type="text"
                value={form.owner}
                onChange={(e) => update("owner", e.target.value)}
                placeholder="e.g. Sarah Chen"
                className={inputClass}
              />
            </Field>
            <Field label="Contract Value">
              <input
                type="text"
                value={form.value}
                onChange={(e) => update("value", e.target.value)}
                placeholder="e.g. $2,400,000"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Governing Law">
            <input
              type="text"
              value={form.governing_law}
              onChange={(e) => update("governing_law", e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Jurisdiction">
              <input
                type="text"
                value={form.jurisdiction}
                onChange={(e) => update("jurisdiction", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Auto-Renewal">
              <input
                type="text"
                value={form.auto_renewal}
                onChange={(e) => update("auto_renewal", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create Contract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
