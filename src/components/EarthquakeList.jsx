import React from "react";

export default function EarthquakeList({ earthquakes }) {
    if (earthquakes.length === 0)
        return <p className="text-gray-500">No earthquakes in this range.</p>;

    return (
        <div className="grid gap-3 mt-3">
            {earthquakes.map((eq) => (
                <div
                    key={eq.id}
                    className="p-3 rounded-lg border hover:shadow bg-gray-50 transition"
                >
                    <h2 className="font-semibold">{eq.place}</h2>
                    <p className="text-sm text-gray-600">
                        Magnitude: <strong>{eq.magnitude}</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                        {eq.time.toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
