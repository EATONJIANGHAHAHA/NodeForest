<template>
    <div >
        <Header/>
        <h1>Tree No. {{treeNumber}}</h1>
        <mu-flex class="flex-wrapper" justify-content="center" fill>
            <mu-flex justify-content="end" fill>
                <img src="../../public/tree.jpg" height="200px" width="200px"/>
                <!--<p>Updated at: {{date}}th, {{month}}, {{year}}</p>-->
            </mu-flex>

            <mu-list nested-indent="true">
                <mu-list-item  v-for="item in infos" v-bind="item.id">
                    <mu-list-item-title>{{item.label}}</mu-list-item-title>
                    <mu-list-item-content>{{item.value}}</mu-list-item-content>
                </mu-list-item>
                <mu-button>Historical Photos</mu-button>
                <mu-button>Postcards</mu-button>
            </mu-list>
            <!--<div id="tree-info">-->
                <!--<p>Height: {{height}}cm</p><br/>-->
                <!--<p>Health: {{health}}</p><br/>-->
                <!--<p>Location: {{location}}</p><br/>-->
                <!--<input type="button" value="Historical photos"/> &lt;!&ndash;this should be a route instead&ndash;&gt;-->
                <!--<input type="button" value="Post cards"/>-->
                <!--<router-link to="/myaccount" id="myaccount">My account</router-link>-->
            <!--</div>-->
        </mu-flex>

        <div id="lower-section">
            <!--<button>Change Tree Name</button>
            <button>Request for a Leaf</button>
            <button>Request for a Postcard</button>-->
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header"

    export default {
        name: "Home",

        data(){
            return {
                treeNumber: 123456,
                date: 32,
                month: 'Jun',
                year: 2020,
                infos: [
                    {id: 1, label: 'Height: ', value:'100cm'},
                    {id: 2, label: 'Health: ', value:'Good'},
                    {id: 3, label: 'Location: ', value:'Africa'},
                    {id: 4, label: 'Updated: ', value: new Date()},
             ]
            }

        },


        components: {
            Header
        }
    }
</script>

<style scoped>
    .flex-wrapper {
        width: 100%;
        height: 56px;
        margin-top: 8px;
    }
    /* #tree-number {
         padding: 20px 20px 20px 100px;
         font-size: 50px;
     }

     #picture-section {
         float: left;
         margin: 0 auto;
     }

     #tree-info {
         float: right;
         margin: 0 auto;
     }

     #middle-section {
         text-align: center;
         align-items: center;
         margin: 50px;
         margin-left: 500px;
         margin-right: 500px;
     }
     #lower-section {

     }*/
</style>
