// src/components/EarthquakeMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";

function MapController() {
    const map = useMap();
    useEffect(() => {
        function handle(e) {
            const coords = e.detail; // [lat, lng]
            if (!coords || !Array.isArray(coords)) return;
            map.flyTo(coords, 6, { duration: 1.0 });
        }
        window.addEventListener("flyToMarker", handle);
        return () => window.removeEventListener("flyToMarker", handle);
    }, [map]);
    return null;
}

// add inside EarthquakeMap file
function HeatmapLayer({ earthquakes }) {
    const map = useMap();
    useEffect(() => {
        if (!earthquakes || earthquakes.length === 0) return;
        const pts = earthquakes.map(q => [q.coords[0], q.coords[1], q.magnitude || 0.5]);
        const heat = L.heatLayer(pts, { radius: 25, blur: 15, maxZoom: 7 });
        heat.addTo(map);
        return () => {
            if (map && heat) map.removeLayer(heat);
        };
    }, [map, earthquakes]);
    return null;
}


export default function EarthquakeMap({ earthquakes }) {
    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-full w-full"
            scrollWheelZoom
        >
            <MapController />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {earthquakes.map((eq) => (
                    <CircleMarker
                        key={eq.id}
                        center={eq.coords}
                        radius={Math.max((eq.magnitude ?? 1) * 2, 3)}
                        pathOptions={{
                            color: eq.magnitude >= 5 ? "red" : eq.magnitude >= 3 ? "orange" : "yellow",
                            fillOpacity: 0.6,
                        }}
                    >
                        <Popup>
                            <strong>{eq.place}</strong>
                            <br />
                            Magnitude: {eq.magnitude ?? "—"}
                            <br />
                            Time: {eq.time?.toLocaleString() ?? "—"}
                        </Popup>
                    </CircleMarker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
