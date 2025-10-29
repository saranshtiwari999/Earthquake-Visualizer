import React from "react";

const EarthquakeList = ({ earthquakes }) => {
    if (!earthquakes.length) return <p className="text-gray-400">No data found</p>;

    return (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {earthquakes.map((quake) => (
                <div
                    key={quake.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 transition"
                >
                    <h3 className="font-semibold text-sm text-gray-800">
                        {quake.properties.place}
                    </h3>
                    <p className="text-xs text-gray-600">
                        Magnitude: {quake.properties.mag}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(quake.properties.time).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default EarthquakeList;
