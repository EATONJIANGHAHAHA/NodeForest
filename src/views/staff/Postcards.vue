<template>
    <mu-container style="margin:20px">
        <mu-tabs :value.sync="tabIndex" color="secondary" indicator-color="dark" full-width>
            <mu-tab><h3>Unsent</h3></mu-tab>
            <mu-tab><h3>Sent</h3></mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="tabIndex === 0">
            <mu-expansion-panel v-for="(incomplete, index) in inCompletes" v-bind="incomplete">
                <div slot="header"><h2>Postcard No.{{incomplete.id}} for {{incomplete.recipient}}</h2></div>
                <mu-sub-header><h3>Tree No.{{incomplete.tree_id}}</h3></mu-sub-header>
                <mu-sub-header>Apply Date: {{incomplete.apply_date}}</mu-sub-header>
                <mu-sub-header>Address: {{incomplete.address}}</mu-sub-header>
                <mu-sub-header>Message: {{incomplete.message}}</mu-sub-header>
                <mu-button slot="action" icon @click="send(index)">
                    <mu-icon value="send"></mu-icon>
                </mu-button>
                <mu-button slot="action" icon @click="getTemplate(index)">
                    <mu-icon value="vertical_align_bottom"></mu-icon>
                </mu-button>
            </mu-expansion-panel>
        </div>
        <div class="demo-text" v-if="tabIndex === 1">
            <mu-expansion-panel v-for="complete in completes" v-bind="complete">
                <div slot="header"><h2>Postcard No.{{complete.id}} for {{complete.recipient}}</h2></div>
                <mu-sub-header><h3>Tree No.{{complete.tree_id}}</h3></mu-sub-header>
                <mu-sub-header>Apply Date: {{complete.apply_date}}</mu-sub-header>
                <mu-sub-header>Address: {{complete.address}}</mu-sub-header>
                <mu-sub-header>Message: {{complete.message}}</mu-sub-header>
                <mu-sub-header>Status Date: {{complete.status}}</mu-sub-header>
                <mu-sub-header>Receive Date: {{complete.receive_date}}</mu-sub-header>
            </mu-expansion-panel>
        </div>
        <mu-dialog title="Notice" width="360" :open.sync="openDialog">
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
                openDialog: false,
                dialogText: '',
            }
        },
        created() {
            console.log("User: postcards.");
            this.getCompletes();
            this.getIncompletes();

        },

        methods: {

            getCompletes() {

                this.$http.get(path + ':3000/api/postcard_app/staff/sent?staffId=' + this.$store.state.staff.id, {}).then(response => {
                    console.log(response.data);
                    this.completes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.completes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            getIncompletes() {
                this.$http.get(path + ':3000/api/postcard_app/staff/unsent?staffId=' + this.$store.state.staff.id, {}).then(response => {
                    console.log(response.data);
                    this.inCompletes = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.inCompletes.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            send(i) {
                this.$http.put(path + ':3000/api/postcard_app/send',
                    {
                        id: this.inCompletes[i].id
                    }).then(response => {
                    console.log(response.data);
                    if (response.data.code === "1") {
                        this.dialogText = 'Error: please try again later.'
                        this.openDialog = true
                    } else {
                        this.dialogText = 'Postcard is successfully submitted.'
                        this.openDialog = true;

                        this.getCompletes();
                        this.getIncompletes();
                    }
                }, response => {
                    this.dialogText = 'Error: please try again later.'
                    this.openDialog = true
                })
            },

            getTemplate(i){
                this.$http.get(path + ':3000/api/postcard_app/download/' + this.inCompletes[i].tree_id, {responseType: 'arraybuffer'}).then(response => {
                    // console.log(response.data);
                    if (response.data.code === "1") {
                        this.dialogText = 'Error: please try again later.'
                        this.openDialog = true
                    } else {

                        console.log("Created postcard");
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        let head = response.headers['content-disposition'];
                        let filename = 'postcard.pdf';
                        if (head) {
                            try {
                                filename = head.split(';')[1].split('=')[1]
                            } catch (err){
                                console.log('can not get pdf name');
                            }

                        }
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        return response;
                    }
                }, response => {
                    this.dialogText = 'Error: please try again later.'
                    this.openDialog = true
                })
            },

            closeDialog() {
                this.openDialog = false
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