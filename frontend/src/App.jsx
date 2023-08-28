import { useEffect, useState, useRef } from "react";
import { socket } from "./packages/socket";
import { Peer } from "peerjs";

function App() {
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [remoteId, setRemoteId] = useState("");
  const RemoteStream = useRef(null);
  const userStream = useRef(null);

  function Call() {
    let callObj = peer.call(remoteId, userStream);
    setCall(callObj);
  }

  useEffect(() => {
    async function init() {
      const peerConnection = new Peer();
      setPeer(peerConnection);
      peerConnection.on("open", function (id) {
        console.log("My peer id: " + id);
      });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (userStream.current) {
        userStream.current.srcObject = stream;
      }

      peerConnection.on("call", function (call) {
        call.answer(stream);
        call.on("stream", function (remote) {
          RemoteStream.current.srcObject = remote;
        });
      });
    }
    init();
  }, []);

  return (
    <>
      <div>This is React app</div>
      <input
        type="text"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
      />
      <p>Input value: {remoteId}</p>
      <video ref={userStream} autoPlay muted></video>
      <video ref={RemoteStream} autoPlay playsInline></video>
      <button onClick={Call}>Call</button>
    </>
  );
}

export default App;
