import { useEffect, useState } from "react"
import { Window } from "../../@core/Window/Window"
import moment from "moment"
import { IconButton } from "@mui/material"
import { useDisk } from "@data"
import {Search } from "@mui/icons-material"
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { filterEarthQuakeData } from "../../../map/heatmap"
import { MagnitudeSlider } from "./MagnitudeSlider"
import "./Earthquakes.sass"

export const Earthquakes = () => {
  const [value, setValue] = useState([+new Date() - 31536e6, +new Date()]);
  const [magnitude, setMagnitude] = useState([5, 7]);
  const visualize = () => {
    filterEarthQuakeData(({ properties: { time, mag } }) =>
      time > value[0] && time < value[1]
      && mag>=magnitude[0] && mag<=magnitude[1]
    )
  }
  return <Window id="earthquakes" title="Depremler">
      <b className="label"> Date Range </b>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Begin"
        endText="End"
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        style={{
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
    <b className="label"> Magnitude Range </b>
    <MagnitudeSlider value={magnitude} onChange={setMagnitude}/>
    <IconButton onClick={visualize}> <Search /> Visualize</IconButton>
    
  </Window>
}
