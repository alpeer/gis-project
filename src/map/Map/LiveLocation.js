
export default new Proxy({}, {
  get(o, id) {
    return {
      update(location) {
        if (!o[id]) {
          o[id] = map.createMarker()
        }
        o[id].setLatLng(location)
      }
      update(location) {
        if (!o[id]) {
          o[id] = map.createMarker()
        }
        o[id].setLatLng(location)
      }
    }
  }
})
