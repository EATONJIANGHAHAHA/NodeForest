<template>
    <div id="header">
        <img src="../../public/logo.png" height="30px" width="30px">
        <div id="right-section" class="right-section">
            <router-link to="/register" id="register">Register</router-link>
            <router-link to="/about" id="about">About</router-link>
            <router-link to="/login" id="login">Login</router-link>
            <router-link to="/home" id="home">Home</router-link>
        </div>
    </div>
</template>

<script>
    import Button from "muse-ui/es5/internal/mixins/button"

    export default {
        name: "Header",
        components: {
            Button
        }
    }
</script>

<style scoped>
    #logo {
        float: left
    }
    #right-section {
        float: right;
    }
    #header {
        padding:5px;
    }
    #register {
        margin: 5px;
    }
    #about {
        margin: 5px;
    }
    #login {
        margin: 5px;
    }
    #home {
        margin: 5px;
    }
</style>
