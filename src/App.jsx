import React, { useEffect, useState } from "react";
import EarthquakeMap from "./components/EarthquakeMap.jsx";
import EarthquakeList from "./components/EarthquakeList.jsx";
import TimeSlider from "./components/TimeSlider.jsx";

export default function App() {
    const [earthquakes, setEarthquakes] = useState([]);
    const [filteredQuakes, setFilteredQuakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState([0, 24]);

    const fetchEarthquakes = async () => {
        try {
            const res = await fetch(
                "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
            );
            const data = await res.json();
            // when building features
            const features = data.features.map(f => ({
                id: f.id,
                place: f.properties.place,
                magnitude: f.properties.mag ?? 0,
                time: f.properties.time ? new Date(f.properties.time) : null,
                coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
            }));

            setEarthquakes(features);
            setFilteredQuakes(features);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching earthquake data:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEarthquakes();
    }, []);

    const handleTimeChange = (range) => {
        setTimeRange(range);
        const now = new Date();
        const filtered = earthquakes.filter((eq) => {
            const hoursAgo = (now - eq.time) / (1000 * 60 * 60);
            return hoursAgo >= range[0] && hoursAgo <= range[1];
        });
        setFilteredQuakes(filtered);
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return (
        <div className="p-6">
            <div className="text-red-600">Failed to load earthquakes.</div>
            <button onClick={fetchEarthquakes} className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">Retry</button>
        </div>
    );


    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="md:w-2/3 w-full h-screen md:h-full">
                <EarthquakeMap earthquakes={filteredQuakes} />
            </div>
            <div className="md:w-1/3 w-full flex flex-col bg-white shadow-lg p-4 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-3">🌍 Earthquake Visualizer</h1>
                <TimeSlider timeRange={timeRange} onChange={handleTimeChange} />
                <EarthquakeList earthquakes={filteredQuakes} />
            </div>
        </div>
    );
}
