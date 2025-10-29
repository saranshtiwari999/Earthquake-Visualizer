// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import EarthquakeMap from "./components/EarthquakeMap.jsx";
import EarthquakeList from "./components/EarthquakeList.jsx";
import TimeSlider from "./components/TimeSlider.jsx";

/**
 * App - top-level component
 * - fetches USGS GeoJSON
 * - keeps state: earthquakes, filteredQuakes, loading, error, timeRange
 * - renders map + controls + list
 */

export default function App() {
    const [earthquakes, setEarthquakes] = useState([]); // all fetched quakes
    const [filteredQuakes, setFilteredQuakes] = useState([]); // filtered by time
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // <--- ensure error state exists
    const [timeRange, setTimeRange] = useState([0, 24]); // [minHoursAgo, maxHoursAgo]

    const USGS_URL =
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

    const fetchEarthquakes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(USGS_URL);
            if (!res.ok) throw new Error(`Network error: ${res.status}`);
            const json = await res.json();
            if (!json?.features) throw new Error("Invalid data from USGS");

            const features = json.features.map((f) => {
                const mag = f.properties?.mag ?? 0;
                const t = f.properties?.time ?? null;
                const coords = f.geometry?.coordinates ?? [0, 0];
                return {
                    id: f.id,
                    place: f.properties?.place ?? "Unknown location",
                    magnitude: mag,
                    time: t ? new Date(t) : null,
                    coords: [coords[1] ?? 0, coords[0] ?? 0],
                };
            });

            setEarthquakes(features);
            // set initial filtered (default = last 24h)
            const now = Date.now();
            const cutoff = now - 24 * 60 * 60 * 1000;
            setFilteredQuakes(features.filter((q) => !q.time || q.time.getTime() >= cutoff));
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message ?? "Unknown error");
            setEarthquakes([]);
            setFilteredQuakes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEarthquakes();
    }, [fetchEarthquakes]);

    // Handler for time slider changes - expects range like [0, hoursAgo]
    const handleTimeChange = (range) => {
        setTimeRange(range);
        const now = Date.now();
        const minTs = now - range[1] * 60 * 60 * 1000;
        const maxTs = now - range[0] * 60 * 60 * 1000;
        const filtered = earthquakes.filter((q) => {
            if (!q.time) return false; // ignore quakes without timestamp
            const t = q.time.getTime();
            return t >= minTs && t <= maxTs;
        });
        setFilteredQuakes(filtered);
    };

    // Basic loading / error UI
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-gray-600">Loading earthquake data…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-4">
                <div className="text-red-600 font-semibold mb-3">Failed to load data</div>
                <div className="text-gray-700 mb-4">{error}</div>
                <div className="space-x-2">
                    <button
                        onClick={fetchEarthquakes}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Normal UI
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left: Map */}
            <div className="md:w-2/3 w-full h-1/2 md:h-full">
                <EarthquakeMap earthquakes={filteredQuakes} />
            </div>

            {/* Right: Controls + list */}
            <div className="md:w-1/3 w-full h-1/2 md:h-full bg-gray-50 p-4 overflow-y-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">🌍 Earthquake Visualizer</h1>
                    <div className="text-xs text-gray-500">Data: USGS (past day)</div>
                </div>

                <div className="mb-4">
                    <TimeSlider timeRange={timeRange} onChange={handleTimeChange} />
                </div>

                <EarthquakeList earthquakes={filteredQuakes} />
            </div>
        </div>
    );
}
