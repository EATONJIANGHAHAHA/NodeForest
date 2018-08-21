<template>
    <div>
        <Header/>
        <div id="main">
            <h1>Welcome</H1>
            <p v-if="!hide">descriptions</p>
            <form v-if="!hide">
                USERNAME:<br>
                <input type="text" name="username" v-model="userName"/>
                <br>
                PASSWORD:<br>
                <input type="text" name="password" v-model="passWord"/>
                <br><br>
                <router-link to="/home" id="home">Log in as user</router-link>
                <router-link to="/treemanagement" id="staff">Log in as staff</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header'

    export default {
        name: "Login",
        data() {
            return {
                userName: '',
                passWord: '',
                hide: false,
            }
        },
        components: {
            Header
        },
        methods: {
            checkUser() {
                if (this.userName === '123' && this.passWord === '456') {
                    this.hide = true
                }
            }
        }
    }
</script>

<style scoped>
    #main {
        text-align: center;
    }
</style>
