<template>
    <h1>{{ user.name }}</h1>
    {{ user.id }} {{ user.state }}
    <hr>
    <button v-if="user.state != 'connected'" v-on:click="connect()">Connect</button>
    <button @click="add()">Add</button>
</template>
  
<script>

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import * as awarenessProtocol from 'y-protocols/awareness.js'


// enable logging for all modules
localStorage.log = 'true'
// enable logging only for y-webrtc
localStorage.log = 'y-webrtc'
// by specifying a regex variables
localStorage.log = '^y.*'


export default {
    name: "UserView",
    data() {
        return {


        }
    },
    created() {
        console.log("created")
        this.user.log()
        if (this.user.state != 'connected') {
            this.user.connect()
        }
        this.initWebrtc()
    },
    methods: {
        add() {
            this.textField.insert(0, "testString");
        },
        initWebrtc() {



            const ydoc = new Y.Doc()
            const webrtcPovider = new WebrtcProvider('my-roomname', ydoc, {
                signaling: [
                    // 'ws://localhost:4444',
                    'wss://wrtc-yllm.glitch.me'


                ],
                awareness: new awarenessProtocol.Awareness(ydoc),
            })
            const yarray = ydoc.getArray()
            const todos = ydoc.getMap("todos");

            webrtcPovider.on('synced', synced => {
                // NOTE: This is only called when a different browser connects to this client
                // Windows of the same browser communicate directly with each other
                // Although this behavior might be subject to change.
                // It is better not to expect a synced event when using y-webrtc
                console.log('synced!', synced)
            })
            console.log('provider', webrtcPovider)

            const awareness = webrtcPovider.awareness;





            const textField = this.textField = ydoc.getText("test");
            textField.observe(() => {
                console.log("Textfield changed!", textField.toString());
                // textDiv.innerHTML = `Total length: ${textField.toString().length}<br />
                // ${textField.toString()}`;
            });





            awareness.on("change", (changes) => {
                // Whenever somebody updates their awareness information,
                // we log all awareness information from all users.
                let agents = Array.from(awareness.getStates().values())
                console.log("######AWARENESS", agents.length)
                // agents.forEach(a => {
                //   try {
                //     console.log(a)
                //   } catch (e) {
                //     console.log(e, a)
                //   }

                // })
                // console.log("#####", agents.length);

            });

            yarray.observeDeep(() => {
                console.log('yarray updated: ', yarray.toJSON())
            })

            ydoc.on("update", (update) => {
                console.log(update)
                // let date = workspace.get("date");
                // console.log("date", date);
                //console.log("array", yarray.toArray() )
                // console.log("todo", todos.toJSON());
                // this.prepare();
                //this.log()
                console.log("todo", todos.toJSON());
                //   console.log("doing", doing.toJSON());
                //    console.log("done", done.toJSON());

                //    if(doing.size > 0){
                //      console.log("doing", doing.entries())
                //      for (const value of doing.values()) { 
                //        console.log("doing", value)
                //      }
                //    }

                // console.log("doing", doing.keys(), this.listening)

                //  Array.from(doing.toJSON()).forEach(doing_task => {
                //    console.log("doing", doing_task)
                //  })

                // let task = doing.get([this.listening[0]])
                // console.log("TASK0", task)
                // console.log("done", done)
                // Y.applyUpdate(doc2, update)
            });

            // @ts-ignore
            window.example = { webrtcPovider, ydoc, yarray }
        },
        connect() {
            console.log('connec')
            this.user.connect()
        }
    },
    computed: {
        user() {
            return this.$store.state.core.user
        },
    }
}

</script>



<style scoped></style>
  