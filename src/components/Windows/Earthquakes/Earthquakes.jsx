import { useEffect, useState } from "react"
import { Window } from "../../@core/Window/Window"
import moment from "moment"
import { IconButton } from "@mui/material"
import { useDisk } from "@data"
import {Search } from "@mui/icons-material"
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { filterEarthQuakeData } from "../../../map/layers/earthquakes"
import { MagnitudeSlider } from "./MagnitudeSlider"
import "./Earthquakes.sass"
import {map} from "../../../map"
export const Earthquakes = () => {
  const [faultsVisibility, setFaultsVisibility] = useDisk("faultsVisibility",true)
  const [value, setValue] = useState([+new Date() - 31536e6, +new Date()]);
  const [magnitude, setMagnitude] = useState([5, 7]);
  useEffect(() => {
    map.setLayoutProperty("active_faults_lines","visibility",faultsVisibility?"visible":"none")
  },[faultsVisibility])
  const visualize = () => {
    filterEarthQuakeData(({ properties: { time, mag } }) =>
      time > value[0] && time < value[1]
      && mag>=magnitude[0] && mag<=magnitude[1]
    )
  }
  return <Window id="earthquakes" title="Earthquakes">
    <div className="layer-visibility">
      <b className="label"> Fault Lines </b>
      <FormControlLabel
        value="start"
        control={<Checkbox checked={faultsVisibility} onClick={(e) => setFaultsVisibility(e.target.checked)}/>}
        label="Visible"
        labelPlacement="start"
      />
    </div>
    <div className="date-select">
      
      <b className="label"> Date </b>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Begin"
          endText="End"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          sx={{
            backdropFilter: "blur(10px)",
            background: "#ffffffcc"
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 1 }}/>
              <TextField {...endProps} />
            </>
          )}
        />
      </LocalizationProvider>
    </div>
    <div className="magnitude-select">
      <b className="label"> Magnitude </b>
      <MagnitudeSlider value={magnitude} onChange={setMagnitude} />
    </div>
    <IconButton onClick={visualize}> <Search /> Visualize</IconButton>
  </Window>
}
