# adding a todo from the front or another process

/vue-catay/src/lib/user.js :line 122 called by vue-catay/src/views/SendView.vue
```
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
  ```

# starting a worker

/server/index.js
```
let worker = new Worker({
  name: argv.name || "Bob",
  job: "écrivain",
  systemPrompt:
    "you are a pirate and you end all your sentences with 'Héhéhé, moussaillon!'",
  //catai_url: argv.catai_url || "ws://localhost:3000",
  multi_channel: true,
  yjs_url: 'wss://ylm-websocket.glitch.me/',  //argv.yjs_url || "ws://localhost:1234", "ws://localhost:9999", //
  yjs_room: argv.yjs_room || "my-roomname",
  debug: argv.debug || true, // change to false by default
  healthCheckInterval: argv.healthCheckInterval || 5000,
  runMcTest : false // if should run mc test to test if the model is ok

  // color: argv.color || "blue"
});
```


# deploying y-websocket on glitch.me

- [YJS] connecting loop
throw a 502 error as it needs that the nodejs client adds user-agent headers 
lust change y-websocket/src/y-websocket.js according to https://github.com/yjs/y-websocket/pull/173/commits/69ddb2c49ac73e76b1ab8b2876d24fe94a153819


# models
models like vicuna-7b-v1.5-16k.Q2_K.gguf should be in server/src/mcConnector/models/
using node-llama-cpp https://withcatai.github.io/node-llama-cpp/api/type-aliases/LlamaContextOptions#seed


cd catay/server/

nodemon .  --name "Bob le Scribe" --temperature 3 --age 45 --prompt "raconte-moi une blague"


this.options.healthCheckInterval = 5000 au lancement puis 60000 (5 secondes, puis toutes les minutes)

# yjs server
- en dehors d'un projet node
PORT=1234 npx y-websocket

```
(node:4211) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/stag/dev/catay/node_modules/y-websocket/src/y-websocket.js:7
import * as Y from 'yjs' // eslint-disable-line
^^^^^^

SyntaxError: Cannot use import statement outside a module

```
dans node_modules/y-websocket/

fix https://github.com/yjs/y-websocket/issues/170
bug on --websocket 
  "type":"module",


run outside a project with type:module as y-websocket server is commonjs
```
PORT=1234 YPERSISTENCE=./dbDir npx y-websocket

PORT=1234 npx y-websocket

:~/catai/models$ PORT=1234 npx y-websocket-server
Need to install the following packages:
y-websocket-server@1.0.2
Ok to proceed? (y) y
npm WARN deprecated y-websocket-server@1.0.2: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
this is incorrect, please use `npx y-websocket` instead
:~/catai/models$ PORT=1234 npx y-websocket
Need to install the following packages:
y-websocket@1.5.3
Ok to proceed? (y) y
running at 'localhost' on port 1234

```


# catai server
```
/dev/catai/server$ npm run cli serve
```

# node yjs client
lancer deux fois

node yjs.js

node yjs.js --name John --temperature 3 --age 45 --prompt "raconte-moi une blague"

node yjs.js --name Adrienne --temperature 0.7 --age 30 --prompt "Quelle est la capitale de la France?"

# browser client

# what is y-dat ?
https://github.com/yjs/y-dat

# monitoring
- s-tui


