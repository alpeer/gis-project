import { Home } from "./Home/Home"
import { ObjectDetails } from "./ObjectDetails/ObjectDetails"
export default {
  Home: {
    path: "/",
    component: Home
  },
  ObjectDetails: {
    path: "/:objectId",
    component: ObjectDetails
  }
}
