<!--The log in page for all users.-->
<template>
    <div>
        <mu-container class="main">
            <h1>Welcome</H1>
            <mu-form ref="form" :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item label="Username" :rules="usernameRules" prop="user.username">
                    <mu-text-field v-model="form.user.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="Password" :rules="passwordRules" prop="user.password">
                    <mu-text-field v-model="form.user.password" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'" :action-icon="visibility ? 'visibility_off' : 'visibility'" ></mu-text-field>
                </mu-form-item>
                <mu-flex class="select-control-row" :key="type" v-for="type in types">
                    <mu-radio :value="type" v-model="radio.loginType" :label="type"></mu-radio>
                </mu-flex>
            </mu-form>
            <mu-button round @click="check" color="secondary">Login</mu-button>
            <mu-dialog title="Warning!" width="360" :open.sync="openDialog">
                {{dialogText}}
                <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
            </mu-dialog>
        </mu-container>
    </div>
</template>

<script>
    import User from "../model/User";
    import md5 from "js-md5";
    import Admin from "../model/Admin";
    import Staff from "../model/Staff";
    var path = require("../common.js");

    export default {
        name: "Login",
        data() {
            return {
                types: [
                    'User',
                    'Staff',
                    'Admin'
                ],
                radio: {
                    loginType: [],
                },
                usernameRules: [
                    {
                        validate: (val) => !!val,
                        message: 'User name is required'
                    },
                    {
                        validate: (val) => val.length >= 3,
                        message: 'User name has to be longer than 3 characters'
                    }
                ],
                passwordRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Password is required'
                    },
                    {
                        validate: (val) => val.length >= 3,
                        message: 'Password name has to be longer than 3 characters'
                    }
                ],
                options: [
                    'User',
                    'Staff'
                ],
                labelPosition: 'top',
                form: {
                    user: new User,
                },
                openDialog: false,
                dialogText: 'Your password or username is incorrect. Please try again.',
                visibility: false
            }
        },
        components: {},
        methods: {
            /*
                Use post method to call the user api or staff api for login
                action from the server.
            */
            check() {
                this.$refs.form.validate().then((result) => {
                    if(result) {
                        if (this.radio.loginType.length === 0) {
                            this.dialogText = 'Please select a login type.';
                            this.openDialog = true;
                        }
                        else {
                            this.dialogText = 'Your password or username is incorrect. Please try again.';
                        }
                        this.form.user.password = md5(md5(this.form.user.password) + this.form.user.username);
                        if (this.radio.loginType === 'User') {
                            console.log(window.location.host);

                            this.$http.post(path + ':3000/api/user/login', {
                                    username: this.form.user.username,
                                    password: this.form.user.password
                                }).then(response => {
                                if (response.data.code === "1") {
                                    this.openDialog = true;
                                } else {
                                    this.$store.dispatch("setUser", response.data);
                                    this.$store.dispatch("setStaff", new Staff());
                                    this.$store.dispatch("setAdmin", new Admin());
                                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                                    this.setCookie('session', response.data.session, expireDays);
                                    this.$router.push('/user/home');
                                }
                            }, response => {
                                //error callback
                                this.openDialog = true;
                            });
                        } else if (this.radio.loginType === 'Staff'){
                            this.$http.post( path + ':3000/api/staff/login', {
                                username: this.form.user.username,
                                password: this.form.user.password
                            }).then(response => {
                                if (response.data.code === "1") {
                                    this.openDialog = true;
                                } else {
                                    this.$store.dispatch("setStaff", response.data);
                                    this.$store.dispatch("setUser", new User());
                                    this.$store.dispatch("setAdmin", new Admin());
                                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                                    this.setCookie('session', response.data.session, expireDays);
                                    this.$router.push('/staff/home');
                                }
                            }, response => {
                                //error callback
                                this.openDialog = true;
                            })
                        } else {
                            this.$http.post( path + ':3000/api/admin/login', {
                                username: this.form.user.username,
                                password: this.form.user.password
                            }).then(response => {
                                if (response.data.code === "1") {
                                    this.openDialog = true;
                                } else {
                                    console.log(response.data);
                                    this.$store.dispatch("setAdmin", response.data);
                                    this.$store.dispatch("setUser", new User());
                                    this.$store.dispatch("setStaff", new Staff());
                                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                                    this.setCookie('session', response.data.session, expireDays);
                                    this.$router.push('/admin/home')
                                }
                            }, response => {
                                //error callback
                                this.openDialog = true;
                            })
                        }
                    }
                    else {
                        this.dialogText = 'Please correct your input.';
                        this.openDialog = true;
                    }
                });
            },

            closeDialog() {
                this.clear();
                this.openDialog = false;
            },

            /*
               Called when the log in operation fails.
               Clear the error inputs.
            */
            clear() {
                this.$refs.form.clear();
                this.form.user = new User('', '', '', '', '', '', '');
            },
        }
    }
</script>

<style scoped>
    .mu-login-form {
        width: 100%;
        max-width: 460px;
    }

    .select-control-row {
        padding: 8px 0;
    }
</style>
