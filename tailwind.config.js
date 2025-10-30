/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0b1d3a",     // Deep navy - navbar
                sidebar: "#13294b",     // Slightly lighter navy - sidebar
                accent: "#00bfa6",      // Teal - highlights & buttons
                hover: "#1e3a8a",       // Hover state
                text: "#f5f7fa",        // Soft white for text
            },
        },
    },
    plugins: [],
}