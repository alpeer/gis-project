import { useEffect, useState } from "react"
import { Window } from "../@core/Window/Window"
import moment from "moment"
import { IconButton } from "@mui/material"
import { useDisk } from "@data"

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export const Earthquakes = () => {
  const [value, setValue] = React.useState([null, null]);

  return <Window title="Depremler">
    <div className="earthquakes">
      <b> Tarih Aralığı </b>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Başlangıç"
        endText="Bitiş"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </div>
  </Window>
}