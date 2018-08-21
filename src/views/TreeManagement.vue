<template>
<div>
    <h1>Tree Management</h1>
    <p>Tree No. {{treeNumber}}</p>

    <img src="../../public/tree.jpg" height="200px" width="200px"/>
    <p>Updated at: {{date}}th, {{month}}, {{year}}</p>

    <div>
        <p>Height: {{height}}cm</p><br/>
        <p>Health: {{health}}</p><br/>
        <p>Location: {{location}}</p><br/>
        <input type="button" value="Update"/> <!--this should be a route instead-->
    </div>
    <router-link to="/myaccount" id="myaccount">My account</router-link>
</div>
</template>

<script>
    export default {
        name: "TreeManagement",
        data() {
            return {
                treeNumber: 123456,
                date: 32,
                month: 'Jun',
                year: 2020
            }
        },
        components: {

        }
    }
</script>

<style scoped>

</style>