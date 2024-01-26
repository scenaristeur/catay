import { Worker } from "./src/worker/index.js";

console.log("\n### Decentralized LLM and Knowledge ###\n"+ new Date())


let worker = new Worker({
    name: "Bob le worker",
   // catai_url: "ws://localhost:3000",
    yjs_url : "ws://localhost:1234",
    yjs_room : "my-roomname",
    debug: true
})


// import { RemoteCatAI } from "catai";

// const catai = new RemoteCatAI("ws://localhost:3000");

// catai.on("open", async () => {
//   console.log("Connected");
//   const response = await catai.prompt("Write me 100 words story", (token) => {
//     process.stdout.write(token);
//   });

//   console.log(`Total text length: ${response.length}`);
//   catai.close();
// });