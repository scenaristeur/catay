


var params = {"headers": {"User-Agent" :"Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"} };
const ws = new WebSocket('ws://ylm-websocket.glitch.me', params);

import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";

const doc = new Y.Doc()

const wsProvider = new W.WebsocketProvider(
    "wss://ylm-websocket.glitch.me",
    'my-roomname',
     doc,
   // { WebSocketPolyfill: WebSocket }
  );
wsProvider.on('status', event => {
  console.log(event.status) 
})
