<!--Used as header for the whole application.-->
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
            <mu-button v-if="isLoggedIn" flat slot="right" @click="logout">Logout</mu-button>
            <mu-dialog title="Dialog" width="360" :open.sync="openDialog">
                You are Logged Out.
                <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
            </mu-dialog>
        </mu-appbar>
    </div>
</template>

<script>
    import User from "../model/User";

    export default {
        name: "Header",
        components: {},
        data() {
            return {
                openSimple: false
            }
        },
        mounted() {

        },
        computed: {
            /*
                Check whether there is user logged in this web app.
             */
            isLoggedIn() {
                //use this syntax to get state from the store for observable.
                return this.$store.state.user.username;
            }
        },
        methods: {
            logout() {
                //todo: add logout functions
                this.$store.dispatch('setUser', new User());
                this.openDialog = true;
            },
            closeDialog() {
                this.openDialog = false;
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    #header {

    }
</style>
