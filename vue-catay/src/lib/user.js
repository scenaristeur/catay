import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { v4 as uuidv4 } from "uuid";

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc)

wsProvider.on('status', event => {
  console.log("Websocket provider", event.status) // logs "connected" or "disconnected"
})




// const workspace = doc.getMap("workspace");
const todos = doc.getMap("todos");


export class User {
  constructor({ name = "inconnu" }) {
    this.name = name;
    this.id = uuidv4()
    this.awareness = null
    this.connect()
  }
  log() {
    console.log(this.name)
  }
  connect() {
    let user = this
    console.log("connect")
    this.awareness = wsProvider.awareness;
    this.awareness.clientId = this.id;
    this.awareness.on("change", (changes) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      let agents = Array.from(user.awareness.getStates().values())
      console.log("######AWARENESS", agents.length)
      agents.forEach(a => {
        try {
          console.log(a.agent.type, a.agent.state, a.agent.name, a.agent.id, a.agent.style, a)
        } catch (e) {
          console.log(e, a)
        }

      })
      console.log("#####", agents.length);
    });

    wsProvider.on("status", (event) => {
      console.log("wsProvider", event.status); // logs "connected" or "disconnected"
      user.state = event.status;
      this.updateWorker();
    });
  }
  updateWorker() {
    // workspace.set(worker.id, worker);

    let ui_client = {
      // Define a print name that should be displayed
      name: this.name,
      //age: age,
      id: this.id,
      //open: worker.open,
      state: this.state,
      style: "catay:vue3:v1.0.0",
      // bind: "node-llama-cpp-v2",
      //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
      type: "client",
      //date: Date.now(),
      // Define a color that should be associated to the user:
      //color: "#ffb61e", // should be a hex color
    }


    this.awareness.setLocalStateField("agent", ui_client);
  }
}