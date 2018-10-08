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

    export default {
        name: 'app',
        components: {
            Header,
            Drawer,
        },
        created(){
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
            })

        }
    }
</script>
<style>
</style>
