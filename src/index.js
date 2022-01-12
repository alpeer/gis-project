import { createElement } from "react"
import { render } from "react-dom"
import { Shell } from "./components"
import { render as renderMap } from "./map"
import { Disk } from "./data";
import loadFaultsLayer from "./map/layers/faults";
import loadEarthquakesLayer from "./map/layers/earthquakes";

const mapBox = renderMap(document.getElementById("map"));
mapBox.on("load", () => {
  render(
    createElement(Shell),
    document.getElementById("root")
  );
  loadEarthquakesLayer(mapBox);
  setTimeout(() => {
    loadFaultsLayer(mapBox);
  }, 500)
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
