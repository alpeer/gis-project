const fs = require("fs");

let {type, features} = JSON.parse(fs.readFileSync(__dirname+"/gem_active_faults.geojson", "utf8"));
const toUnix = (date) => Math.round(+new Date(date));
features = features
  .map(({type,properties:{name,notes},geometry}) => ({
    type, properties: {name, notes}, geometry
  }))
const json = JSON.stringify({ type, features});
fs.writeFileSync("public/active_faults.geojson", json);
