<template>
    <div>
        <Header/>
        <p>Register</p>
        <div id="main">
            <h1>Welcome</H1>
            <form v-if="!hide">
                USERNAME:<br>
                <input type="text" name="username" v-model="userName"/>
                <br>
                PASSWORD:<br>
                <input type="text" name="password" v-model="passWord"/>
                <br>Email: <br>
                <input type="text" name="email"/>
            </form>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header'

    export default {
        name: "Register",
        components: {
            Header,
        }
    }
</script>

<style scoped>

</style>
