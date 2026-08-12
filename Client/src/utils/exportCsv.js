export function exportCsv(items = []) {
  if (!items || items.length === 0) return
  const headers = ['id', 'name', 'department', 'renewalDate', 'daysRemaining', 'status', 'priority']
  const rows = items.map(it => headers.map(h => JSON.stringify(it[h] ?? '')).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'renewals.csv'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
