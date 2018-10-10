<!--The welcome page of this project-->
<template>
    <div>
        <mu-container>
            <mu-flex justify-content="center">
                <h1>A project that protects our planet.</h1>
                <input type="file" @click="fileSelectedHandler"/>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>

    export default {
        name: "Index",
        components: {
        },
        methods: {
            fileSelectedHandler() {}
        }
    }
</script>

<style>

</style>
