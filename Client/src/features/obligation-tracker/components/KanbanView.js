import Avatar from './Avatar'
import { PriorityBadge } from './Badges'

const COLUMNS = [
  { status: 'Pending', label: 'Pending', headerClass: 'kanban-header-pending' },
  { status: 'In Progress', label: 'In Progress', headerClass: 'kanban-header-in-progress' },
  { status: 'Under Review', label: 'Under Review', headerClass: 'kanban-header-under-review' },
  { status: 'Completed', label: 'Completed', headerClass: 'kanban-header-completed' },
  { status: 'Overdue', label: 'Overdue', headerClass: 'kanban-header-overdue' },
]

export default function KanbanView({ obligations }) {
  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const items = obligations.filter((o) => o.status === col.status)
        return (
          <div className="kanban-column" key={col.status}>
            <div className={`kanban-column-header ${col.headerClass}`}>
              <span>{col.label}</span>
              <span className="count">{items.length}</span>
            </div>

            {items.map((o) => (
              <div className="kanban-card" key={o.id}>
                <div className="kanban-card-top">
                  <span className="kanban-card-title">{o.title}</span>
                  <PriorityBadge priority={o.priority} />
                </div>
                <span className="kanban-card-contract">{o.contract}</span>
                <div className="kanban-card-footer">
                  <span className="kanban-card-assignee">
                    <Avatar assignee={o.assignee} size={22} />
                    {o.assignee.name.split(' ')[0]}
                  </span>
                  <span className="kanban-card-date">
                    <CalendarIcon /> {o.due_date.replace(', 2024', '')}
                  </span>
                </div>
                <span className="tag-pill" style={{ width: 'fit-content' }}>
                  {o.tag}
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
