import { useEffect, useState, useMemo } from 'react'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import ListView from './components/ListView'
import KanbanView from './components/KanbanView'
import { fetchObligations, fetchSummary } from './hooks/obligationsApi'

export default function ObligationTracker() {
  const [view, setView] = useState('kanban') // 'kanban' | 'list'
  const [search, setSearch] = useState('')
  const [obligations, setObligations] = useState([])
  const [counts, setCounts] = useState([
    { status: 'Pending', count: 0 },
    { status: 'In Progress', count: 0 },
    { status: 'Under Review', count: 0 },
    { status: 'Completed', count: 0 },
    { status: 'Overdue', count: 0 },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadData() {
    try {
      setLoading(true)
      const [obs, summary] = await Promise.all([fetchObligations(), fetchSummary()])
      setObligations(obs)
      setCounts(summary)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return obligations
    const s = search.toLowerCase()
    return obligations.filter(
      (o) =>
        o.title.toLowerCase().includes(s) ||
        o.contract.toLowerCase().includes(s) ||
        o.id.toLowerCase().includes(s)
    )
  }, [search, obligations])

  return (
    <div className="app">
      <Header />
      <Toolbar
        view={view}
        onViewChange={setView}
        search={search}
        onSearchChange={setSearch}
        counts={counts}
        onAddClick={() => alert('Hook this up to your Add Obligation modal / form.')}
      />

      {loading && <p style={{ padding: '0 24px' }}>Loading obligations…</p>}
      {error && (
        <p style={{ padding: '0 24px', color: '#b91c1c' }}>
          Could not reach the API ({error}). Is the FastAPI backend running on :8000?
        </p>
      )}

      {!loading && !error && view === 'list' && <ListView obligations={filtered} />}
      {!loading && !error && view === 'kanban' && <KanbanView obligations={filtered} />}
    </div>
  )
}
