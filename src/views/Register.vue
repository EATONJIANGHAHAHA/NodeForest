<!--Register user page.-->
<template>
    <div>
        <mu-container>
            <h1>Register</H1>
            <mu-form :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="user.username" label="Username" :rules="usernameRules">
                    <mu-text-field v-model="form.user.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.password" label="Password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="form.user.password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.email" label="Email" :rules="emailRules">
                    <mu-text-field v-model="form.user.email"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button @click="submit">Register</mu-button>
        </mu-container>
    </div>
</template>

<script>
    import Router from '../router'
    import User from "../model/User";

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
                emailRules: [
                    {
                        validate: (val) => this.reg.test(val),
                        message: 'Please check your email format.'
                    }
                ],
                form: {
                    user: new User(),
                }
            }
        },
        components: {
        },
        methods: {
            //TODO: validation of the user input.
            /*
                Validate the user input.
            */
            /*validate() {
                if (this.form.username != '') {
                    Router.push('home');
                    store.commit("SET_USER", username);
                }
            },*/
            /*
                Submit the user register information use post request.
            */
            submit() {
                this.$http.post('http://127.0.0.1:3000/api/user/register',
                    {
                        username: this.form.user.username,
                        password: this.form.user.password,
                        email: this.form.user.email,
                        address: this.form.user.address,
                        phone: this.form.user.phone,
                    }
                ).then(response => {
                    console.log(response.data);
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
                }, response => {
                    //error callback
                    console.log('error')
                })
            }
        }
    }
</script>

<style scoped>

</style>
