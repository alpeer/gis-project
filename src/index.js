import { createElement } from "react"
import { render } from "react-dom"
import { Shell } from "./components"
import { render as renderMap } from "./map"
import pages from "./pages"
import { Disk } from "./data";
import heatmap from "./map/heatmap"

// import { Login, authenticate } from "./pages/Login"
// import service from "./service"

// const authenticate = (onAuthCallback) => { 
//   let token = localStorage.getItem("token");
//   const renderLogin = () => {
//     render(createElement(Login, {}), document.getElementById("root"));
//   }
//   if (localStorage.getItem("token")) {
//     return service.login.validate(token).then((user) => {
//       Disk.user = user;
//       onAuthCallback()
//     }).catch(renderLogin);
//   }
//   renderLogin();
// }

// authenticate(() => {
  
// })
const mapBox = renderMap(document.getElementById("map"));
mapBox.on("load", () => {
  render(
    createElement(Shell, { map:mapBox, pages }),
    document.getElementById("root")
  );
  setTimeout(()=>heatmap(mapBox),500)
});


// Check if hot reloading is enable. If it is, changes won't reload the page.
// This is related to webpack-dev-server and works on development only.
if (module.hot) {
  module.hot.accept();
}
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(registration => {
//         console.log('SW registered: ', registration)
//       }).catch(registrationError => {
//         console.log('SW registration failed: ', registrationError)
//       });
//   });
// }
