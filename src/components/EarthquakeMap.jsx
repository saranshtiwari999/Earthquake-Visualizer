import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const EarthquakeMap = ({ earthquakes, showHeatmap }) => {
    useEffect(() => {
        const map = L.map("map").setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        let markers = [];
        let heatLayer;

        earthquakes.forEach((quake) => {
            const [lon, lat] = quake.geometry.coordinates;
            const mag = quake.properties.mag;

            const circle = L.circleMarker([lat, lon], {
                radius: mag * 2,
                color: "#ff5252",
                fillColor: "#ff5252",
                fillOpacity: 0.7,
            }).bindPopup(`
        <b>${quake.properties.place}</b><br/>
        Magnitude: ${mag}<br/>
        Time: ${new Date(quake.properties.time).toLocaleString()}
      `);

            circle.addTo(map);
            markers.push([lat, lon, mag]);
        });

        if (showHeatmap && markers.length) {
            heatLayer = L.heatLayer(markers.map(([lat, lon, mag]) => [lat, lon, mag / 10]), {
                radius: 25,
                blur: 15,
                maxZoom: 7,
            }).addTo(map);
        }

        return () => {
            map.remove();
        };
    }, [earthquakes, showHeatmap]);

    return <div id="map" className="h-full w-full rounded-lg shadow-md" />;
};

export default EarthquakeMap;
