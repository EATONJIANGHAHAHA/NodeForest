<template>
    <mu-container class="expension-panel" v-if="$store.state.admin.id">
        <h1>Welcome, {{this.$store.state.admin.username}}</h1>
    </mu-container>
    <mu-container class="treeInfo" v-else-if="$store.state.staff.id || $store.state.user.id">
        <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
    </mu-container>
</template>

<script>
    import TreeInfo from '../components/TreeInfo'
    import path from '../common'

    export default {
        name: "Home",
        created() {
            if (this.$store.state.user.id) {
                this.$http.get(path.path + ':3000/api/user/getTrees', {
                    params: {
                        userId: this.$store.state.user.id
                    }
                }).then((response) => {
                    //Store the trees information in the session.
                    this.$store.dispatch('setTrees', response.data);
                    //TODO: Display message when there is no tree owned by the user yet.
                    for (let i = 0; i < this.$store.state.trees.length; i++) {
                        this.trees.push(this.$store.state.trees[i])
                    }
                }, (response) => {
                    console.log('error')
                });
            } else if (this.$store.state.staff.id) {
                this.$http.post(path.path + ':3000/api/staff/trees', {
                    staffId: this.$store.state.staff.id
                }).then(response => {
                    if (response.data.length !== 0) {
                        for (let i = 0; i < response.data.length; i++)
                            this.trees.push(response.data[i]);
                        console.log(this.trees);
                        this.$store.dispatch('setTrees', this.trees);
                    } else {
                        //TODO: do something if there is no match.
                    }
                }, response => {
                    // error callback
                    console.log('error');
                    console.log(response);
                })
            }
        },
        data() {
            return {
                trees: []// trees of the user.
            }
        },
        components: {
            TreeInfo
        },
    }
</script>

<style scoped>
    .treeInfo {
        display: inline-block;
        padding: 10px;
        margin: 10px;
        float: left;
        list-style: none;
    }
</style>