import minimist from "minimist";
import { Worker } from "./src/worker/index.js";


const argv = minimist(process.argv.slice(2));

console.log("\n### Decentralized LLM and Knowledge ###\n" + new Date());
console.log(argv);

let worker = new Worker({
  name: argv.name || "Bob",
  job: "écrivain",
  systemPrompt:
    "you are a pirate and you end all your sentences with 'Héhéhé, moussaillon!'",
  //catai_url: argv.catai_url || "ws://localhost:3000",
  multi_channel: true,
  yjs_url: argv.yjs_url ||  "ws://localhost:1234", // "wss://ylm-websocket.glitch.me"
  yjs_room: argv.yjs_room || "my-roomname",
  debug: argv.debug || true, // change to false by default
  healthCheckInterval: argv.healthCheckInterval || 5000,

  // color: argv.color || "blue"
});





// RUNNING Multipl workers
// let henri = new Worker({
//     name: argv.name || "Henri",
//     job:"secretary",
//     catai_url: argv.catai_url || "ws://localhost:3000",
//     yjs_url: argv.yjs_url || "ws://localhost:1234",
//     yjs_room: argv.yjs_room || "my-roomname",
//     debug: argv.debug || true, // change to false by default
//     healthCheckInterval: argv.healthCheckInterval || 5000,
//     // color: argv.color || "blue"
//   });

//   let salie = new Worker({
//     name: argv.name || "Sally",
//     job:"scribe",
//     catai_url: argv.catai_url || "ws://localhost:3000",
//     yjs_url: argv.yjs_url || "ws://localhost:1234",
//     yjs_room: argv.yjs_room || "my-roomname",
//     debug: argv.debug || true, // change to false by default
//     healthCheckInterval: argv.healthCheckInterval || 5000,
//     // color: argv.color || "blue"
//   });
