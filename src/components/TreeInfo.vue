<!--A component that mainly used for displaying information of the tree.-->
<template>
    <div>

        <mu-container>
            <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                <!--to bind a data to a component's property, use v-bind syntax instead of {{}}-->
                <mu-card-header :title="location" >
                    <mu-avatar slot="avatar">
                        <img v-lazy='this.location_img_src'>
                        <!--<progressive-img src="https://unsplash.it/1920/1080?image=10" />-->
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media :title="species" >
                    <img v-lazy='this.tree_img_src'>
                </mu-card-media>
                <mu-card-title :title="name" ></mu-card-title>
                <mu-card-text>
                    {{sayings}}
                </mu-card-text>
                <mu-card-actions>
                    <mu-button flat :to="routePath">View</mu-button>
                    <mu-button flat :to="treeEditRoutePath">Edit</mu-button>
                </mu-card-actions>
            </mu-card>
        </mu-container>
    </div>
</template>

<script>
    const Const = require('../common');

    export default {
        name: "TreeInfo",
        /*
         * props are used for components value passing.
         */
        props: [
            'treeId',
            'height',
            'location',
            'health',
            'location_src',
            'species',
            'photo_src',
            'sayings',
            'name'
        ],
        data() {
            return {
                treeEditRoutePath: '/',
                routePath: '/',
                location_img_src: '',
                tree_img_src:''
            }
        },
        created() {
            this.location_img_src = Const.path + ':3000/' + this.location_src;
            this.tree_img_src = Const.path + ':3000/' + this.photo_src;
            this.routePath = Const.trees + Const.detail + Const.root + this.treeId;
            this.treeEditRoutePath = Const.trees + Const.edit + Const.root + this.treeId;
        }
    }
</script>

<style scoped>
    img[lazy=loaded] {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
</style>