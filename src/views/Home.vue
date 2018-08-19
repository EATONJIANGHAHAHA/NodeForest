<template>
    <div>
        <Header/>
        <div id="tree-number">
            <p>Tree No. {{treeNumber}}</p>
        </div>
        <div id="middle-section">
            <div id="picture-section">
                <img src="../../public/tree.jpg" height="200px" width="200px"/>
                <p>Updated at: {{date}}th, {{month}}, {{year}}</p>
            </div>
            <div id="tree-info">
                <p>Height: {{height}}cm</p><br/>
                <p>Health: {{health}}</p><br/>
                <p>Location: {{location}}</p><br/>
                <p>view history photos</p> <!--this should be a route instead-->
            </div>
        </div>

        <div id="lower-section">
            <!--<button>Change Tree Name</button>
            <button>Request for a Leaf</button>
            <button>Request for a Postcard</button>-->
        </div>
    </div>
</template>

<script>
    import Header from "../views/Header"

    export default {
        name: "Home",

        data() {
            return {
                treeNumber: 123456,
                date: 32,
                month: 'Jun',
                year: 2020
            }
        },

        components: {
            Header
        }
    }
</script>

<style scoped>
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
