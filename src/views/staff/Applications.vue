<template>
    <mu-container style="margin:20px">
        <mu-tabs :value.sync="tabIndex" color="secondary" indicator-color="dark" full-width>
            <mu-tab><h3>Application</h3></mu-tab>
            <mu-tab><h3>History</h3></mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="tabIndex === 0">
            <mu-expansion-panel v-for="(incomplete, index) in inCompletes" v-bind="incomplete">
                <div slot="header"><h2>Application No.{{incomplete.id}} for {{incomplete.species}}</h2></div>
                <mu-sub-header><h3>Tree Name: {{incomplete.name}}</h3></mu-sub-header>
                <mu-sub-header>Date: {{incomplete.apply_date}}</mu-sub-header>
                <mu-sub-header>Location: {{incomplete.location}}</mu-sub-header>
                <mu-sub-header>Status: {{incomplete.status}}</mu-sub-header>
                <mu-sub-header>Amount: {{incomplete.amount}}</mu-sub-header>
                <mu-sub-header>Sayings: {{incomplete.sayings}}</mu-sub-header>
                <h1>{{incomplete.reason}}</h1>
                <mu-text-field placeholder="Reason..." v-model="inCompletes[index]['reason']" slot="action"></mu-text-field>
                <mu-button slot="action" icon @click="complete(index, 'APPROVED')">
                    <mu-icon value="done_all"></mu-icon>
                </mu-button>
                <mu-button slot="action" icon @click="complete(index, 'DISAPPROVED')">
                    <mu-icon value="cancel"></mu-icon>
                </mu-button>
            </mu-expansion-panel>
        </div>
        <div class="demo-text" v-if="tabIndex === 1">
            <mu-expansion-panel v-for="complete in completes" v-bind="complete">
                <div slot="header"><h2>Application No.{{complete.id}} for {{complete.species}}</h2></div>
                <mu-sub-header><h3>Tree Name: {{complete.name}}</h3></mu-sub-header>
                <mu-sub-header>Submit Date: {{complete.apply_date}}</mu-sub-header>
                <mu-sub-header>Location: {{complete.location}}</mu-sub-header>
                <mu-sub-header>Status: {{complete.status}}</mu-sub-header>
                <mu-sub-header>Sayings: {{complete.sayings}}</mu-sub-header>
                <mu-sub-header>Amount: {{complete.amount}}</mu-sub-header>
                <mu-sub-header>Result Date: {{complete.complete_date}}</mu-sub-header>
            </mu-expansion-panel>
        </div>
        <mu-dialog title="Warning!" width="360" :open.sync="isDialogOpen">
            {{dialogText}}
            <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
        </mu-dialog>
    </mu-container>
</template>

<script>
    let path = require("../../common.js")
    export default {
        name: "Applications",
        data() {
            return {
                tabIndex: 0,
                inCompletes: [],
                completes: [],
                isDialogOpen: false,
                dialogText: '',
            }
        },
        created() {
            console.log("Staff: applications.");
            this.getCompletes();
            this.getIncompletes();

        },

        methods: {

            getCompletes() {

                this.$http.get(path + ':3000/api/tree_app/staff/complete?staffId=' + this.$store.state.staff.id, {}).then(response => {
                    console.log(response.data);
                    this.completes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.completes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            getIncompletes() {
                this.$http.get(path + ':3000/api/tree_app/staff/incomplete?staffId=' + this.$store.state.staff.id, {}).then(response => {
                    console.log(response.data);
                    this.inCompletes = [];
                    for (let i = 0; i < response.data.length; i++){
                        this.inCompletes.push(response.data[i]);
                        this.inCompletes[i].reason = '';
                    }

                }, response => {
                    console.log('error')
                })
            },

            complete(i, status){
                if(status === 'DISAPPROVED' && this.inCompletes[i].reason === ''){
                    this.openDialog("Please fill in the reason of rejection.")
                }
                else {
                    this.$http.put(path + ':3000/api/tree_app/', {
                        status: status,
                        reason: this.inCompletes[i].reason,
                        id: this.inCompletes[i].id
                    }).then(response => {
                        console.log(response.data);
                        if (response.data.code === 1){
                            this.openDialog("Failed!")
                        }
                        else {
                            this.openDialog("Success!")
                            this.getIncompletes();
                            this.getCompletes();
                        }

                    }, response => {
                        console.log('error');
                        this.openDialog("Failed!");
                    })
                }


            },

            openDialog(text) {
                this.dialogText = text;
                this.isDialogOpen = true;
            },

            closeDialog() {
                this.isDialogOpen = false;
            },
        }
    }
</script>

<style scoped>

    .expension-panel {
        padding: 20px 0
    }

    .mu-button {
        margin: 20px;
    }
</style>