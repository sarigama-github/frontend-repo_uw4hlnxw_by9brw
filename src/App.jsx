import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import DemoPanels from './components/DemoPanels'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <DemoPanels />
      <Footer />
    </div>
  )
}

export default App
