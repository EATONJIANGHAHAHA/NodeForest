<!--Used as the entry of the application.-->
<!--The most basic component for rendering-->
<template>
    <div id="app">
        <div>
            <Drawer/>
            <Header/>
            <transition name="fade" mode="out-in">
                <router-view />
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
        },
    }
</script>
<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.1s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
