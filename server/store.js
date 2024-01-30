import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import * as wrtc from "wrtc";
import * as awarenessProtocol from 'y-protocols/awareness.js'

// Create your SyncedStore store
// We create a store which contains an array (myArray) and an object (myObject)
export const store = syncedStore({ myArray: [], todos: {} });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
// export const webrtcProvider = new WebrtcProvider("syncedstore-plain", doc);

export const webrtcProvider = new WebrtcProvider('my-roomname', doc, {
    // awareness: new awarenessProtocol.Awareness(doc),
    // password: 'optional-room-password'
    signaling: [
     // 'wss://wrtc-yllm.glitch.me',
      'ws://localhost:4444'
    ],
    peerOpts: { wrtc: wrtc, initiator: true },
    wrtc: wrtc,
    awareness: new awarenessProtocol.Awareness(doc),
  });


  const awareness = webrtcProvider.awareness;

awareness.on("change", (changes) => {
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  let agents = Array.from(awareness.getStates().values());
  console.log("######AWARENESS", agents.length);
  // agents.forEach(a => {
  //   try {
  //     console.log(a)
  //   } catch (e) {
  //     console.log(e, a)
  //   }

  // })
  // console.log("#####", agents.length);
});


export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();


// export const webrtcProvider = new WebrtcProvider("syncedstore-plain", doc, {
//     // awareness: new awarenessProtocol.Awareness(doc),
//     // password: 'optional-room-password'
//     signaling: [
//      // 'wss://wrtc-yllm.glitch.me',
//       'ws://localhost:4444'
//     ],
//     peerOpts: { wrtc: wrtc, initiator: true },
//     wrtc: wrtc,
//     awareness: new awarenessProtocol.Awareness(doc),
//   });