<!--Detail page of the tree-->
<!--Can be used both by the user and staff-->
<template>
    <div>
        <Header/>
        <h1>Tree No. {{tree.treeId}}</h1>
        <mu-flex class="flex-wrapper" justify-content="center" fill>
            <mu-flex justify-content="end" fill>
                <img src="../img/tree1.jpg" height="200px" width="200px"/>
            </mu-flex>

            <mu-list >
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
    import Tree from "../model/Tree";

    export default {
        name: "TreeDetails",

        data() {
            return {
                tree: Tree,
                infos: [
                    //here we have to leave the declaration of this array contains objects, we will modify
                    //this array later after we have passed the data locally during mounting.
                    {}
                ],
            }
        },
        components: {
            Header
        },
        /*
           Initialize the tree information.
        */
        created() {
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
            //here we reinitialize this array as a new empty array.
            console.log(this.tree);
            this.infos = [];
            this.infos.push({id:1, label:'Name:', value: this.tree.name});
            this.infos.push({id:2, label:'Health:', value: this.tree.health});
            this.infos.push({id:3, label:'Location:', value: this.tree.location});
            this.infos.push({id:4, label:'Updated at:', value: this.tree.upload_date});
            this.infos.push({id:5, label:'Sayings:', value: this.tree.sayings})
            this.infos.push({id:6, label:'Species:', value:this.tree.species});
            console.log(this.tree.treeId);
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
