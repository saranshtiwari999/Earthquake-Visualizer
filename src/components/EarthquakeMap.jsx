import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";

export default function EarthquakeMap({ earthquakes }) {
    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-full w-full"
            scrollWheelZoom
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {earthquakes.map((eq) => (
                    <CircleMarker
                        key={eq.id}
                        center={eq.coords}
                        radius={Math.max(eq.magnitude * 2, 3)}
                        pathOptions={{
                            color:
                                eq.magnitude >= 5
                                    ? "red"
                                    : eq.magnitude >= 3
                                        ? "orange"
                                        : "yellow",
                            fillOpacity: 0.6,
                        }}
                    >
                        <Popup>
                            <strong>{eq.place}</strong>
                            <br />
                            Magnitude: {eq.magnitude}
                            <br />
                            Time: {eq.time.toLocaleString()}
                        </Popup>
                    </CircleMarker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
