import { map } from "..";
import mapboxgl from "!mapbox-gl";

export default (map) => {
  map.addSource("active_faults", {
    type: "geojson",
    data: "./active_faults.geojson",
  })
  map.addLayer(
    {
      id: "active_faults_lines",
      type: "line",
      source: "active_faults",
      maxzoom: 9,
      paint: {
        "line-color": "#F90",
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
    },
    "waterway-label"
  )
}
