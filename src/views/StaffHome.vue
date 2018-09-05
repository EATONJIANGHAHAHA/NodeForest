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
            console.log(this.$store.state.staff.staffId);
            this.$http.post('http://127.0.0.1:3000/api/staff/trees', {
                staffId: this.$store.state.staff.staffId
            }).then(response => {
                console.log(response.data);
                if (response.data.length !== 0) {
                    for (let i = 0; i < response.data.length; i++)
                        this.trees.push(response.data[i]);
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

</style>