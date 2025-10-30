import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import EarthquakeMap from "./components/EarthquakeMap.jsx";
import { fetchEarthquakes } from "./api/fetchEarthquakes.js";

export default function App() {
    const [earthquakes, setEarthquakes] = useState([]); // array of GeoJSON feature objects
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(24); // hours
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [selectedQuake, setSelectedQuake] = useState(null); // feature or null
    const [showSidebar, setShowSidebar] = useState(true);
    const [showMap, setShowMap] = useState(true);
    const [baseMap, setBaseMap] = useState("default");

    const loadData = useCallback(async (hours) => {
        setLoading(true);
        const data = await fetchEarthquakes(hours);
        setEarthquakes(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData(timeRange);
    }, [loadData, timeRange]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar
                projectName="🌎 Earthquake Visualizer"
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                baseMap={baseMap}
                setBaseMap={setBaseMap}
            />

            <div className="flex flex-1 overflow-hidden">
                {showSidebar && (
                    <Sidebar
                        earthquakes={earthquakes}
                        loading={loading}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        showHeatmap={showHeatmap}
                        setShowHeatmap={setShowHeatmap}
                        onSelectQuake={(feature) => {
                            setSelectedQuake(feature);
                            // On mobile, hide sidebar when a quake is selected
                            if (window.innerWidth < 768) {
                                setShowSidebar(false);
                            }
                        }}
                    />
                )}

                {showMap ? (
                    <div className="flex-1 relative">
                        <EarthquakeMap
                            earthquakes={earthquakes}
                            showHeatmap={showHeatmap}
                            selectedQuake={selectedQuake}
                            baseMap={baseMap}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Map is hidden — toggle it from the navbar.
                    </div>
                )}
            </div>
        </div>
    );
}