import { ToastContainer } from 'react-toastify'
import { useDisk } from "@data"
import { ErrorView } from "@views"
import { Collections, Earthquakes } from "../Windows"
import { Compass } from "../../map/Compass/Compass"
import "./Shell.sass"
import 'react-toastify/dist/ReactToastify.css';

export const Shell = () => {
  const [{bearing}] = useDisk("lastProjection",{bearing:0})

  return <>
    <Compass value={bearing}/>
    <ErrorView />
    <Collections />
    <Earthquakes/>
    <ToastContainer />
  </>
}
