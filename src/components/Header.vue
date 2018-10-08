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
            <mu-button v-if="isLoggedIn" flat slot="right" to="/home">Home</mu-button>
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
        data() {
            return {
                openSimple: false,
                user: new User,
                admin: new Admin('','',''),
                staff: new Staff,
            }
        },
        created() {
            const _this = this;
            this.$http.get(path + ':3000/api/')
                .then(response => {
                    console.log(response.data);
                    if (response.data.code !== '1') {
                        if (response.data !== 'empty session') {
                            console.log(response.data.type);
                            if (response.data.type === 'user') {
                                this.user.id = response.data.id;
                                this.user.username = response.data.username;
                                this.user.password = response.data.password;
                                this.user.email = response.data.email;
                                this.user.phone = response.data.phone;
                                this.user.address = response.data.address;
                                this.user.balance = response.data.balance;
                            } else if (response.data.type === 'staff') {
                                this.staff.staffId = response.data.staffId;
                                this.staff.username = response.data.username;
                                this.staff.password = response.data.password;
                                this.staff.email = response.data.email;
                                this.staff.phone = response.data.phone;
                                this.staff.address = response.data.address;
                            } else if (response.data.type === 'admin') {
                                this.admin.id = response.data.id;
                                this.admin.username = response.data.username;
                                this.admin.password = response.data.password;
                            }
                        }
                    } else {

                    }
                }, response => {
                    console.log('Error occurred during transaction');
                });
        },
        mounted() {
            console.log('Updated:');
            console.log(this.admin);
            console.log(this.usertype);
            if (this.user.id !== '') {
                this.$store.dispatch('setUser', this.user);
            } if (this.staff.id !== 'staff') {
                this.$store.dispatch('setStaff', this.staff);
            } if (this.admin.id !== 'admin') {
                console.log('inisde admin');
                this.$store.dispatch('setAdmin', this.admin);
            }
        },
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
