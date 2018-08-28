<template>
    <div>
        <Header/>
        <mu-container class="main">
            <h1>Welcome</H1>
            <p>descriptions</p>
            <mu-form :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="input" label="Username" >
                    <mu-text-field v-model="form.user.username"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="input" label="Password" >
                    <mu-text-field type="password" v-model="form.user.password"></mu-text-field>
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
    import User from "../model/User";

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
                    user: new User,
                }
            }
        },
        components: {
            Header
        },
        methods: {
            check() {
                //TODO: express api called here.
                // if (this.form.user.password === this.form.username) {
                    if (this.form.select === 'User') {
                        let url = '127.0.0.1:3000/api/user/login';
                        let body = [
                            this.form.user.username,
                            this.form.user.password,
                        ];
                        console.log(url);
                        this.$http.post('http://127.0.0.1:3000/api/user/login',
                            {username:this.form.user.username, password:this.form.user.password},
                            {emulateJSON: true}).then(response => {
                            //success callback
                            console.log(response.data);
                        }, response => {
                            //error callback
                            console.log('error');
                        });
                        this.$store.dispatch("setUser", this.form.user);
                        Router.push('home')
                    }
                    else {
                        //TODO: jump to staff main page.
                    }
                // }
            },

            clear() {
                this.form.username = '';
                this.form.password = '';
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
