import * as Y from 'https://cdn.jsdelivr.net/npm/yjs/src/index.js'
// I can not impor y-websocket
import { WebsocketProvider } from 'https://cdn.jsdelivr.net/npm/y-websocket/src/y-websocket.js'
import { v4 as uuidv4 } from './node_modules/uuid/dist/index.js'

// Define "require"
//import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);

// const W = require('./node_modules/y-websocket/dist/y-websocket.cjs')

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider(
  //'ws://localhost:9999',
  //'ws://localhost:1234',
  'wss://ylm-websocket.glitch.me',
  'my-roomname',
  doc
)

wsProvider.on('status', (event) => {
  console.log('Websocket provider', event.status) // logs "connected" or "disconnected"
})

// const workspace = doc.getMap("workspace");
const todos = doc.getMap('todos')
const doing = doc.getMap('doing')
const done = doc.getMap('done')

export class User {
  constructor({ name = 'inconnu' }) {
    this.name = name
    this.id = uuidv4()
    this.listening = []
    this.awareness = null
    this.connect()
  }

  log() {
    console.log(this.name)
    console.log(
      '#####todos doing done#####',
      Array.from(todos.keys()).length,
      Array.from(doing.keys()).length,
      Array.from(done.keys()).length
    )
  }

  connect() {
    let user = this
    console.log('connect')
    this.awareness = wsProvider.awareness
    this.awareness.clientId = this.id
    this.awareness.on('change', (changes) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      let agents = Array.from(user.awareness.getStates().values())
      console.log('######AWARENESS', agents.length)
      agents.forEach((a) => {
        try {
          console.log(a.agent.type, a.agent.state, a.agent.name, a.agent.id, a.agent.style, a)
        } catch (e) {
          console.log(e, a)
        }
      })
      console.log('#####', agents.length)
    })

    wsProvider.on('status', (event) => {
      console.log('wsProvider', event.status) // logs "connected" or "disconnected"
      user.state = event.status
      this.updateWorker()
    })

    doc.on('update', (update) => {
      //console.log(update)
      // let date = workspace.get("date");
      // console.log("date", date);
      //console.log("array", yarray.toArray() )
      // console.log("todo", todos.toJSON());
      // this.prepare();
      this.log()
      console.log('todo', todos.toJSON())
      console.log('doing', doing.toJSON())
      console.log('done', done.toJSON())

      if (doing.size > 0) {
        console.log('doing', doing.entries())
        for (const value of doing.values()) {
          console.log('doing', value)
        }
      }

      // console.log("doing", doing.keys(), this.listening)

      //  Array.from(doing.toJSON()).forEach(doing_task => {
      //    console.log("doing", doing_task)
      //  })

      // let task = doing.get([this.listening[0]])
      // console.log("TASK0", task)
      // console.log("done", done)
      // Y.applyUpdate(doc2, update)
    })
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
      style: 'catay:vue3:v1.0.0',
      // bind: "node-llama-cpp-v2",
      //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
      type: 'client'
      //date: Date.now(),
      // Define a color that should be associated to the user:
      //color: "#ffb61e", // should be a hex color
    }

    this.awareness.setLocalStateField('agent', ui_client)
  }

  addTodo(options) {
    let id = uuidv4()
    let todo = {
      id: id,
      asker: this.id,
      type: 'text',
      prompt: options.prompt || 'prompt',
      state: 'todo',
      seed: options.seed || 0,
      temperature: options.temperature || 0,
      date: Date.now()
    }
    console.log(todo)
    todos.set(id, todo)
    this.listening.push(id)
  }
  clean() {
    this.cleanTodos()
    this.cleanDoing()
    this.cleanDone()
  }
  cleanTodos() {
    for (const key of todos.keys()) {
      todos.delete(key)
    }
  }

  cleanDoing() {
    for (const key of doing.keys()) {
      doing.delete(key)
    }
  }

  cleanDone() {
    for (const key of done.keys()) {
      done.delete(key)
    }
  }
}
