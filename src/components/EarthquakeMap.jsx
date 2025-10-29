import React, { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// USGS feed (past day, all earthquakes)
const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

// Helper: color by depth
function depthColor(depth) {
  // deeper -> darker
  if (depth >= 300) return '#2b0b57'
  if (depth >= 100) return '#7b2cbf'
  if (depth >= 50) return '#e63946'
  if (depth >= 20) return '#f77f00'
  return '#ffd166'
}

// Helper: radius by magnitude
function radiusByMag(mag) {
  if (!mag || mag <= 0) return 4
  return 4 + mag * 4 // tweak multiplier for good visuals
}

// Small component to recenter map to show all features bounds (optional)
function FitBounds({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (!bounds || bounds.length === 0) return
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, bounds])
  return null
}

export default function EarthquakeMap() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(USGS_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`Network response was not ok: ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Fetch error', err)
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  // Precompute bounds for FitBounds
  const bounds = useMemo(() => {
    if (!data?.features) return []
    const coords = data.features
      .map((f) => f.geometry?.coordinates)
      .filter(Boolean)
      .map(([lng, lat]) => [lat, lng])
    return coords
  }, [data])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Loading earthquake data…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 font-medium">Unable to load data</div>
        <div className="text-sm text-slate-600 mt-2">{error}</div>
      </div>
    )
  }

  const features = data?.features || []
  if (features.length === 0) {
    return (
      <div className="p-6 text-center text-slate-600">No recent earthquakes found.</div>
    )
  }

  // Default center
  const center = [20, 0]

  return (
    <div className="h-full w-full">
      <MapContainer center={center} zoom={2} scrollWheelZoom={true} className="h-full w-full" zoomControl={false}>
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fit to data bounds on initial load */}
        {bounds.length > 0 && <FitBounds bounds={bounds} />}

        {/* Render each earthquake as a CircleMarker */}
        {features.map((feature) => {
          const [lng, lat, depth] = feature.geometry.coordinates
          const mag = feature.properties.mag
          const place = feature.properties.place
          const time = feature.properties.time
          const id = feature.id

          return (
            <CircleMarker
              key={id}
              center={[lat, lng]}
              radius={radiusByMag(mag)}
              pathOptions={{ color: depthColor(depth), fillColor: depthColor(depth), fillOpacity: 0.8, weight: 0.5 }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{place}</div>
                  <div>Magnitude: {mag ?? '—'}</div>
                  <div>Depth: {depth} km</div>
                  <div>Time: {new Date(time).toLocaleString()}</div>
                  <div className="mt-1 text-xs text-slate-500">ID: {id}</div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

      </MapContainer>

      {/* Floating legend */}
      <div className="absolute left-4 bottom-4 bg-white p-3 rounded-lg shadow-md text-xs">
        <div className="font-semibold text-sm">Legend</div>
        <div className="mt-2">
          <div className="flex items-center gap-2"><span style={{width:12,height:12,background:'#ffd166',display:'inline-block',borderRadius:6}} /> Shallow (&lt; 20 km)</div>
          <div className="flex items-center gap-2 mt-1"><span style={{width:12,height:12,background:'#f77f00',display:'inline-block',borderRadius:6}} /> 20–50 km</div>
          <div className="flex items-center gap-2 mt-1"><span style={{width:12,height:12,background:'#e63946',display:'inline-block',borderRadius:6}} /> 50–100 km</div>
          <div className="flex items-center gap-2 mt-1"><span style={{width:12,height:12,background:'#7b2cbf',display:'inline-block',borderRadius:6}} /> 100–300 km</div>
          <div className="flex items-center gap-2 mt-1"><span style={{width:12,height:12,background:'#2b0b57',display:'inline-block',borderRadius:6}} /> 300+ km</div>
        </div>
      </div>
    </div>
  )
}
