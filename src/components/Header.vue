<!--Used as header for the whole application.-->
<template>
    <div id="header">
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="openDrawer">
                <img src="../../public/logo.png" height="30px" width="30px">
            </mu-button>
            Node Forest
            <mu-button v-if="!isLoggedIn" flat slot="right" to="/register">
                <mu-icon value="perm_identity"/>
                Register
            </mu-button>
            <mu-button flat slot="right" to="/about">
                <mu-icon value="info"/>
                About
            </mu-button>
            <mu-button v-if="!isLoggedIn" flat slot="right" to="/login">
                <mu-icon value="input"/>
                Login
            </mu-button>
            <mu-button v-if="isLoggedIn" flat slot="right" @click="home">
                <mu-icon value="home"/>
                Home
            </mu-button>
            <mu-button v-if="isLoggedIn" flat slot="right" @click="logout">
                <mu-icon value="input"/>
                Logout
            </mu-button>
        </mu-appbar>
    </div>
</template>

<script>
    import User from '../model/User';
    import Admin from '../model/Admin';
    import Staff from '../model/Staff';
    const Const = require('../common');

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
                this.$store.dispatch(Const.store.setUser, new User());
                this.$store.dispatch(Const.store.setAdmin, new Admin());
                this.$store.dispatch(Const.store.setStaff, new Staff());
                this.delCookie('session');
                this.$router.push('/');
            },
            openDrawer() {
                if (this.$store.state.user.id || this.$store.state.admin.id || this.$store.state.staff.id) {
                    this.$store.dispatch(Const.store.setDrawerOpen);
                }
            },
            home(){
                if (this.$store.state.user.id) this.$router.push(Const.user + Const.home);
                if (this.$store.state.admin.id) this.$router.push(Const.admin + Const.home);
                if (this.$store.state.staff.id) this.$router.push(Const.staff + Const.home)
            }
        }
    }
</script>

<style scoped>
    #header {

    }
</style>
