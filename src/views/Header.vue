<template>
    <div>
        <button>logo</button>
        <router-link to="/register">Register</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/home">Home</router-link>
    </div>
</template>

<script>
    import Button from "muse-ui/es5/internal/mixins/button";

    export default {
        name: "Header",
        components: {
            Button
        }
    }
</script>

<style scoped>

</style>
