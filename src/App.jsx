import React from 'react'
import EarthquakeMap from './components/EarthquakeMap'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Earthquake Visualizer</h1>
          <div className="text-sm text-slate-600">Data source: USGS (past day)</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-medium mb-2">Casey — Geography Student</h2>
            <p className="text-sm text-slate-600 mb-4">Visualize recent earthquake activity around the world to understand seismic patterns.</p>
            <ul className="text-sm space-y-2">
              <li>Interact with the map: zoom & pan</li>
              <li>Click markers to see details</li>
              <li>Marker size = magnitude, color = depth</li>
            </ul>
            <hr className="my-4" />
            <p className="text-xs text-slate-500">Tip: Use mobile pinch-zoom. Markers can overlap in dense regions.</p>
          </div>

          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm overflow-hidden" style={{height: '70vh'}}>
            <EarthquakeMap />
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-slate-500 py-6">
        Built for Casey — data from USGS. 
      </footer>
    </div>
  )
}