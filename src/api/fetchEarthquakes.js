// simple wrapper to fetch USGS GeoJSON (past day)
export async function fetchEarthquakes(hours = 24) {
    try {
        const endTime = new Date().toISOString();
        const startTime = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // return the raw features (we'll use properties/geometry directly)
        return json.features || [];
    } catch (err) {
        console.error("fetchEarthquakes error:", err);
        return [];
    }
}
