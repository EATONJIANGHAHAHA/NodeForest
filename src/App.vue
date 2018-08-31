<!--Used as the entry of the application.-->
<!--The most basic component for rendering-->
<template>
    <div id="app">
        <div>
            <Drawer/>
            <Header/>
            <transition name="fade">
                <router-view/>
            </transition>
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
        }
    }
</script>
<style>
</style>
