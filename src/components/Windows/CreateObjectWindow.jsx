import { Window } from '../@core/Window/Window'
import { ColorPicker } from '../@core/ColorPicker/ColorPicker'
import {useInputState} from "@utils"
import turf from "@turf/turf"

export const CreatePolygonWindow = ({type, coordinates}) => {
  const [name, setName] = useInputState()
  const area = useMemo(() => turf.area(turf.polygon([coordinates])), [JSON.stringify(coordinates)])
  
  return <Window title={"Create New " + Polygon}>
    <div className="row">
      <div>Name: </div>
      <TextField title="Name" value={name} />
    </div>
    <div className="row">
      <div>Stroke: </div>
      <ColorPicker onChange={setStroke} />
      <div>Fill: </div>
      <ColorPicker onChange={setFill}/>
    </div>
    <div className="row">
      <div>Total Area: </div>
      <div> {area} </div>
    </div>
  </Window>

}