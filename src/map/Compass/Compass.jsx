import { useState, useEffect } from "react"
import { map } from ".."
import {dec2dms} from "./coordConverter"
const ways = ["K","KD","D","GD","G","GB","B", "KB", "K"]
import "./Compass.sass"

export const Compass = () => {
  let [{angle, lat, lng}, setValue] = useState({})
  angle = (angle<0?360+angle:angle)
  useEffect(() => {
    const getValue = () => {
      const { _center: { lat, lng }, bearing } = map.transform
      setValue({ angle: Math.round(bearing), lat, lng })
    }
    getValue()
    map.on("move", getValue)
  }, [])
  const way = ways[Math.floor((angle+22.5)/45)]
  return <div className="Compass">
    <div className="angles" style={{backgroundPosition:"calc(50% + "+((-2428/360*angle)-1231)+"px) 4px", backgroundImage:"url(./compass.svg)"}}/>
    <div className="coords">{dec2dms({ lat, lng })}</div>
    
    <div className="middle">
      <div className="angle">{angle}°</div>
      <div className="way">{way}</div>
    </div>
  </div>
}