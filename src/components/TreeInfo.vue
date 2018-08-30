<template>
    <div>
        <mu-container>
            <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                <!--to bind a data to a component's property, use v-bind syntax instead of {{}}-->
                <mu-card-header v-bind:title="location" >
                    <mu-avatar slot="avatar">
                        <img v-bind:src="location_image">
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media v-bind:title="species" >
                    <img v-bind:src="photo_src">
                </mu-card-media>
                <mu-card-title v-bind:title="species" ></mu-card-title>
                <mu-card-text>
                    {{sayings}}
                </mu-card-text>
                <mu-card-actions>
                    <mu-button flat v-bind:to="routePath">View</mu-button>
                    <mu-button flat v-bind:to="routePath">Edit</mu-button>
                </mu-card-actions>
            </mu-card>
        </mu-container>
    </div>
</template>

<script>
    export default {
        name: "TreeInfo",
        /**
         * props are used for components value passing.
         */
        props: [
            'treeId',
            'height',
            'location',
            'health',
            'location_image',
            'species',
            'photo_src',
            'sayings'
        ],
        data() {
            return {
                routePath: '/'
            }
        },
        mounted() {
            console.log(this.treeId);
            this.routePath = this.routePath + "tree-details/" + this.treeId;
        }
    }
</script>

<style scoped>

</style>