import React, { useEffect, useState } from 'react'
import { Upload, Building2, CheckCircle2, AlertCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function VendorForm({ onCreated }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) throw new Error('Failed to create vendor')
      const data = await res.json()
      onCreated?.(data.id, name)
      setName('')
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="mb-3 text-sm font-medium text-emerald-300">Quick vendor add</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-slate-300/70" placeholder="Vendor name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-slate-300/70" placeholder="Email (optional)" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      {error && <div className="mt-2 flex items-center gap-2 text-sm text-rose-300"><AlertCircle className="h-4 w-4" />{error}</div>}
      <button disabled={loading} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60">
        <Building2 className="h-4 w-4" /> {loading ? 'Saving...' : 'Add vendor'}
      </button>
    </form>
  )
}

function UploadStub({ onCreated }) {
  const [vendorName, setVendorName] = useState('')
  const [loading, setLoading] = useState(false)

  async function createInvoice() {
    setLoading(true)
    const res = await fetch(`${API_BASE}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendor_name: vendorName || 'Acme Ltd', total: 1250.5, ocr_status: 'processing', status: 'needs_review', line_items: [] })
    })
    const data = await res.json()
    onCreated?.(data.id)
    setLoading(false)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="mb-3 text-sm font-medium text-emerald-300">Simulate mobile upload</div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-slate-300/70" placeholder="Vendor name (optional)" value={vendorName} onChange={(e)=>setVendorName(e.target.value)} />
        <button onClick={createInvoice} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60">
          <Upload className="h-4 w-4" /> {loading ? 'Uploading...' : 'Create invoice'}
        </button>
      </div>
    </div>
  )
}

function ActivityFeed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch(`${API_BASE}/activity`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="mb-3 text-sm font-medium text-emerald-300">Recent activity</div>
      {loading ? (
        <div className="text-slate-300">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {items.map(it => (
            <li key={it.id} className="flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{it.message}</span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={load} className="mt-3 text-xs text-slate-300 underline">Refresh</button>
    </div>
  )
}

export default function DemoPanels() {
  const [lastInvoiceId, setLastInvoiceId] = useState('')
  const [lastVendor, setLastVendor] = useState('')
  return (
    <section id="upload" className="bg-slate-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <UploadStub onCreated={(id)=>setLastInvoiceId(id)} />
            <ActivityFeed />
          </div>
          <div className="space-y-4">
            <VendorForm onCreated={(id, name)=>setLastVendor(name)} />
            {(lastInvoiceId || lastVendor) && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
                <div className="text-sm text-slate-300">Last actions</div>
                {lastVendor && <div className="mt-2 text-emerald-300">Vendor saved: {lastVendor}</div>}
                {lastInvoiceId && <div className="mt-1 text-emerald-300">Invoice created: {lastInvoiceId}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
