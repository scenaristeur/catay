cd catay/server/

nodemon .  --name "Bob le Scribe" --temperature 3 --age 45 --prompt "raconte-moi une blague"




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