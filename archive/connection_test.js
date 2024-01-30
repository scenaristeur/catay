import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";

const doc = new Y.Doc()

const wsProvider = new W.WebsocketProvider(
    "wss://ylm-websocket.glitch.me",
    'my-roomname',
     doc,
    { WebSocketPolyfill: WebSocket }
  );
wsProvider.on('status', event => {
  console.log(event.status) 
})