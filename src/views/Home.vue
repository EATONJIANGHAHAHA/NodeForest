<!--Home page of the user, by default display the trees owned by the user..-->
<!--Automatically opened when successfully logging in as user.-->
<template>
    <div>
        <Header/>
        <!--when iterating through components, make sure :key"id" is used to optimize performance.-->
        <!--display the trees owned by the user briefly.-->
        <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
        <mu-container id="alert">
            <mu-alert color="success" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
                <mu-icon left value="check_circle"></mu-icon> You have Logged in.
            </mu-alert>
        </mu-container>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import TreeInfo from '../components/TreeInfo'

    export default {
        name: 'Home',
        /*
        * When creating the page, use get method to get the trees owned by the user
        * Preparing for displaying the tree information.
        */
        created() {
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
            setInterval(() => this.alert1 = false, 3000);
        },

        data() {
            return {
                alert1: true,
                trees: []// trees of the user.
            }
        },

        components: {
            Header,
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
    #alert {
        margin-top: 20px;
    }
</style>
