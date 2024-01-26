<template>
    <h1>{{ user.name }}</h1>
    <button v-on:click="connect()">Connect</button>

    <button v-on:click="counter += 1">Add 1</button>
  <p>Le bouton ci-dessus a été cliqué {{ counter }} fois.</p>

</template>
  
<script>
import { User } from '@/lib/user.js';



export default {
    name: "UserView",
    data() {
        return {
            user: new User({ name: "Bob le worker" }),
            counter: 0
        }
    },
    created() {
        console.log("created")
        this.user.log()

    },
    methods: {
        connect() {
            console.log('connec')
            this.user.connect()
        }
    }
}

</script>



<style scoped></style>
  