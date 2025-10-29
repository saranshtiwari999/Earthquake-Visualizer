import React from "react";

const ToggleSwitch = ({ enabled, setEnabled }) => (
    <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
    >
        <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                enabled ? "translate-x-6" : "translate-x-0"
            }`}
        />
    </button>
);

export default ToggleSwitch;
