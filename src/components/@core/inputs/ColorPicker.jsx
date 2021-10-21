import {useState, useEffect} from 'react'
import { SketchPicker } from 'react-color'
import { Popover } from "@mui/material"

export const ColorPicker = ({ value, onChange }) => {
  const [color, setColor] = useState()
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    (value!= color) && setColor(value)
  }, [value])
  const onClose = ()=>setAnchorEl(null)
  const openPopover = (e) => setAnchorEl(e.currentTarget)
  return <div className="ColorPicker">
    <div className="color" style={{ backgroundColor: color }} onClick={openPopover}/>
    <Popover
      open={!!anchorEl}
      {...{anchorEl, onClose}}
      onClose={on}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <SketchPicker color={color} onChangeComplete={setColor} />
    </Popover>
  </div>
}