// src/components/EarthquakeMap.jsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function EarthquakeMap({ earthquakes = [], showHeatmap = false }) {
    const mapRef = useRef(null);
    const markersLayerRef = useRef(null);
    const heatLayerRef = useRef(null);
    const markerRefs = useRef([]); // store marker refs for popup control

    // Initialize map once
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map", {
                center: [20, 0],
                zoom: 2,
                minZoom: 2,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);

            markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

            // handle flyToMarker event from sidebar
            function handleFly(e) {
                const coords = e.detail;
                if (!coords || !Array.isArray(coords) || coords.length < 2) return;

                const [lat, lon] = coords;
                const marker = markerRefs.current.find(
                    (m) => m.lat === lat && m.lon === lon
                );

                // smooth zoom & open popup
                mapRef.current.flyTo([lat, lon], 6, { duration: 1.0 });
                if (marker?.instance) {
                    setTimeout(() => {
                        marker.instance.openPopup();
                    }, 1000);
                }
            }

            window.addEventListener("flyToMarker", handleFly);

            return () => {
                window.removeEventListener("flyToMarker", handleFly);
                mapRef.current?.remove();
                mapRef.current = null;
            };
        }
    }, []);

    // Update markers & heatmap when earthquakes or showHeatmap change
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        markersLayerRef.current.clearLayers();
        markerRefs.current = [];
        const heatPoints = [];

        earthquakes.forEach((q) => {
            const coords = q.geometry?.coordinates || q.coords || [0, 0];
            const lon = coords[0];
            const lat = coords[1];
            const mag = q.properties?.mag ?? q.magnitude ?? 1;

            const radius = Math.max((mag || 1) * 2.5, 4);
            const color = mag >= 5 ? "#d62728" : mag >= 3 ? "#ff7f0e" : "#f7b267";

            const circle = L.circleMarker([lat, lon], {
                radius,
                color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: 0.6,
            });

            const place = q.properties?.place ?? q.place ?? "Unknown location";
            const time = q.properties?.time ? new Date(q.properties.time) : q.time ?? null;
            const timeStr = time ? new Date(time).toLocaleString() : "—";

            circle.bindPopup(
                `<div style="min-width:160px"><strong>${place}</strong><br/>Magnitude: ${mag}<br/>Time: ${timeStr}</div>`
            );

            circle.addTo(markersLayerRef.current);
            markerRefs.current.push({ lat, lon, instance: circle });
            heatPoints.push([lat, lon, Math.max(mag / 5, 0.2)]);
        });

        // manage heatmap
        if (heatLayerRef.current) {
            map.removeLayer(heatLayerRef.current);
            heatLayerRef.current = null;
        }

        if (showHeatmap && heatPoints.length > 0) {
            heatLayerRef.current = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 7 });
            heatLayerRef.current.addTo(map);
        }
    }, [earthquakes, showHeatmap]);

    return <div id="map" className="h-full w-full" />;
}
