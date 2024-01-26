import { Worker } from "./src/worker/index.js";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

console.log("\n### Decentralized LLM and Knowledge ###\n" + new Date());
console.log(argv);

let worker = new Worker({
  name: argv.name || "Bob le Worker",
  catai_url: argv.catai_url || "ws://localhost:3000",
  yjs_url: argv.yjs_url || "ws://localhost:1234",
  yjs_room: argv.yjs_room || "my-roomname",
  debug: argv.debug || true, // change to false by default
  healthCheckInterval: argv.healthCheckInterval || 5000,
  // color: argv.color || "blue"
});
