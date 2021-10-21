import { Route, Router, Switch } from "react-router-dom"
import { useState, useEffect, useMemo } from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { config, useRedirect, navigate, navigateTo, history } from "@utils"
import { useWeatherUpdater, useDisk } from "@data"
import { ErrorView } from "@views"
import classNames from "classnames";
import "./Shell.sass"
import {Window} from "../@core/Window/Window"
import {Collections} from "../Windows/Collections"
import { Compass } from "../../map/Compass/Compass"
import { Earthquakes } from "../Windows/Earthquakes";

const LimitControl = (props) => {
  const [value, setValue] = useDisk("value", 0)
  return <div className="mapboxgl-ctrl limiter">
    {value}
    <button className="button" onClick={()=>setValue(value+1)}/>
  </div>
}
const CoordinateInput = (props) => {
  const [value, setValue] = useDisk("value", 0)
  return <div className="mapboxgl-ctrl coordinate-input">
    {value}
    <button className="button" onClick={()=>setValue(value+1)}/>
  </div>
}
const calcProps = pages =>
  Object.values(pages)
    .map((i) => ({
      path: i.path,
      ...(i.path.includes(":")
        ? { exact: true }
        : {})
    }), [])
// window.geo.addControl(<LimitControl/>,"top-right")
// Shell of the application
export const Shell = ({pages}) => {
  // const [appVisible, setVisibility]=useState(false)
  // const [value, onChange, reset] = useInputState("selam")
  const [projection] = useDisk("lastProjection")
  const routes = useMemo(() => calcProps(pages), [JSON.stringify(pages)])
  console.log(routes)
  // console.log("isChanged", !!reset)
  // console.log("value", value)
  return <Router history={history}>
    <Compass value={projection?projection.angle:0}/>
    <div className="Header">
      <div className="appName">
        {/* <input type="text" {...{ value, onChange }} className={!!reset ? "changed" : ""}/> */}
        {/* <div className="appLogo" onClick={()=>setVisibility(!appVisible)}/> */}
        {config.appName}
      </div>
      <div className="a">
        <div className="search">

        </div>
      </div>
    </div>
    <ErrorView />
    <Collections />
    <Earthquakes/>
  
    <div className={classNames("Page", {appVisible:true})}>
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route}/>)}
      </Switch>
    </div>
    <ToastContainer />
  </Router>
}

// const useInitialValue = (initialValue, defaultValue=null)=> {
//   const [value, setValue] = useState(defaultValue)

//   useEffect(() => {
//     initialValue !== undefined
//       && initialValue !== value
//       && setValue(initialValue)
//   }, [initialValue])

//   return [value, setValue, value !== initialValue? () => setValue(initialValue) : false]
// }
// const useInputState = (initialValue) => {
//   const [value, setValue, reset] = useInitialValue(initialValue)

//   //@ts-ignore
//   return [value, (e)=>setValue(e.target.value), value !== initialValue ? reset : undefined]
// }