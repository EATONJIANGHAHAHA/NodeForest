<template>
    <mu-container class="expension-panel">
        <h1>Apply for a postcard for tree {{tree.id}} {{tree.name}}</h1>
        <mu-form ref="form" :model="application" class="mu-login-form" :label-position="labelPosition" label-width="100">
            <mu-form-item label="Postcode:" :rules="postCodeRules" prop="postCode" >
                <mu-text-field type="text" v-model="application.postCode" placeholder="Postcode..."></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Address:" prop="address" :rules="addressRules">
                <mu-text-field v-model="application.address"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Recipient:" prop="recipient" :rules="recipientRules">
                <mu-text-field v-model="application.recipient"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Message:" prop="sayings" >
                <mu-text-field multi-line :rows="4" type="text" v-model="application.message" placeholder="What you want to in the postcard, leave it blank if you want our staff to fill in for you..."></mu-text-field>
            </mu-form-item>
        </mu-form>
        <mu-dialog title="Notice" width="360" :open.sync="openDialog">
            {{dialogText}}
            <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
        </mu-dialog>
        <mu-container>
            <mu-button round color="success" @click="()=>{this.$router.push(routePath)}">Back</mu-button>
            <mu-button round @click="check" color="secondary">Apply</mu-button>
        </mu-container>
    </mu-container>
</template>

<script>
    import Tree from "../../model/Tree";
    import PostcardApplication from "../../model/PostcardApplication";

    let path = require("../../common.js")

    export default {
        name: "Postcard",
        data() {
            return {
                tree: new Tree(),
                application: new PostcardApplication(),
                routePath: '/',
                postCodeRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Postcode is required.'
                    },
                    {
                        validate: (val) => /\d{4}/.test(val),
                        message: 'Please enter a valid postcode.'
                    }
                ],
                addressRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Address is required.'
                    },
                ],
                recipientRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Recipient is required.'
                    },
                ],
                openDialog: false,
                dialogText: '',
                labelPosition: 'top',
            }
        },
        created() {
            console.log("postcard")
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
        },
        mounted() {
            this.routePath = this.routePath + "trees/detail/" + this.tree.treeId;
        },
        methods: {
            check() {
                this.$refs.form.validate().then((result) => {
                    if (result) {
                        this.$http.post(path + ':3000/api/postcard_app/add', {
                            address: this.application.address,
                            treeId: this.tree.treeId,
                            recipient: this.application.recipient,
                            postCode: this.application.postCode,
                            message: this.application.message
                        }).then(response => {
                            if (response.data.code === "1") {
                                this.dialogText = 'Submission failed'
                                this.openDialog = true
                            } else {
                                this.dialogText = 'Your application is successfully submitted.'
                                this.openDialog = true;
                                // this.$router.push('/applications');
                            }
                        }, response => {
                            this.dialogText = 'Submission failed: system error.'
                            this.openDialog = true
                        })

                    }
                    else {
                        this.dialogText = 'Please correct your input.'
                        this.openDialog = true
                    }
                })
            },


            closeDialog() {
                this.openDialog = false
            },

            clear() {
                this.$refs.form.clear()
            },
        }

    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
    .mu-button{
        margin: 10px;
    }
</style>