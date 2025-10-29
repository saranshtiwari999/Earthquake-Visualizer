import React from "react";
import { LayoutPanelLeft, LayoutPanelTop, Map } from "lucide-react";

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
        <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-md backdrop-blur-md border-b border-purple-200">
            <h1 className="text-2xl font-semibold text-purple-700 tracking-tight">
                {projectName}
            </h1>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`p-2 rounded-xl shadow-sm transition-all ${
                        showSidebar
                            ? "bg-purple-300 text-white"
                            : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                    }`}
                    title="Toggle Sidebar"
                >
                    <LayoutPanelLeft size={22} />
                </button>

                <button
                    onClick={() => setShowMap(!showMap)}
                    className={`p-2 rounded-xl shadow-sm transition-all ${
                        showMap
                            ? "bg-blue-300 text-white"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                    }`}
                    title="Toggle Map"
                >
                    <LayoutPanelTop size={22} />
                </button>

                <select
                    value={baseMap}
                    onChange={(e) => setBaseMap(e.target.value)}
                    className="p-2 bg-white/70 border border-purple-200 rounded-lg text-purple-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                    <option value="streets">Streets</option>
                    <option value="satellite">Satellite</option>
                    <option value="terrain">Terrain</option>
                </select>
            </div>
        </nav>
    );
}
