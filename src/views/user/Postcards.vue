<template>
    <mu-container style="margin:20px">
        <mu-tabs :value.sync="tabIndex" color="secondary" indicator-color="dark" full-width>
            <mu-tab><h3>Unreceived</h3></mu-tab>
            <mu-tab><h3>Received</h3></mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="tabIndex === 0">
            <mu-expansion-panel v-for="(incomplete, index) in inCompletes" v-bind="incomplete">
                <div slot="header"><h2>Postcard No.{{incomplete.id}} for {{incomplete.recipient}}</h2></div>
                <mu-sub-header><h3>Tree No.{{incomplete.tree_id}}</h3></mu-sub-header>
                <mu-sub-header>Apply Date: {{incomplete.apply_date}}</mu-sub-header>
                <mu-sub-header>Address: {{incomplete.address}}</mu-sub-header>
                <mu-sub-header>Status: {{incomplete.status}}</mu-sub-header>
                <mu-sub-header>Message: {{incomplete.message}}</mu-sub-header>
                <mu-container v-if="$store.state.user.id">
                    <mu-button v-if="inCompletes[index].status === 'SENT'" slot="action" icon @click="receive(index)">
                        <mu-icon value="done_all"></mu-icon>
                    </mu-button>
                </mu-container>

            </mu-expansion-panel>
        </div>
        <div class="demo-text" v-if="tabIndex === 1">
            <mu-expansion-panel v-for="complete in completes" v-bind="complete">
                <div slot="header"><h2>Postcard No.{{complete.id}} for {{complete.recipient}}</h2></div>
                <mu-sub-header><h3>Tree No.{{complete.tree_id}}</h3></mu-sub-header>
                <mu-sub-header>Apply Date: {{complete.apply_date}}</mu-sub-header>
                <mu-sub-header>Address: {{complete.address}}</mu-sub-header>
                <mu-sub-header>Message: {{complete.message}}</mu-sub-header>
                <mu-sub-header>Receive Date: {{complete.receive_date}}</mu-sub-header>
            </mu-expansion-panel>
        </div>
    </mu-container>
</template>

<script>
    let path = require("../../common.js");

    export default {
        name: "UserApplications",
        data() {
            return {
                tabIndex: 0,
                inCompletes: [],
                completes: []
            }
        },
        created() {
            console.log("User: postcards.");
            this.getCompletes();
            this.getIncompletes();

        },

        methods: {

            getCompletes() {

                this.$http.get(path.path + ':3000/api/postcard_app/user/received?userId=' + this.$store.state.user.id, {}).then(response => {
                    console.log(response.data);
                    this.completes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.completes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            getIncompletes() {
                this.$http.get(path.path + ':3000/api/postcard_app/user/unreceived?userId=' + this.$store.state.user.id, {}).then(response => {
                    console.log(response.data);
                    this.inCompletes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.inCompletes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            receive(i){
                this.$http.put(path.path + ':3000/api/postcard_app/receive',
                    {
                        id: this.inCompletes[i].id
                }).then(response => {
                    console.log(response.data);
                    this.getCompletes();
                    this.getIncompletes();
                }, response => {
                    console.log('error')
                })
            }

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