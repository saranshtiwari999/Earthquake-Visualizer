import React from "react";
import EarthquakeList from "./EarthquakeList";
import TimeRangeSlider from "./TimeRangeSlider";
import ToggleSwitch from "./ToggleSwitch";

const Sidebar = ({
                     earthquakes,
                     timeRange,
                     setTimeRange,
                     showHeatmap,
                     setShowHeatmap,
                     loading,
                 }) => {
    return (
        <div className="md:w-96 w-full bg-white shadow-xl flex flex-col justify-between p-4 overflow-y-auto border-r border-gray-200">
            <div>
                <h1 className="text-2xl font-bold text-blue-600 mb-2 flex items-center justify-between">
                    🌎 Earthquake Visualizer
                </h1>
                <p className="text-sm text-gray-500 mb-4">Data: USGS (past day)</p>

                <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-700 font-medium">Show Heatmap</label>
                    <ToggleSwitch enabled={showHeatmap} setEnabled={setShowHeatmap} />
                </div>

                <TimeRangeSlider timeRange={timeRange} setTimeRange={setTimeRange} />

                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Recent Earthquakes</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <EarthquakeList earthquakes={earthquakes} />
                    )}
                </div>
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
                © 2025 Earthquake Visualizer
            </p>
        </div>
    );
};

export default Sidebar;
