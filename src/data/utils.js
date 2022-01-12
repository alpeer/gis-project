import { config } from "@utils"
import { Disk } from "./disk"
 const request = (url) =>
  fetch(url)
    .then(response => response.json())

const serialize = (obj) =>
  Object.keys(obj)
    .map(i => i + "=" + encodeURIComponent(obj[i].toString())).join("&")
