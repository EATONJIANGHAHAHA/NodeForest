<template>
    <div>
        <Header/>
        <!--when iterating through components, make sure :key"id" is used to optimize performance.-->
        <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import TreeInfo from "../components/TreeInfo"
    import treeInfoList from "../components/SudoTreeInfos"

    export default {
        name: "Home",
        created() {
            this.$store.dispatch('setTrees',this.trees);
        },
        data() {
            return {
                trees: treeInfoList
            }
        },
        components: {
            Header,
            TreeInfo
        },
        methods: {

        }
    }
</script>

<style scoped>
    #tree-info-list {
        margin: 10px;
        float: left;
        list-style: none;
    }
</style>
