import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

/**
 * EarthquakeMap uses raw Leaflet (not React-Leaflet)
 * - creates map once
 * - keeps marker instances in markerRefs for popup control
 * - listens to selectedQuake prop to fly & open popup
 * - toggles heatmap via showHeatmap
 * - supports baseMap switching via baseMap prop
 */

export default function EarthquakeMap({ earthquakes = [], showHeatmap = false, selectedQuake = null, baseMap = "default", showSidebar }) {
    const mapRef = useRef(null);
    const markersLayerRef = useRef(null);
    const heatLayerRef = useRef(null);
    const markerRefs = useRef([]); // {lat, lon, instance}

    useEffect(() => {
        if (mapRef.current) return; // init once

        // create map
        mapRef.current = L.map("map", {
            center: [20, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 18,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        // layer group for markers
        markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

        return () => {
            try {
                mapRef.current.remove();
            } catch (err) {
                /* ignore */
            }
            mapRef.current = null;
        };
    }, []);

    // update basemap when baseMap changes
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // remove existing tile layers (keep overlays)
        map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });

        const baseMaps = {
            default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            satellite: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            grayscale: "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
            ocean: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=YOUR_API_KEY",
        };

        const url = baseMaps[baseMap] || baseMaps.default;

        L.tileLayer(url, { maxZoom: 18, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    }, [baseMap]);

    // Invalidate map size when sidebar visibility changes
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Add a small delay to allow the sidebar animation to complete
        setTimeout(() => {
            map.invalidateSize({ animate: true });
        }, 300); // 300ms delay
    }, [showSidebar]);

    // update markers + heatmap whenever earthquake data or showHeatmap changes
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !markersLayerRef.current) return;

        // clear previous markers
        markersLayerRef.current.clearLayers();
        markerRefs.current = [];

        // collect heat points
        const heatPoints = [];

        earthquakes.forEach((feat) => {
            // coordinates: [lon, lat, depth?]
            const coords = feat.geometry?.coordinates || [0, 0];
            const lon = coords[0];
            const lat = coords[1];
            const mag = feat.properties?.mag ?? 0;

            const radius = Math.max(4, (mag || 1) * 2.5);
            const color = mag >= 5 ? "#d62728" : mag >= 3 ? "#ff7f0e" : "#f7b267";

            const circle = L.circleMarker([lat, lon], {
                radius,
                color,
                fillColor: color,
                fillOpacity: 0.85,
                weight: 0.6,
            });

            const place = feat.properties?.place ?? "Unknown location";
            const time = feat.properties?.time ? new Date(feat.properties.time).toLocaleString() : "—";

            circle.bindPopup(`<div style="min-width:180px"><strong>${place}</strong><br/>Magnitude: ${mag}<br/>Time: ${time}</div>`);
            circle.addTo(markersLayerRef.current);

            markerRefs.current.push({ lat, lon, instance: circle });
            heatPoints.push([lat, lon, Math.max(mag / 5, 0.2)]);
        });

        // heatmap handling
        if (heatLayerRef.current) {
            try {
                map.removeLayer(heatLayerRef.current);
            } catch (err) {}
            heatLayerRef.current = null;
        }

        if (showHeatmap && heatPoints.length) {
            heatLayerRef.current = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 7 }).addTo(map);
        }
    }, [earthquakes, showHeatmap]);

    // when selectedQuake changes, fly to marker & open popup
    useEffect(() => {
        if (!selectedQuake || !mapRef.current || !markerRefs.current) return;
        const coords = selectedQuake.geometry?.coordinates || selectedQuake.coords || [0, 0];
        const lon = coords[0];
        const lat = coords[1];

        // fly
        mapRef.current.flyTo([lat, lon], 6, { duration: 1.0 });

        // find marker and open popup after animation
        const marker = markerRefs.current.find((m) => m.lat === lat && m.lon === lon);
        if (marker?.instance) {
            setTimeout(() => {
                try {
                    marker.instance.openPopup();
                } catch (err) {}
            }, 900);
        }
    }, [selectedQuake]);

    return <div id="map" className="w-full h-full" />;
}