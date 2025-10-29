import React from "react";

export default function ToggleSwitch({ enabled = false, setEnabled = () => {} }) {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${enabled ? "bg-indigo-600" : "bg-gray-300"}`}
            aria-pressed={enabled}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow transform transition ${enabled ? "translate-x-6" : "translate-x-0"}`} />
        </button>
    );
}
