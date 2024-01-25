import * as Y from "yjs";
import * as W from "y-websocket";
import WebSocket from "ws";
import minimist from "minimist";
import { v4 as uuidv4 } from "uuid";

import { RemoteCatAI } from "catai";

import inquirer from "inquirer";

const catai = await new RemoteCatAI("ws://localhost:3000");

console.log(process.argv);
let processTime = 5000;

const argv = minimist(process.argv.slice(2), {
  alias: {
    help: ["h"],
    input: ["i"],
    output: ["o"],
  },
});

const worker = {
  id: uuidv4(),
  state: "starting",
};

let nom = argv.name || "John Doe";
//let age = argv.age || 30;
let prompt = argv.prompt || "Ecris moi une chanson en trois lignes";
let temperature = argv.temperature || 0;

const doc = new Y.Doc();
const wsProvider = new W.WebsocketProvider(
  "ws://localhost:1234",
  "my-roomname",
  doc,
  { WebSocketPolyfill: WebSocket }
);
const awareness = wsProvider.awareness;
awareness.clientId = worker.id;

// const workspace = doc.getMap("workspace");
const todos = doc.getMap("todos");
const doing = doc.getMap("doing");
const done = doc.getMap("done");
const yarray = doc.getArray("my_array");

wsProvider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
  worker.state = event.status;
  updateWorker();
});

catai._ws.on("open", async () => {
  worker.open = true;
  updateWorker();
});

catai._ws.on("close", async () => {
  worker.open = false;
  updateWorker();
});

function updateWorker() {
  // workspace.set(worker.id, worker);
  awareness.setLocalStateField("worker", {
    // Define a print name that should be displayed
    name: nom,
    //age: age,
    worker_id: worker.id,
    open: worker.open,
    state: worker.state,
    style: "catai",
    bind: "node-llama-cpp-v2",
    //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
    type: "text",
    date: Date.now(),
    // Define a color that should be associated to the user:
    //color: "#ffb61e", // should be a hex color
  });
}
// awareness
// All of our network providers implement the awareness crdt

// You can observe when a user updates their awareness information
awareness.on("change", (changes) => {
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(
    "######AWARENESS",
    Array.from(awareness.getStates().values()),
    "#####"
  );
});

// You can think of your own awareness information as a key-value store.
// We update our "user" field to propagate relevant user information.

/////////////

///doc

doc.on("update", (update) => {
  //console.log(update)
  // let date = workspace.get("date");
  // console.log("date", date);
  //console.log("array", yarray.toArray() )
  // console.log("todo", todos.toJSON());
  checkReady();

  // console.log("doing", doing)
  // console.log("done", done)
  // Y.applyUpdate(doc2, update)
});

// Common methods
// workspace.set('prop-name', 'value') // value can be anything json-encodable
// workspace.get('prop-name') // => 'value'
// workspace.delete('prop-name')
function addTodo() {
  let id = uuidv4();
  let todo = {
    id: id,
    type: "text",
    prompt: prompt,
    state: "todo",
    temperature: temperature,
    date: Date.now(),
  };
  todos.set(id, todo);
  // todos.get(id)
  // yarray.push([todo]);
}

var mainLoopId;
function startLoop() {
  // To start the loop
  mainLoopId = setInterval(function () {
    // Do your update stuff...
    console.log("add");
    addTodo();
  }, 2000);
}

// To stop the loop
const checkReady = () => {
  if (
    Array.from(todos.keys()).length > 0 &&
    worker.open &&
    worker.state === "connected"
  ) {
    prepare();
  }
};

function prepare() {
  let id = Array.from(todos.keys())[0];
  let current = todos.get(id);
  if (current != undefined && current.state === "todo") {
    worker.state = "working";
    current.state = "doing";
    (current.worker = worker.id), (current.start = Date.now());
    // if (Math.random() < 0.5) {    // si ramdom necessaire
    doing.set(id, current);
    todos.delete(id);
    process_doing(id);
    // }else{
    //     prepare()
    // }
  }
  console.log(
    "#####PREPARE#####",
    Array.from(todos.keys()).length,
    Array.from(doing.keys()).length,
    Array.from(done.keys()).length
  );
}

const process_doingfake = (id) => {
  let current = doing.get(id);

  setTimeout(function () {
    console.log("Executed after ms ", processTime);
    current.end = Date.now();
    current.result = "Wahou c'est ok";
    current.state = "done";
    current.duration = current.end - current.start;
    console.log("done", current);
    done.set(current.id, current);
    doing.delete(current.id);
    console.log(
      "#####DONE#####",
      Array.from(todos.keys()).length,
      Array.from(doing.keys()).length,
      Array.from(done.keys()).length
    );
    worker.state = "connected";

    checkReady();
  }, processTime);
};

const process_doing = async (id) => {
  let current = doing.get(id);

  let result = "";
  const response = await catai.prompt(current.prompt, (token) => {
    process.stdout.write(token);
    result += token;
  });

  console.log(`\nTotal text length: ${response.length}`);

  current.end = Date.now();
  // current.result = "Wahou c'est ok"
  current.state = "done";
  current.duration = current.end - current.start;
  console.log("done", current);
  done.set(current.id, current);
  doing.delete(current.id);
  console.log(
    "#####DONE#####",
    Array.from(todos.keys()).length,
    Array.from(doing.keys()).length,
    Array.from(done.keys()).length
  );
  worker.state = "connected";

  checkReady();
};

// if must add every second
//startLoop()

function processCommand(answers) {
  if (answers.action === "add_todo") {
    startLoop();
  } else if (answers.action === "stop_adding_todo") {
    clearInterval(mainLoopId);
  }
  commands();
}

function commands() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "add_todo",
          "stop_adding_todo",
          // new inquirer.Separator(),
          // 'Ask for opening hours',
          // {
          //   name: 'Contact support',
          //   disabled: 'Unavailable at this time',
          // },
          // 'Talk to the receptionist',
        ],
      },
      // {
      //   type: 'list',
      //   name: 'size',
      //   message: 'What size do you need?',
      //   choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      //   filter(val) {
      //     return val.toLowerCase();
      //   },
      // },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
      processCommand(answers);
    });
}

commands();

function cleanTodos() {
  for (const key of todos.keys()) {
    todos.delete(key);
  }
}

function cleanDoing() {
  for (const key of doing.keys()) {
    doing.delete(key);
  }
}

function cleanDone() {
  for (const key of done.keys()) {
    done.delete(key);
  }
}

//clearInterval(mainLoopId);
