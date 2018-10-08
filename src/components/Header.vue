<!--Used as header for the whole application.-->
<template>
    <div id="header">
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="openDrawer">
                <img src="../../public/logo.png" height="30px" width="30px">
            </mu-button>
            NodeForest
            <mu-button v-if="!isLoggedIn" flat slot="right" to="/register">Register</mu-button>
            <mu-button flat slot="right" to="/about">About</mu-button>
            <mu-button v-if="!isLoggedIn" flat slot="right" to="/login">Login</mu-button>
            <!--<mu-button v-if="isLoggedIn" flat slot="right" to="/home">Home</mu-button>-->
            <mu-button v-if="isLoggedIn" flat slot="right" @click="logout">Logout</mu-button>
        </mu-appbar>
    </div>
</template>

<script>
    import User from '../model/User';
    import Admin from '../model/Admin';
    import Staff from '../model/Staff';
    const path = require('../common');

    export default {
        name: 'Header',
        components: {},

        computed: {
            /*
                Check whether there is user logged in this web app.
             */
            isLoggedIn() {
                //use this syntax to get state from the store for observable.
                return this.$store.state.user.username ||
                    this.$store.state.admin.username ||
                    this.$store.state.staff.username;
            }
        },
        methods: {
            logout() {
                //todo: add logout functions
                this.$store.dispatch('setUser', new User());
                this.$store.dispatch('setAdmin', new Admin());
                this.$store.dispatch('setStaff', new Staff());
                this.$router.push('/');
            },
            openDrawer() {
                if (this.$store.state.user.id || this.$store.state.admin.id || this.$store.state.staff.staffId) {
                    this.$store.dispatch('setDrawerOpen');
                }
            }
        }
    }
</script>

<style scoped>
    #header {

    }
</style>
