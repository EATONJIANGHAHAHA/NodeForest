<template>
    <mu-container class="expension-panel">
        <h1>Apply for a postcard for tree {{tree.id}} {{tree.name}}</h1>
        <mu-form ref="form" :model="application" class="mu-login-form" :label-position="labelPosition" label-width="100">
            <mu-form-item label="Tree Name:" :rules="nameRules" prop="tree.name" >
                <mu-text-field type="text" v-model="form.tree.name" placeholder="Give a name of your tree..."></mu-text-field>
            </mu-form-item>
            <mu-select label="Species: " v-model="form.tree.species" :rules="optionRules">
                <mu-option v-for="specy in species" :key="specy" :label="specy" :value="specy"></mu-option>
            </mu-select>
            <mu-select label="Location: " v-model="form.tree.location_id" >
                <mu-option v-for="location in locations" :key="location.id" :label="location.location" :value="location.id"></mu-option>
            </mu-select>
            <mu-form-item label="Amount($):" prop="address">
                <mu-text-field disabled v-model="form.tree.amount"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Sayings:" prop="sayings" >
                <mu-text-field multi-line :rows="4" type="text" v-model="form.tree.sayings" placeholder="Say something to the tree..."></mu-text-field>
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
                routePath: '/'
            }
        },
        created() {
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
        },
        mounted() {
            this.routePath = this.routePath + "trees/detail/" + this.tree.treeId;
        },
        methods: {
            check() {
                this.$refs.form.validate().then((result) => {
                    if (result) {

                        this.$http.post(path + ':3000/api/tree_app/add', {
                            species: this.form.tree.species,
                            location_id: this.form.tree.location_id,
                            sayings: this.form.tree.sayings,
                            name: this.form.tree.name,
                            status:'SUBMITTED',
                            amount:this.form.tree.amount,
                            userId:this.$store.state.user.id
                        }).then(response => {
                            if (response.data.code === "1") {
                                this.dialogText = 'Submission failed'
                                this.openDialog = true
                            } else {
                                this.dialogText = 'Your application is successfully submitted.'
                                this.openDialog = true;
                                this.$router.push('/applications');
                            }
                        }, response => {

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