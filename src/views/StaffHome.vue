<template>
    <mu-container style="padding: 20px">
        <mu-expansion-panel>
            <div slot="header">Trees</div>
            <TreeInfo id="tree-info-list" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">Tree Applications</div>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">Postcard Applications</div>
        </mu-expansion-panel>
    </mu-container>
</template>

<script>
    import TreeInfo from '../components/TreeInfo'

    export default {
        name: 'StaffHome',
        data() {
            return {
                trees: []
            }
        },
        created() {

        },
        components: {
            TreeInfo,
        },
    }
</script>

<style scoped>

</style>