<template>
    <mu-form :model="tree" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="input" label="Tree Name">
            <mu-text-field v-model="form.name" :placeholder=""/>
        </mu-form-item>
        <mu-form-item prop="input" label="Tree sayings">
            <mu-text-field v-model="form.sayings" :placeholder=""/>
        </mu-form-item>
        <mu-form-item>
            <mu-button color="secondary" @click="click">Update</mu-button>
        </mu-form-item>
    </mu-form>
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
                    name,
                    sayings
                }
            }
        },
        created() {
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
        },
        methods: {
            click() {
                let trees = this.$store.state.trees;
                let index = trees.indexOf(this.tree);
                this.tree.name = this.form.name;
                this.tree.sayings = this.form.sayings;
                this.$http.post(path + ":3000/api/tree/user/update", {

                })
            }
        }
    }
</script>

<style scoped>

</style>