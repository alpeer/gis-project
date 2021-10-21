
import { useHash } from "@utils"
import { Button, Icon } from "@mui/material"
import moment from "moment"
import {map} from "../../map"
import classNames from "classnames"

export const Collection = ({ id, name, items, onUpdate }) => {
  const [hashes, has] = useHash(items, viewportHash)

  const saveViewport = () => {
    const viewport = getViewport()
    if (!has(viewport)) {
      onUpdate({
        items: [{
          ...viewport,
          img: map.getCanvas().toDataURL("image/jpeg"),
          time: Date.now()
        }, ...items]
      })
    }
  }
  // useEffect(() => {
  //   let timeout
  //   const map = window.geo.map
  //   map.on("move", () => {
  //     clearTimeout(timeout)
  //     console.log(1)
  //     timeout = setTimeout(saveItem, 5000)
  //   })
  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [])
  return <div className="Collection">
    <Button onClick={saveViewport}>Kaydet</Button>
    {
      items.map((i, key) =>
        <div className={classNames("item", { new:(Date.now()-i.time)<5000})} key={key} onClick={setViewport(i)}>
          <img src={i.img} height={50} />
          <div className="time">{moment(i.time).format("DD/MM/YY HH:mm")}</div>
          <Icon icon="trash" />
        </div>)
    }
  </div>
}


const viewportHash = ({ bearing, pitch, zoom, center: [longitude, latitude] }) =>
  Math.round(latitude * longitude * zoom * pitch + bearing)

const getViewport = () => {
  const { lat: latitude, lng: longitude } = map.getCenter()
  let { bearing, pitch, zoom } = map.transform

  return {
    center: [longitude, latitude],
    zoom, pitch, bearing
  }
}
const setViewport = (viewport) => () => 
  map.flyTo(viewport)