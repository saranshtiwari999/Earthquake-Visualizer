import React, { useEffect, useState } from "react";
import axios from "axios";
import EarthquakeMap from "./components/EarthquakeMap";
import Sidebar from "./components/Sidebar";

const App = () => {
    const [earthquakes, setEarthquakes] = useState([]);
    const [timeRange, setTimeRange] = useState(24);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const endTime = new Date().toISOString();
            const startTime = new Date(Date.now() - timeRange * 60 * 60 * 1000).toISOString();
            const response = await axios.get(
                `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}`
            );
            setEarthquakes(response.data.features || []);
        } catch (error) {
            console.error("Error fetching earthquake data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [timeRange]);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <Sidebar
                earthquakes={earthquakes}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                showHeatmap={showHeatmap}
                setShowHeatmap={setShowHeatmap}
                loading={loading}
            />

            {/* Map Section */}
            <div className="flex-1 relative">
                <EarthquakeMap earthquakes={earthquakes} showHeatmap={showHeatmap} />
            </div>
        </div>
    );
};

export default App;
