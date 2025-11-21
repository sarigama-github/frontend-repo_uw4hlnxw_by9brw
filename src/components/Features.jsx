import React from 'react'
import { Camera, FileText, Brain, CheckCircle2, WifiOff, BellRing, Users, Activity } from 'lucide-react'

const features = [
  { icon: Camera, title: 'Capture & Upload', desc: 'Scan with auto-crop, batch upload PDFs and images, real-time OCR progress.' },
  { icon: Brain, title: 'OCR & Extraction', desc: 'Pull invoice numbers, vendors, dates, line items, totals with confidence scoring.' },
  { icon: CheckCircle2, title: 'Validation & Approvals', desc: 'Thumb-friendly edits, quick approve/reject gestures, rule-based routing.' },
  { icon: Users, title: 'Vendor Management', desc: 'Add vendors, view all invoices per vendor, flag risk & compliance.' },
  { icon: Activity, title: 'Activity Feed', desc: 'Live feed of uploads, approvals, comments, assignments, and rule triggers.' },
  { icon: BellRing, title: 'Push Notifications', desc: 'Actionable alerts for OCR done, approvals required, and assignments.' },
  { icon: WifiOff, title: 'Offline First', desc: 'Queue uploads and approvals, background sync when you’re back online.' },
  { icon: FileText, title: 'Audit Trails', desc: 'Accurate records and compliance-friendly logs across teams.' },
]

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Purpose-built for mobile operations</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-300">Speed, accuracy, and convenience for invoice automation on the go.</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10">
              <Icon className="h-6 w-6 text-emerald-400" />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-300/90">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
