import mapbox from "./mapbox"
import mapboxgl from "!mapbox-gl"
import { createElement } from "react"
import ReactDOM from "react-dom"
import { Disk } from "../data"
const defaultView = {
  pitch: 0,
  center: [35.251108933987325, 38.7690838501309],
  zoom: 4.1
}
export let map =  undefined
let centerUpdate = undefined
let animation = undefined
let cancelAnimation = undefined
export const render = (domElement, view) => {
  map = window.map = mapbox(
    domElement,
    view || Disk.lastView || defaultView,
    (...params) => centerUpdate && centerUpdate(...params)
  );
  return map
}
export const setPitch= (value, step = 1) => {
  let pitch = map.getPitch();
  animation && cancelAnimationFrame(animation)
  const set = pitch < value
    ? () => {
        map.setPitch((pitch += step));
        !cancelAnimation &&
          pitch < value &&
          (animation = requestAnimationFrame(set));
      }
    : () => {
      map.setPitch((pitch -= step));
      !cancelAnimation &&
        pitch > value &&
        (animation = requestAnimationFrame(set));
    };
  animation = requestAnimationFrame(set);
}
export const createMarker=({ className, latitude, longitude }) => {
  const el = document.createElement("div");
  el.className = className;
  if (!latitude || !longitude) {
    const center = map.getCenter();
    console.log(center);
    latitude = center.lat;
    longitude = center.lng;
  }
  console.log(latitude, longitude);
  const marker = new mapboxgl.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(map);
  return {
    marker,
    focus: () => {
      const lnglat = marker.getLngLat();
      map.setCenter(lnglat);
    },
    update: ({ latitude, longitude }) => {
      marker.setLngLat([longitude, latitude]);
    },
  };
}
export const addControl = (reactElement, placement) => {
  const container = document.createElement("div");
  const control = function () {
    return this;
  };
  control.prototype.onAdd = function (map) {
    console.log("render");
    ReactDOM.render(reactElement, container);
    return container;
  };
  control.prototype.onRemove = function () {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  };
  map.on("load", () => map.addControl(new control(), placement));
}

// import React, { Component, createRef } from 'react'
// // import ReactMapboxGl, { Layer, Feature  } from 'react-mapbox-gl';

// import DrawControl from 'react-mapbox-gl-draw';
// import mapbox from "./mapbox"
// import * as turf from "turf"
// /**
//  * 
//  * @param {T[]} array 
//  * @param {function} callback 
//  * @returns T
//  */
// const find = (array, callback) => Object.entries(array).find((i)=>callback(i[1]))
// export class Map extends Component {
//   mapRef = createRef()
//   constructor(props) {
//     super(props)
//     window.MAPC = this
//     this.map = mapbox("#map")
//     // window.addEventListener("resize", () => {
//     //   this.forceUpdate()
//     // })
//   }
//   // get map(){return this.mapRef.current.state.map}

//   // controlRef = createRef()
//   componentDidUpdate = (prevProps) => {
//     // if ((JSON.stringify(prevProps) !== JSON.stringify(this.props)) && this.props) {
//     //   this.setState({ center: { ...this.state.center, ...this.props.userLocation } })
//     //   this.userLocation(this.props.userLocation)
//     // }
//   }
//   // userLocation(coords) {
//   //   if (!this.userMarker) {
//   //     this.userMarker = new Feature({color:"#F84C4C"})
//   //   }
//   //   this.userMarker.
//   // }
//   focus(layer, featureId) {
//     layer = this.map.getSource(layer)
//     let data = layer._data
//     console.log(data)
//     const [index, { geometry: { coordinates } }] = find(data.features, ({ properties: { id } }) => id === featureId)
//     const [longitude, latitude] =coordinates
//     console.log(coordinates,1)
//     this.setState({center: {latitude,longitude, zoom:18}})
//   }
//   addShape() {
//     this.controlRef.current.draw.add({
//       type: "Polygon",
//       coordinates: [this.props.value.shape]
//     })
//     window.drwr = this.controlRef.current.draw
//     const s = this.props.value.stations
//     Object.keys(s).forEach((id) => {
//       this.controlRef.current.draw.add({
//         type: "Point",
//         id,
//         coordinates: s[id]
//       })
//     })
//   }
//   process = (features) => {
//     // const warehouse = this.state.warehouse
//     const { geometry: { type, coordinates }, id } = features[0]
//     window.f=features
//     if (type == "Polygon") {
//       const polygon = turf.polygon(coordinates)
//       // warehouse.shape = coordinates[0]
//       const area = Math.round(turf.area(polygon))
//       const { geometry: { coordinates: polygonCenter } } = turf.centroid(polygon)
//       const [longitude, latitude] = polygonCenter
//       const center = { latitude, longitude }
//       this.map.setCenter({ lat: latitude, lng: longitude })
//       this.props.onChange&&this.props.onChange(area)
//     } else if (type == "Point") {
//       // if (warehouse.stations[id]) {
//       //   warehouse.stations[id] = {}
//       // }
//       // warehouse.stations[id] = coordinates
//     }
//     // this.setState({ warehouse })
//   }
//   render() {
//     window.ctr = this.controlRef
//     // const { center: { zoom, ...coordinates }} = this.state
//     // const onDrawCreate = ({ features }) =>
//     //   this.process(features, "create")

