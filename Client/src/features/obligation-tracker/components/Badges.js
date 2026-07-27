const PRIORITY_CLASS = {
  Critical: 'badge-critical',
  High: 'badge-high',
  Medium: 'badge-medium',
  Low: 'badge-low',
}

const STATUS_CLASS = {
  Overdue: 'badge-overdue',
  Pending: 'badge-pending',
  'Under Review': 'badge-under-review',
  'In Progress': 'badge-in-progress',
  Completed: 'badge-completed',
}

export function PriorityBadge({ priority }) {
  return <span className={`badge ${PRIORITY_CLASS[priority] ?? ''}`}>{priority}</span>
}

export function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_CLASS[status] ?? ''}`}>{status}</span>
}
