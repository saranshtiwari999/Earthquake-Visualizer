import React from "react";

export default function TimeSlider({ timeRange, onChange }) {
    const handleChange = (e) => {
        const newRange = [0, parseInt(e.target.value)];
        onChange(newRange);
    };

    return (
        <div className="my-3">
            <label className="text-sm font-medium">
                Show earthquakes in last {timeRange[1]} hours
            </label>
            <input
                type="range"
                min="1"
                max="24"
                value={timeRange[1]}
                onChange={handleChange}
                className="w-full accent-blue-500 mt-2"
            />
        </div>
    );
}
