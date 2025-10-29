import React from "react";

const TimeRangeSlider = ({ timeRange, setTimeRange }) => (
    <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Show earthquakes in last {timeRange} hours
        </label>
        <input
            type="range"
            min="1"
            max="48"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full accent-blue-600"
        />
    </div>
);

export default TimeRangeSlider;
