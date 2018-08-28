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
                    <mu-text-field v-model="form.password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input" label="Email">
                    <mu-text-field v-model="form.email"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button @click="validate">Register</mu-button>
        </mu-container>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Router from '../router'
    import store from "../store";

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
          validate(){
              if(this.form.username != '') {
                  Router.push('home')
                  store.commit("SET_USER", userName)
              }
          }
        }
    }
</script>

<style scoped>

</style>
