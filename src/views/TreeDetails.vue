<template>
    <div>
        <Header/>
        <h1>Tree No. {{treeNumber}}</h1>
        <mu-flex class="flex-wrapper" justify-content="center" fill>
            <mu-flex justify-content="end" fill>
                <img src="../../public/tree1.jpg" height="200px" width="200px"/>
            </mu-flex>

            <mu-list nested-indent="true">
                <mu-list-item v-for="item in infos" v-bind="item.id">
                    <mu-list-item-title>{{item.label}}</mu-list-item-title>
                    <mu-list-item-content>{{item.value}}</mu-list-item-content>
                </mu-list-item>
                <mu-button>Historical Photos</mu-button>
                <mu-button>Postcards</mu-button>
            </mu-list>
        </mu-flex>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import treeInfos from "../components/SudoTreeInfos"

    export default {
        name: "TreeDetails",

        data() {
            return {
                treeNumber: 123456,
                date: 32,
                month: 'Jun',
                year: 2020,
                infos: [
                    {id: 1, label: 'Height: ', value: '100cm'},
                    {id: 2, label: 'Health: ', value: 'Good'},
                    {id: 3, label: 'Location: ', value: 'Africa'},
                    {id: 4, label: 'Updated: ', value: new Date()},
                ],
                //this syntax will define a object.
                treeInfo: {},
            }
        },
        components: {
            Header
        },
        mounted() {
            console.log(this.$route.params.location);
            for (let i = 0; i < treeInfos.length; i++) {
                if(treeInfos[i].location === this.$route.params.location) {
                    this.treeInfo = treeInfos[i];
                }
            }
        }
    }
</script>

<style scoped>
    .flex-wrapper {
        width: 100%;
        height: 56px;
        margin-top: 8px;
    }
</style>
