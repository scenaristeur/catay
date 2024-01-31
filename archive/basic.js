import WebSocket from 'ws';

var params = {"headers": {"User-Agent" :"Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"} };
const ws = new WebSocket('ws://ylm-websocket.glitch.me', [],  params);

ws.on('error', console.error);

ws.on('open', function open() {
    console.log('Connection open');
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});