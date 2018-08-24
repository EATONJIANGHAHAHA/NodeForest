<template>
    <div>
        <Header/>
        <mu-container class="main">
            <h1>Welcome</H1>
            <p>descriptions</p>
            <mu-form :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="input" label="Username" >
                    <mu-text-field v-model="form.userName"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input" label="Password" >
                    <mu-text-field v-model="form.passWord"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="select" label="Login as: ">
                    <mu-select v-model="form.select">
                        <mu-option v-for="option, index in options" :key="option" :label="option"
                                   :value="option"></mu-option>
                    </mu-select>
                </mu-form-item>
            </mu-form>
            <mu-button round @click="check" color="primary">Login</mu-button>
        </mu-container>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Router from '../router'
    import store from "../store";

    export default {
        name: "Login",
        data() {
            return {
                usernameRules: [
                    { validate: (val) => !!val, message: 'User name is required'},
                    { validate: (val) => val.length >= 3, message: 'User name has to be longer than 3 characters'}
                ],
                passwordRules: [
                    { validate: (val) => !!val, message: 'Password is required'},
                    { validate: (val) => val.length >= 3 && val.length <= 10, message: 'Password name has to be longer than 3 characters'}
                ],
                options: [
                    'User', 'Staff'
                ],
                labelPosition: 'top',
                form: {
                    userName: '',
                    passWord: '',
                }

            }
        },
        components: {
            Header
        },
        methods: {
            check() {
                if (this.form.passWord === '123') {
                    if (this.form.select === 'User') {
                        store.commit("setUserName", this.form.userName)
                        Router.push('home')
                    }
                    else {
                        //TODO: jump to staff main page.
                    }
                }
            },

            clear() {
                this.form.userName = ''
                this.form.passWord = ''
            },
        }
    }
</script>

<style scoped>
    .mu-login-form {
        width: 100%;
        max-width: 460px;
    }
</style>
