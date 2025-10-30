import React from "react";
import { LayoutPanelLeft } from "lucide-react";

export default function Navbar({
                                   projectName,
                                   showSidebar,
                                   setShowSidebar,
                                   baseMap,
                                   setBaseMap,
                               }) {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-primary via-sidebar to-accent shadow-md backdrop-blur-md border-b border-accent/30">
            <h1 className="text-2xl font-semibold text-accent tracking-tight">
                {projectName}
            </h1>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`p-2 rounded-xl shadow-sm transition-all ${
                        showSidebar
                            ? "bg-accent text-text"
                            : "bg-sidebar hover:bg-hover text-accent"
                    }`}
                    title="Toggle Sidebar"
                >
                    <LayoutPanelLeft size={22} />
                </button>

                <select
                    value={baseMap}
                    onChange={(e) => setBaseMap(e.target.value)}
                    className="p-2 bg-white/80 border border-accent/40 rounded-lg text-primary font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/60 backdrop-blur-sm"
                >
                    <option value="streets">Streets</option>
                    <option value="satellite">Satellite</option>
                    <option value="terrain">Terrain</option>
                </select>
            </div>
        </nav>

    );
}