//     // // window.warehouse = this.state.warehouse
//     // const onDrawDelete = ({ features: { 0: { id, geometry: { type } } } }) => {
//     //   // const warehouse = { ...this.state.warehouse }
//     //   if (type == 'Polygon') {
//     //     // warehouse.shape = undefined
//     //     this.props.onChange&&this.props.onChange(0)
//     //   } else if (type == 'Point') {
//     //     // delete warehouse.stations[id]
//     //   }
//     //   // this.setState({ warehouse })
//     // }
//     // const onDrawUpdate = (e) =>
//     //   this.process(e.features)

//     // let polygonPaint = ReactMapboxGl.FillPaint = {
//     //   'fill-color': "#ff0000",
//     //   'fill-opacity': 0.3
//     // }
//     // const onDragEnd = () => {
//     //   // const warehouse = { ...this.state.warehouse }
//     //   const { lat: latitude, lng: longitude } = this.map.getCenter()
//     //   const zoom = this.map.getZoom()
//     //   // !warehouse.shape && (warehouse.center = { latitude, longitude, zoom })
//     //   // this.setState({ warehouse })
//     // }
//     // const controlRef = (ref) => {
//     //   this.controlRef.current = ref
//     // }
//     // console.log(coordinates)
//     // return <Map
//     //   ref={this.mapRef}
//     //   style="mapbox://styles/arqueirox/ckrxgw5kj5boz17pl986mbf3m"
//     //   onDragEnd={onDragEnd}
//     //   center={[coordinates.longitude, coordinates.latitude]}
//     //   zoom={[zoom]}
//     //   containerStyle={{
//     //     height: window.innerHeight,
//     //     width: window.innerWidth,
//     //     position: "fixed",
//     //     top: 0,
//     //     left: 0,
//     //     right: 0,
//     //     bottom: 0
//     //   }}
//     // >
//     //   <DrawControl ref={controlRef} controls={{
//     //     polygon: true,
//     //     line_string: false,
//     //     combine_features: false,
//     //     uncombine_features: false
//     //   }} draggable={false}
//     //     {...{ onDrawDelete, onDrawCreate, onDrawUpdate }} />

//     // </Map >
//   }
// }


// // import React, { useRef, useEffect, useState } from 'react';
// // import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// // mapboxgl.accessToken = "pk.eyJ1IjoiYXJxdWVpcm94IiwiYSI6Ijlnc080TVUifQ.2KyDh7OWuF-diDBaaYz4gw";

// // export const Map = ()=> {
// //   const mapContainer = useRef(null);
// //   const map = useRef(null);
// //   const [{zoom, latitude, longitude}, setCenter] = useState({
// //     latitude: 38.7690838501309,
// //     longitude: 35.251108933987325,
// //     zoom: 4.1
// //   })

// //   useEffect(() => {
// //     if (map.current) return; // initialize map only once
// //     map.current = new mapboxgl.Map({
// //       container: mapContainer.current,
// //       style: 'mapbox://styles/mapbox/streets-v11',
// //       zoom
// //     }).on("load", () => {
// //       map.current.on('move', () => {
// //         const { lat: latitude, lng: longitude } = map.current.getCenter()
// //         setCenter({
// //           longitude, latitude,
// //           zoom: map.current.getZoom().toFixed(2)
// //         })
// //       })
// //     })
// //   },[]);
// //   console.log(1)
// //   return <div>
// //     <div className="sidebar">
// //       Longitude: {latitude} | Latitude: {longitude} | Zoom: {zoom}
// //     </div>
// //     <div ref={mapContainer} className="map-container" />
// //   </div>
// // }
