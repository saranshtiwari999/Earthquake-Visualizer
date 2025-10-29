// src/components/EarthquakeList.jsx
import React from "react";

export default function EarthquakeList({ earthquakes = [] }) {
    if (!earthquakes || earthquakes.length === 0) {
        return (
            <p className="text-gray-400 text-center py-10 italic">
                🌎 No earthquakes found for this range.
            </p>
        );
    }

    return (
        <div className="max-h-[65vh] overflow-y-auto space-y-3 p-2">
            {earthquakes.map((q) => {
                const id = q.id ?? q.properties?.id ?? Math.random().toString(36).slice(2, 9);
                const place = q.properties?.place ?? q.place ?? "Unknown location";
                const mag = q.properties?.mag ?? q.magnitude ?? "—";
                const time = q.properties?.time
                    ? new Date(q.properties.time)
                    : q.time
                        ? new Date(q.time)
                        : null;

                const coords = q.geometry?.coordinates
                    ? [q.geometry.coordinates[1], q.geometry.coordinates[0]]
                    : q.coords
                        ? [q.coords[0], q.coords[1]]
                        : null;

                // Determine color by magnitude
                let magColor = "bg-green-500";
                if (mag >= 5) magColor = "bg-red-600";
                else if (mag >= 3) magColor = "bg-orange-500";
                else if (mag >= 2) magColor = "bg-yellow-400";

                return (
                    <div
                        key={id}
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            if (coords) {
                                window.dispatchEvent(new CustomEvent("flyToMarker", { detail: coords }));
                            }
                        }}
                        onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && coords) {
                                window.dispatchEvent(new CustomEvent("flyToMarker", { detail: coords }));
                            }
                        }}
                        className="group relative overflow-hidden rounded-xl border border-gray-200/40 backdrop-blur-md bg-white/80 dark:bg-gray-800/70 dark:border-gray-700/40 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug w-[70%]">
                                    {place}
                                </div>
                                <span
                                    className={`text-white text-xs font-bold px-2 py-1 rounded-full ${magColor}`}
                                >
                  M {mag}
                </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                {time ? time.toLocaleString() : "—"}
                            </div>
                        </div>

                        {/* Decorative colored strip on hover */}
                        <div
                            className={`absolute bottom-0 left-0 h-1 w-full transition-all duration-500 ease-out scale-x-0 group-hover:scale-x-100 ${magColor}`}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
}
