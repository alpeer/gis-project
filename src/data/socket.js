import eio from "engine.io"
const socket = new eio.Socket("ws://localhost/")

socket.on("open", () => {
  socket.on("message", (data) => {
    const {id, lat, lon} = data
    LiveLocation[id].update({lat, lon})
  });
  socket.on("close", () => {});
})

