import React from "react";

export default function TimeRangeSlider({ timeRange, setTimeRange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Show earthquakes in last <span className="font-semibold">{timeRange}</span> hours</label>
            <input
                type="range"
                min="1"
                max="72"
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
