<!--Used as the entry of the application.-->
<!--The most basic component for rendering-->
<template>
    <div id="app">
        <div>
            <Drawer/>
            <Header/>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Drawer from './components/Drawer'
    import User from "./model/User";
    import Admin from "./model/Admin";
    import Staff from "./model/Staff";

    export default {
        name: 'app',
        components: {
            Header,
            Drawer,
        },
        created() {
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg"))));

            window.addEventListener("beforeunload", () => {
                localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
            })

            this.$http.get(path + ":3000/api/root/")
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.code !== '1' && response.data === "empty session") {

                        this.$store.dispatch("setUser", new User());
                        this.$store.dispatch("setStaff", new Staff());
                        this.$store.dispatch("setAdmin", new Admin());

                    }
                })
</script>
<style>
</style>
