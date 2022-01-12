const fs = require('fs');

let [columns,...data] = fs.readFileSync(__dirname+"/kandilli.csv", "utf8").split('\n')
const toUnix = (date) => Math.round(+new Date(date))
data=data.map(i => {
  let [_,eid,Date,Hour,lat,lng,depth,mag,MD,ML,Mw,Ms,Mb,Type]= i.split(',')
  date = toUnix(Date + " " + Hour)

  return {
    date,
    lat: Number(lat),
    lng: Number(lng),
    mag:Number(mag),
    depth: Number(depth),
    type: Type=="Ke"?0:1
  };
})
  .map(({date:time, lat,lng, mag, type},id) => ({
    type: "Feature",
    properties: {
      id,
      time,
      mag,
      type
    },
    geometry: {
      type: "Point",
      coordinates: [lng, lat]
    }
  }))
const json = JSON.stringify({
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  features: data
})
fs.writeFileSync("src/data/earthquakes.geo.json",json)