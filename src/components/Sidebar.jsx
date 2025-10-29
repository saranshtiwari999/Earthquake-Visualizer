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
        <div className="md:w-[26rem] w-full h-screen bg-gradient-to-b from-primary via-sidebar to-accent border-r border-accent/30 shadow-xl flex flex-col justify-between p-6 overflow-y-auto text-text">
            <div>
                <div className="flex items-center justify-between mb-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-accent/40 shadow-sm">
                    <span className="text-text font-medium">Heatmap</span>
                    <ToggleSwitch enabled={showHeatmap} setEnabled={setShowHeatmap} />
                </div>

                <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl border border-accent/40 shadow-sm mb-4">
                    <h2 className="text-lg font-semibold text-accent drop-shadow-sm mb-2">Filter by Time</h2>
                    <div className="text-text/90">
                        <TimeRangeSlider timeRange={timeRange} setTimeRange={setTimeRange} />
                    </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-accent/40 shadow-md">
                    <h2 className="text-lg font-semibold text-accent drop-shadow-sm mb-3">Recent Earthquakes</h2>
                    {loading ? (
                        <p className="text-text/80 italic">Loading latest data...</p>
                    ) : (
                        <EarthquakeList earthquakes={earthquakes} onSelectQuake={onSelectQuake} />
                    )}
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-text/70">
                <p>© 2025 <span className="font-semibold text-accent">Earthquake Visualizer</span></p>
                <p className="italic text-text/50 mt-1">Built with React + Leaflet</p>
            </div>
        </div>


    );
}
