<!--Register user page.-->
<template>
    <div>
        <mu-container class="main">
            <h1 style="padding-left: 20px;">Register</H1>
            <mu-form ref="form" :model="form" :label-position="labelPosition" label-width="100" class="mu-login-form">
                <mu-form-item prop="user.username" label="Username" :rules="usernameRules" icon="person">
                    <mu-text-field v-model="form.user.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.password" icon="lock" label="Password" :rules="passwordRules">
                    <mu-text-field type="password"  v-model="form.user.password" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'" :action-icon="visibility ? 'visibility_off' : 'visibility'"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.email" label="Email" :rules="emailRules" icon="email">
                    <mu-text-field v-model="form.user.email"></mu-text-field>
                </mu-form-item>
                <mu-flex class="flex-wrapper" justify-content="end">
                    <mu-button @click="submit" round color="secondary"><mu-icon value="check_circle_outline"></mu-icon>Register</mu-button>
                </mu-flex>
            </mu-form>
            <mu-dialog title="Warning!" width="360" :open.sync="isDialogOpen">
                {{dialogText}}
                <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
            </mu-dialog>
        </mu-container>
    </div>
</template>

<script>
    import Router from '../router'
    import User from "../model/User";
    import md5 from "js-md5";
    import path from "../common";

    export default {
        name: "Register",
        data() {
            return {
                reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                usernameRules: [
                    {
                        validate: (val) => !!val,
                        message: 'User name is required'
                    },
                    {
                        validate: (val) => val.length >= 3,
                        message: 'User name has to be longer than 3 characters'
                    },
                    {
                        validate:(val) => {

                            let before = performance.now()
                            console.log("Before request: " + before);
                            this.$http.post(path + ':3000/api/user/usernameExist', {
                            username: val,
                        }).then(response => {
                            let after = performance.now();
                            let difference = after - before;
                            console.log("After response: " + after + ", difference: " + difference);
                            return response.data.number === 0;
                        }, response => {
                            return true;
                        })
                        },

                        message: 'Username already exists.'
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
                emailRules: [
                    {
                        validate: (val) => this.reg.test(val),
                        message: 'Please check your email format.'
                    }
                ],
                form: {
                    user: new User(),
                },
                isDialogOpen: false,
                dialogText: '',
                labelPosition: 'top',
                visibility: false
            }
        },
        components: {
        },
        methods: {
            //TODO: validation of the user input.
            submit() {
                this.$refs.form.validate().then((result) => {
                    if(result) {
                        console.log('username');
                        console.log(this.form.user.username);
                        this.form.user.password = md5(md5(this.form.user.password) + this.form.user.username);
                        this.$http.post(path + ':3000/api/user/register',
                            {
                                username: this.form.user.username,
                                password: this.form.user.password,
                                email: this.form.user.email,
                                address: this.form.user.address,
                                phone: this.form.user.phone,
                            }
                        ).then(response => {
                            console.log(response.data);
                            if(response.data.code === "1") {
                                this.clear();
                                this.openDialog('Some given information has already been registered. Please try again.');
                            }
                            else {
                                Router.push('home');
                                //Store the user information in the session.
                                this.$store.dispatch("setUser", new User(
                                    response.data,//user id.
                                    this.form.user.username,
                                    this.form.user.password,
                                    this.form.user.email,
                                    null,
                                    null,
                                    0.0
                                    )
                                )
                            }
                        }, response => {
                            console.log(response.data);
                            this.openDialog("Please correct your input.");
                        })
                    }
                    else {
                        this.openDialog("Please correct your input.");
                    }
                });
            },

            openDialog(text) {
                this.dialogText = text;
                this.isDialogOpen = true;
            },

            closeDialog() {
                this.clear();
                this.isDialogOpen = false;
            },

            clear() {
                this.$refs.form.clear();
                this.form.user = new User('', '', '', '', '', '', '');
            }
        }
    }
</script>

<style scoped>
    .mu-login-form {
        width: 100%;
        max-width: 460px;
    }
</style>
