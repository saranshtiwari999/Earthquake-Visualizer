import React from "react";

/**
 * EarthquakeList
 * - earthquakes: array of GeoJSON features
 * - onSelectQuake: callback(feature)
 */
export default function EarthquakeList({ earthquakes = [], onSelectQuake = () => {} }) {
    if (!earthquakes.length) {
        return <p className="text-gray-500 italic">No earthquakes found in this range.</p>;
    }

    return (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {earthquakes.map((f) => {
                const id = f.id || f.properties?.code || Math.random().toString(36).slice(2, 9);
                const place = f.properties?.place ?? "Unknown location";
                const mag = f.properties?.mag ?? 0;
                const time = f.properties?.time ? new Date(f.properties.time) : null;

                let magColor = "bg-green-500";
                if (mag >= 5) magColor = "bg-red-600";
                else if (mag >= 3) magColor = "bg-orange-500";
                else if (mag >= 2) magColor = "bg-yellow-400";

                return (
                    <div
                        key={id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectQuake(f)}
                        onKeyDown={(e) => (e.key === "Enter" ? onSelectQuake(f) : null)}
                        className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-200 hover:shadow-md cursor-pointer transition"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="text-sm font-semibold text-gray-800 leading-snug">{place}</div>
                            <div className="flex flex-col items-end">
                <span className={`text-white text-xs font-bold px-2 py-1 rounded-full ${magColor}`}>
                  M {mag}
                </span>
                                <div className="text-xs text-gray-500 mt-2">{time ? time.toLocaleString() : "—"}</div>
                            </div>
                        </div>

                        <div className="mt-2 h-1 bg-transparent group-hover:bg-gradient-to-r from-transparent to-indigo-300 rounded"></div>
                    </div>
                );
            })}
        </div>
    );
}
