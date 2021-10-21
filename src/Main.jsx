import { Route, Router, Switch } from "react-router-dom"
import {useState, useEffect} from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home, CityDetails } from "@pages"
import { ObjectSearch, Map } from "@components"
import { config, useRedirect, navigate, navigateTo, history } from "@utils"
import { useWeatherUpdater } from "@data"
import { ErrorView } from "@views"
import "./Main.sass"
import { useDisk } from "./data";
import classNames from "classnames";
// Map()
const LimitControl = (props) => {
  const [value, setValue] = useDisk("value", 0)
  return <div className="mapboxgl-ctrl limiter">
    {value}
    <button className="button" onClick={()=>setValue(value+1)}/>
  </div>
}
// window.geo.addControl(<LimitControl/>,"top-right")
// Shell of the application
import pages from "./pages"
export const Main = () => {
  const [appVisible, setVisibility]=useState(false)
  const [value, onChange, reset] = useInputState("selam")
  console.log("isChanged", !!reset)
  console.log("value", value)
  return 
}

const useInitialValue = (initialValue, defaultValue=null)=> {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    initialValue !== undefined
      && initialValue !== value
      && setValue(initialValue)
  }, [initialValue])

  return [value, setValue, value !== initialValue? () => setValue(initialValue) : false]
}
const useInputState = (initialValue) => {
  const [value, setValue, reset] = useInitialValue(initialValue)

  //@ts-ignore
  return [value, (e)=>setValue(e.target.value), value !== initialValue ? reset : undefined]
}