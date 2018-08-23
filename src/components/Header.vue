<template>
    <div id="header">
        <!--<img src="../../public/logo.png" height="30px" width="30px">
        <div id="right-section" class="right-section">
            <router-link to="/register" id="register">Register</router-link>
            <router-link to="/about" id="about">About</router-link>
            <router-link to="/login" id="login">Login</router-link>
            <router-link to="/home" id="home">Home</router-link>
        </div>-->
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left">
                <img src="../../public/logo.png" height="30px" width="30px">
            </mu-button>
            NodeForest

            <mu-button flat slot="right" to="/register">Register</mu-button>
            <mu-button flat slot="right" to="/about">About</mu-button>
            <mu-button flat slot="right" to="/login">Login</mu-button>
            <mu-button flat slot="right" to="/home">Home</mu-button>
        </mu-appbar>
    </div>
</template>

<script>

    export default {
        name: "Header",
        components: {
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
