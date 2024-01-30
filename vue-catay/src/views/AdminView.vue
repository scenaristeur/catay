<template>
    <div>
<h1>ADMIN</h1>

// BE CAREFULL //
<button v-on:click="clean()">Clean</button>
<button v-on:click="add_ten()">Add 10</button>
    </div>
</template>

<script>
    export default {
        name: "AdminView",
        methods: {
clean() {
    this.user.clean()
},
add_ten() {
    for (let i = 0; i < 10; i++) {
        this.user.addTodo({prompt:"Qu'est-ce que tu racontes "+i, temperature: 0})
    }
}
        },
        computed: {
        user() {
            return this.$store.state.core.user
        },
    }
    }
</script>

<style scoped>

</style>