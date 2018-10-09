<template>
    <mu-container style="padding: 20px">
        <TreeInfo class="treeInfo" v-for="tree in trees" v-bind="tree" :key="tree.treeId"></TreeInfo>
    </mu-container>
</template>

<script>
    import TreeInfo from '../../components/TreeInfo'

    export default {
        name: 'StaffHome',
        data() {
            return {
                trees: []
            }
        },
        created() {
            this.$http.post('http://127.0.0.1:3000/api/staff/trees', {
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
        },
        components: {
            TreeInfo,
        },
    }
</script>

<style scoped>
    .treeInfo{
        display: inline-block;
        padding: 10px;
    }
</style>