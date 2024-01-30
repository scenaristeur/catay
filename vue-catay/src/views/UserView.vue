<template>
    <h1>{{ user.name }}</h1>
    {{ user.id }} {{ user.state }}
    <hr>
    <button v-if="user.state != 'connected'" v-on:click="connect()">Connect</button>
</template>
  
<script>

import * as Y from 'yjs'
            import { WebrtcProvider } from 'y-webrtc'


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

        initWebrtc() {

            localStorage.log = 'y-webrtc'

            const ydoc = new Y.Doc()
            const provider = new WebrtcProvider('my-roomname', ydoc, { 
                signaling: [
                    'wss://wrtc-yllm.glitch.me',
                    'ws://localhost:4444'

                ] })
            const yarray = ydoc.getArray()
            const todos = ydoc.getMap("todos");

            provider.on('synced', synced => {
                // NOTE: This is only called when a different browser connects to this client
                // Windows of the same browser communicate directly with each other
                // Although this behavior might be subject to change.
                // It is better not to expect a synced event when using y-webrtc
                console.log('synced!', synced)
            })
            console.log('provider', provider)

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
            window.example = { provider, ydoc, yarray }
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
  