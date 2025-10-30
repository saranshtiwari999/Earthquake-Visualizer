import React from "react";
import EarthquakeList from "./EarthquakeList.jsx";
import TimeRangeSlider from "./TimeRangeSlider.jsx";

export default function Sidebar({
                                    earthquakes,
                                    loading,
                                    timeRange,
                                    setTimeRange,
                                    onSelectQuake,
                                }) {
    return (
        <div className="md:w-[26rem] w-full h-full bg-gradient-to-b from-primary via-sidebar to-accent border-r border-accent/30 shadow-xl flex flex-col p-6 overflow-y-auto text-text">
            <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl border border-accent/40 shadow-sm mb-4">
                <h2 className="text-lg font-semibold text-accent drop-shadow-sm mb-2">Filter by Time</h2>
                <div className="text-text/90">
                    <TimeRangeSlider timeRange={timeRange} setTimeRange={setTimeRange} />
                </div>
            </div>

            {/* Added flex flex-col to manage child heights */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-accent/40 shadow-md flex-1 min-h-0 flex flex-col">
                <h2 className="text-lg font-semibold text-accent drop-shadow-sm mb-3">Recent Earthquakes</h2>
                {loading ? (
                    <p className="text-text/80 italic">Loading latest data...</p>
                ) : (
                    // Added a flex wrapper to allow the list to grow and scroll
                    <div className="flex-1 min-h-0">
                        <EarthquakeList earthquakes={earthquakes} onSelectQuake={onSelectQuake} />
                    </div>
                )}
            </div>
        </div>
    );
}