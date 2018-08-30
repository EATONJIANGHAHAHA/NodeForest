<!--Register user page.-->
<template>
    <div>
        <Header/>
        <mu-container>
            <h1>Register</H1>
            <mu-form :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="input" label="Username">
                    <mu-text-field v-model="form.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input" label="Password">
                    <mu-text-field type="password" v-model="form.password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input" label="Email">
                    <mu-text-field v-model="form.email"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button @click="submit">Register</mu-button>
        </mu-container>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Router from '../router'
    import store from "../store"

    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        components: {
            Header,
        },
        methods: {
            //TODO: validation of the user input.
            /*
                Validate the user input.
            */
            validate() {
                if (this.form.username != '') {
                    Router.push('home')
                    store.commit("SET_USER", username)
                }
            },

            /*
                Submit the user register information use post request.
            */
            submit() {
                this.$http.post('http://127.0.0.1:3000/api/user/register',
                    {
                        username: this.form.username,
                        password: this.form.password,
                        email: this.form.email
                    }
                ).then(response => {
                    console.log(response.data);
                    Router.push('home');
                    //Store the user information in the session.
                    this.$store.dispatch("setUser", new User(
                        response.data,//user id.
                        this.form.username,
                        this.form.password,
                        this.form.email,
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
