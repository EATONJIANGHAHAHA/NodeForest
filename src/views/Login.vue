<!--The log in page for all users.-->
<template>
    <div>
        <mu-container class="main">
            <h1>Welcome</H1>
            <mu-form :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item label="Username" :rules="usernameRules" prop="user.username">
                    <mu-text-field v-model="form.user.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="Password" :rules="passwordRules" prop="user.password">
                    <mu-text-field type="password" v-model="form.user.password"></mu-text-field>
                </mu-form-item>
                <mu-flex class="select-control-row" :key="type" v-for="type in types">
                    <mu-radio :value="type" v-model="radio.loginType" :label="type"></mu-radio>
                </mu-flex>
            </mu-form>
            <mu-button round @click="check" color="primary">Login</mu-button>

            <mu-dialog title="Warning!" width="360" :open.sync="openDialog">
                {{dialogText}}
                <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
            </mu-dialog>
        </mu-container>
    </div>
</template>

<script>
    import User from "../model/User";

    export default {
        name: "Login",
        data() {
            return {
                types: [
                    'User',
                    'Staff'
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
                        validate: (val) => val.length >= 3 && val.length <= 10,
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
            }
        },
        components: {},
        methods: {
            /*
                Use post method to call the user api or staff api for login
                action from the server.
            */
            check() {
                console.log(this.radio.loginType.length === 0);
                if (this.radio.loginType.length === 0) {

                    this.dialogText = 'Please select a login type.';
                    this.openDialog = true;
                }
                else {
                    this.dialogText = 'Your password or username is incorrect. Please try again.';
                }
                if (this.radio.loginType === 'User') {
                    this.$http.post('http://127.0.0.1:3000/api/user/login',
                        {
                            username: this.form.user.username,
                            password: this.form.user.password
                        }).then(response => {
                        //response.data.length !== 0 ||
                        if (response.data.code === "1") {
                            this.openDialog = true;
                        } else {
                            this.$store.dispatch("setUser", response.data);
                            this.$router.push('home');
                        }
                    }, response => {
                        //error callback
                        this.openDialog = true;
                    });
                }
                else {
                    //TODO: Staff log in operation.
                    this.openDialog = true;
                }
            },

            closeDialog() {
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
