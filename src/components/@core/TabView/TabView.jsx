import {Tabs, TabPanel,Tab} from "@mui/material"
import {useState, useMemo} from "react"
export const TabView = ({ tabs, children,endAdornment }) => {
  const [current, setCurrent] = useState(0)
  const [tabDivs, index] = useMemo(() => [
    tabs.map(({ id, name },j) => <Tab key={j} label={name} id={id + "-tab"} />),
    tabs.map(i => i.id)
  ], [JSON.stringify(tabs)])
  const handleChange = (e, value) => setCurrent(value)
  return <div className="TabView">
    <Tabs value={current} onChange={handleChange} aria-label="basic tabs example">
      {tabDivs}
      {endAdornment}
    </Tabs>
    {
      tabs.map((i) =>children({...i, current:index[current]}))
    }
  </div>
}
