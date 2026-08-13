import { PriorityBadge, StatusBadge } from './Badges'

export default function ListView({ obligations }) {
  return (
    <div className="list-container">
      <table className="obligation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>OBLIGATION</th>
            <th>CONTRACT</th>
            <th>ASSIGNEE</th>
            <th>DUE DATE</th>
            <th>PRIORITY</th>
            <th>STATUS</th>
            <th>CATEGORY</th>
          </tr>
        </thead>
        <tbody>
          {obligations.map((o) => (
            <tr key={o.id}>
              <td className="ob-id">{o.id}</td>
              <td className="ob-title">{o.title}</td>
              <td className="ob-contract">{o.contract}</td>
              <td className="ob-assignee-plain">{o.assignee.name}</td>
              <td className="ob-date">{o.due_date}</td>
              <td>
                <PriorityBadge priority={o.priority} />
              </td>
              <td>
                <StatusBadge status={o.status} />
              </td>
              <td className="ob-category">{o.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
