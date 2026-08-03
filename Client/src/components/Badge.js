const VARIANT_CLASSES = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success-bg text-success-text border border-success-border",
  warning: "bg-warning-bg text-warning-text border border-warning-border",
  info: "bg-info-bg text-info-text border border-info-border",
  draft: "bg-muted text-muted-foreground border border-border",
  danger: "bg-red-50 text-red-700 border border-red-200",
};

export function Badge({ children, variant = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}

const STATUS_VARIANT = {
  Active: "success",
  "Expiring Soon": "warning",
  "Under Review": "info",
  Draft: "draft",
  Terminated: "danger",
  Completed: "success",
};

export function statusBadge(status) {
  return <Badge variant={STATUS_VARIANT[status] || "neutral"}>{status}</Badge>;
}

const PRIORITY_VARIANT = {
  High: "danger",
  Medium: "warning",
  Low: "neutral",
};

export function priorityBadge(priority) {
  return <Badge variant={PRIORITY_VARIANT[priority] || "neutral"}>{priority}</Badge>;
}
