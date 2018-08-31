<!--Home page of the user, by default display the trees owned by the user..-->
<!--Automatically opened when successfully logging in as user.-->
<template>
    <div>
        <!--when iterating through components, make sure :key"id" is used to optimize performance.-->
        <!--display the trees owned by the user briefly.-->
        <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
    </div>
</template>

<script>
    import TreeInfo from '../components/TreeInfo'

    export default {
        name: 'Home',
        /*
        * When creating the page, use get method to get the trees owned by the user
        * Preparing for displaying the tree information.
        */
        created() {
            this.$store.dispatch('setDrawerOpen');
            this.$http.get('http://127.0.0.1:3000/api/user/getTrees',
                {
                    params: {
                        userId: this.$store.state.user.id
                    }
                }
            ).then((response) => {
                //Store the trees information in the session.
                this.$store.dispatch('setTrees', response.data);

                //TODO: Display message when there is no tree owned by the user yet.
                for (let i = 0; i < this.$store.state.trees.length; i++) {
                    this.trees.push(this.$store.state.trees[i])
                }
            }, (response) => {
                //TODO: Display error message when there is error loading the trees.
                console.log('error')
            });
        },
        data() {
            return {
                trees: []// trees of the user.
            }
        },
        components: {
            TreeInfo
        },
        methods: {}
    }
</script>

<style scoped>
    #tree-info-list {
        margin: 10px;
        float: left;
        list-style: none;
    }
</style>
