
import { useHash } from "@utils"
import { Button, Icon, TextField, IconButton } from "@mui/material"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import moment from "moment"
import {map} from "../../../map"
import classNames from "classnames"
import {useState} from "react"

export const Collection = ({ id, name, items, onUpdate }) => {
  const [hashes, has] = useHash(items, viewportHash)
  const [itemName, setName] = useState("")
  const saveViewport = () => {
    const viewport = getViewport()
    if (!has(viewport)) {
      onUpdate({
        items: [{
          ...viewport,
          name:itemName.trim(),
          //img: map.getCanvas().toDataURL("image/jpeg"),
          time: Date.now()
        }, ...items]
      })
      setName("")
    }
  }
  const remove = (key) => () => {
    const update = [...items]
    update.splice(key, 1)
    onUpdate({
      items: update
    })
    setName("")
  }
  return <div className="Collection">
    <div className="save-to-collection">
      <TextField placeholder="Entity Name" onChange={(e) => setName(e.target.value)} value={itemName} />
    <Button onClick={saveViewport} disabled={itemName.trim().length<1}> Save </Button>
    </div>
    {
      items.map((i, key) =>
        <div className={classNames("item", { new:(Date.now()-i.time)<5000})} key={key} onClick={setViewport(i)}>
          {/* <img src={i.img} height={50} /> */}
          <div className="name"> <b>{i.name}</b> </div>
          <div className="time">{moment(i.time).format("DD/MM/YY HH:mm")}</div>
          <IconButton onClick={remove(key)}> <DeleteOutlinedIcon/></IconButton>
        </div>)
    }
  </div>
}


const viewportHash = ({ bearing, pitch, zoom, center: [longitude, latitude] }) =>
  Math.round(latitude * longitude * zoom + pitch + bearing)

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