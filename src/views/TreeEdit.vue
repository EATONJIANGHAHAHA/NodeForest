<template>
    <mu-container style="padding-top: 50px;">
        <mu-form :model="form" label-position="top" label-width="100">
            <mu-form-item v-if="this.$store.state.user.id" prop="name" label="Tree Name" :rules="nameRules">
                <mu-text-field v-model="form.name" :placeholder="form.oldName"/>
            </mu-form-item>
            <mu-form-item v-if="this.$store.state.user.id" prop="sayings" label="Tree sayings" :rules="sayingsRules">
                <mu-text-field v-model="form.sayings" :placeholder="form.oldSayings"/>
            </mu-form-item>
            <mu-form-item v-if="this.$store.state.staff.id" prop="height" label="Tree height" :rules="nameRules">
                <mu-text-field v-model="form.height" :placeholder="form.oldHeight"/>
            </mu-form-item>
            <mu-form-item v-if="this.$store.state.staff.id" prop="health" label="Tree health" :rules="sayingsRules">
                <mu-text-field v-model="form.health" :placeholder="form.oldHealth"/>
            </mu-form-item>
            <mu-form-item v-if="this.$store.state.user.id">
                <mu-button  color="secondary" @click="click">Update</mu-button>
            </mu-form-item>
            <mu-form-item v-if="this.$store.state.staff.id">
                <mu-button color="secondary" @click="staffClick">Update</mu-button>
            </mu-form-item>
            <mu-snackbar :color="normal.color" position="bottom" :open.sync="normal.open">
                {{normal.message}}
                <mu-button flat slot="action" color="secondary" @click="normal.open = false" :round="true">Close</mu-button>
            </mu-snackbar>
        </mu-form>
    </mu-container>
</template>

<script>
    import Tree from '../model/Tree'
    import path from '../common'

    export default {
        name: "TreeEdit",
        data() {
            return {
                tree: Tree,
                form: {
                    sayings: '',
                    name: '',
                    height: '',
                    health: '',

                    oldSayings: '',
                    oldName: '',
                    oldHeight: '',
                    oldHealth: '',
                },
                normal: {
                    color: 'success',
                    open: false,
                    message: 'Tree info updated!',
                },
                nameRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Tree name is required'
                    },
                    {
                        validate: (val) => val.length <= 10,
                        message: 'Tree name has to be shorter than 10 characters'
                    }
                ],
                sayingsRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Tree sayings is required'
                    },
                    {
                        validate: (val) => val.length <= 100,
                        message: 'Tree sayings has to be shorter than 100 characters'
                    }
                ],
                heightRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Tree name is required'
                    }
                ],
                healthRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Tree sayings is required'
                    }
                ],
            }
        },
        created() {
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
            this.form.oldSayings = this.tree.sayings;
            this.form.oldName = this.tree.name;
            this.form.oldHeight = this.tree.height;
            this.form.oldHealth = this.tree.health;
        },
        methods: {
            click() {
                let trees = this.$store.state.trees;
                let index = trees.indexOf(this.tree);
                this.tree.name = this.form.name;
                this.tree.sayings = this.form.sayings;
                this.$http.post(path + ':3000/api/tree/user/update', {
                    sayings: this.form.sayings,
                    name: this.form.name,
                    id: this.$route.params.treeId,
                }).then(response => {
                    trees[index] = this.tree;
                    this.$store.dispatch('setTrees', trees);
                    this.normal.open = true;
                }, response => {

                })
            },
            staffClick() {
                let trees = this.$store.state.trees;
                let index = trees.indexOf(this.tree);
                this.tree.height = this.form.name;
                this.tree.health = this.form.health;
                this.$http.post(path + ':3000/api/tree/staff/update', {
                    height: this.form.height,
                    health: this.form.health,
                    id: this.$route.params.treeId,
                }).then(response => {
                    trees[index] = this.tree;
                    this.$store.dispatch('setTrees', trees);
                    this.normal.open = true;
                }, response => {

                })
            }
        }
    }
</script>

<style scoped>

</style>