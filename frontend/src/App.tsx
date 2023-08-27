import { useEffect } from "react"
import { socket } from "./packages/socket"

function App() {

  useEffect(() => {
    socket.on("msg", (msg) => {
      console.log(msg)
    })
  })
  return (
    <>
      <div>This is front end</div>
    </>
  )
}

export default App
