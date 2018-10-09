<template>
    <mu-container style="margin:20px">
        <mu-tabs :value.sync="index" color="secondary" indicator-color="dark" full-width>
            <mu-tab><h3>Application</h3></mu-tab>
            <mu-tab><h3>History</h3></mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="index === 0">
            <mu-expansion-panel v-for="incomplete in inCompletes" v-bind="incomplete">
                <div slot="header"><h2>Application No.{{incomplete.id}} for {{incomplete.species}}</h2></div>
                <mu-sub-header><h3>Tree Name: {{incomplete.name}}</h3></mu-sub-header>
                <mu-sub-header>Date: {{incomplete.apply_date}}</mu-sub-header>
                <mu-sub-header>Location: {{incomplete.location}}</mu-sub-header>
                <mu-sub-header>Status: {{incomplete.status}}</mu-sub-header>
            </mu-expansion-panel>
        </div>
        <div class="demo-text" v-if="index === 1">
            <mu-expansion-panel v-for="complete in completes" v-bind="complete">
                <div slot="header"><h2>Application No.{{complete.id}} for {{complete.species}}</h2></div>
                <mu-sub-header><h3>Tree Name: {{complete.name}}</h3></mu-sub-header>
                <mu-sub-header>Date: {{complete.apply_date}}</mu-sub-header>
                <mu-sub-header>Location: {{complete.location}}</mu-sub-header>
                <mu-sub-header>Status: {{complete.status}}</mu-sub-header>
            </mu-expansion-panel>
        </div>
        <mu-button large fab color="red" to="/trees/application">
           <mu-icon value="edit"></mu-icon>
        </mu-button>
    </mu-container>
</template>

<script>
    let path = require("../../common.js")
    export default {
        name: "Applications",
        data() {
            return {
                index: 0,
                inCompletes: [],
                completes: []
            }
        },
        created() {
            console.log("User: applications.");
            this.getCompletes();
            this.getIncompletes();

        },

        methods: {

            getCompletes() {

                this.$http.get(path + ':3000/api/tree_app/complete?userId=' + this.$store.state.user.id, {}).then(response => {
                    console.log(response.data);
                    this.completes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.completes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            getIncompletes() {
                this.$http.get(path + ':3000/api/tree_app/incomplete?userId=' + this.$store.state.user.id, {}).then(response => {
                    console.log(response.data);
                    this.inCompletes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.inCompletes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

        }
    }
</script>

<style scoped>

    .expension-panel {
        padding: 20px 0
    }
    .mu-button{
        margin: 20px;
    }
</style>