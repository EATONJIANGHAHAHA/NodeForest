<template>
    <mu-container class="expension-panel">
        <h1>Welcome, {{this.$store.state.admin.username}}</h1>
    </mu-container>
</template>

<script>
    export default {
        name: "AdminHome",
        data() {
            return {

            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
</style>