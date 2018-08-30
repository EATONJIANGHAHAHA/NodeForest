<template>
    <div>
        <Header/>
        <!--when iterating through components, make sure :key"id" is used to optimize performance.-->
        <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import TreeInfo from '../components/TreeInfo'

    export default {
        name: 'Home',
        created() {
            // console.log(this.$store.state.user);
            // console.log('user id is: ')
            // console.log(this.$store.state    .user[0].id);
            this.$http.get('http://127.0.0.1:3000/api/user/getTrees',
                {
                    params: {
                        userId: this.$store.state.user.id
                    }
                }
            ).then((response) => {
                /*console.log("response:");
                console.log(response.data[1]);*/
                this.$store.dispatch('setTrees', response.data)//todo: trees' id have problem.
                for (let i = 0; i < this.$store.state.trees.length; i++) {
                    this.trees.push(this.$store.state.trees[i])
                }
            }, (response) => {
                console.log('error')
            })
            //todo: call server tree api

        },
        data() {
            return {
                //right now we are getting trees generated for testing.
                trees: []
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
</style>
