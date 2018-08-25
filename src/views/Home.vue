<template>
    <div>
        <Header/>
        <ol>
            <li id="tree-info-list" v-for="treeInfo in treeInfoList">
                <TreeInfo v-bind="treeInfo"/>
            </li>
        </ol>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import TreeInfo from "../components/TreeInfo"
    import treeInfoList from "../components/SudoTreeInfos"

    export default {
        name: "Home",
        created: {

        },
        data() {
            return {
                treeInfoList
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
