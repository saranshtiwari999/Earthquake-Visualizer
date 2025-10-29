import React from "react";
import EarthquakeList from "./EarthquakeList.jsx";
import TimeRangeSlider from "./TimeRangeSlider.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

export default function Sidebar({
                                    earthquakes,
                                    loading,
                                    timeRange,
                                    setTimeRange,
                                    showHeatmap,
                                    setShowHeatmap,
                                    onSelectQuake,
                                }) {
    return (
        <div className="md:w-96 w-full h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-blue-100 border-r border-indigo-200 shadow-xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
                <div className="flex items-center justify-between mb-4 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-indigo-100 shadow-sm">
                    <span className="text-gray-700 font-medium">Heatmap</span>
                    <ToggleSwitch enabled={showHeatmap} setEnabled={setShowHeatmap} />
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-indigo-100 shadow-sm mb-4">
                    <h2 className="text-lg font-semibold text-indigo-700 mb-2">Filter by Time</h2>
                    <TimeRangeSlider timeRange={timeRange} setTimeRange={setTimeRange} />
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 shadow-md">
                    <h2 className="text-lg font-semibold text-indigo-700 mb-3">Recent Earthquakes</h2>
                    {loading ? (
                        <p className="text-gray-500 italic">Loading latest data...</p>
                    ) : (
                        <EarthquakeList earthquakes={earthquakes} onSelectQuake={onSelectQuake} />
                    )}
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
                <p>© 2025 <span className="font-semibold text-indigo-600">Earthquake Visualizer</span></p>
                <p className="italic text-gray-400 mt-1">Built with React + Leaflet</p>
            </div>
        </div>
    );
}
