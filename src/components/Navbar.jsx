import React from "react";

export default function Navbar({
                                   projectName,
                                   showSidebar,
                                   setShowSidebar,
                                   showMap,
                                   setShowMap,
                                   baseMap,
                                   setBaseMap,
                               }) {
    return (
        <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow">
            <div className="flex items-center gap-3">
                <div className="text-xl font-bold tracking-tight">{projectName}</div>
                <div className="hidden md:inline-block text-sm text-white/80">Visualize recent earthquake activity</div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${showSidebar ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
                >
                    {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
                </button>

                <button
                    onClick={() => setShowMap(!showMap)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${showMap ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
                >
                    {showMap ? "Hide Map" : "Show Map"}
                </button>

                <div className="flex items-center bg-white rounded-md text-gray-800">
                    <select
                        value={baseMap}
                        onChange={(e) => setBaseMap(e.target.value)}
                        className="px-3 py-1 text-sm focus:outline-none"
                        aria-label="Base map selector"
                    >
                        <option value="default">Default</option>
                        <option value="terrain">Terrain</option>
                        <option value="satellite">Satellite</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
