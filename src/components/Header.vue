<template>
    <div id="header">
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left">
                <img src="../../public/logo.png" height="30px" width="30px">
            </mu-button>
            NodeForest
            <mu-button flat slot="right" to="/register">Register</mu-button>
            <mu-button flat slot="right" to="/about">About</mu-button>
            <mu-button v-if="!isLoggedIn" flat slot="right" to="/login">Login</mu-button>
            <mu-button v-if="isLoggedIn" flat slot="right" to="/home">Home</mu-button>
            <mu-button v-if="isLoggedIn" flat slot="right" @click="logout()">Logout</mu-button>
        </mu-appbar>
    </div>
</template>

<script>

    export default {
        name: "Header",
        components: {},
        data() {
            return {
                /*userName: ''*/
            }
        },
        mounted() {

        },
        computed: {
            isLoggedIn() {
                //use this syntax to get state from the store for observable.
                return this.$store.state.user.username;
            }
        },
        methods: {
            logout() {
                //todo: add logout functions
            }
        }
    }
</script>

<style scoped>
    #header {

    }
</style>
