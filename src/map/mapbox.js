import mapboxgl from '!mapbox-gl'
import { config } from "../utils"
mapboxgl.accessToken = config.mapbox.token;
import {Disk} from "../data"
export default (container, {center, zoom, pitch}, onCenterUpdate) => {
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/arqueirox/ckrxgw5kj5boz17pl986mbf3m",
    center, zoom, pitch
  })
  map.on("load", function () {
    console.log(this, 12)
    map.on('move', () => {
      const { lat: latitude, lng: longitude } = map.getCenter()
      let { angle, pitch, zoom } = map.transform
      angle = map.transform.angle / Math.PI * 180
      Disk.lastProjection = {center: [longitude, latitude], zoom, pitch, angle}
      onCenterUpdate && onCenterUpdate({ latitude, longitude, zoom, angle, pitch })
      
    })
  })
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }))
  return map
}

  
