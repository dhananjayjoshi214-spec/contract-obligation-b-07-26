const BASE_URL = '/api/obligations'

export async function fetchObligations(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}${query ? `?${query}` : ''}`)
  if (!res.ok) throw new Error('Failed to fetch obligations')
  return res.json()
}

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`)
  if (!res.ok) throw new Error('Failed to fetch summary')
  return res.json()
}

export async function createObligation(payload) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create obligation')
  return res.json()
}

export async function updateObligation(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update obligation')
  return res.json()
}

export async function deleteObligation(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete obligation')
  return res.json()
}
