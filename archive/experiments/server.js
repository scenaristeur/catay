const WebSocket = require("ws")
const http = require("http")
const StaticServer = require("node-static").Server
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 9999

const staticServer = new StaticServer("../", {
  cache: production ? 3600 : false,
  gzip: production,
})

const server = http.createServer((request, response) => {
  request
    .addListener("end", () => {
      staticServer.serve(request, response)
    })
    .resume()
})
const wss = new WebSocket.Server({ server })

wss.on("connection", (conn, req) => {
    console.log("connection",conn)
  return setupWSConnection(conn, req, {
    gc: true,
  })
})

server.listen(port)

console.log(
  `Listening to http://localhost:${port} ${production ? "(production)" : ""}`
)