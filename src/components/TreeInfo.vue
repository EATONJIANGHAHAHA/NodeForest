<template>
    <div>
        <mu-container>
            <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                <!--to bind a data to a component's property, use v-bind syntax instead of {{}}-->
                <mu-card-header v-bind:title="headerTitle" v-bind:sub-title="headerSubTitle">
                    <mu-avatar slot="avatar">
                        <img v-bind:src="headerImageSrc">
                    </mu-avatar>
                </mu-card-header>
                <mu-card-media v-bind:title="mediaTitle" v-bind:sub-title="mediaSubTitle" >
                    <img v-bind:src="mediaImageSrc">
                </mu-card-media>
                <mu-card-title v-bind:title="contentTitle" v-bind:sub-title="contentSubTitle"></mu-card-title>
                <mu-card-text>
                    {{contentText}}
                </mu-card-text>
                <mu-card-actions>
                    <mu-button flat>Action 1</mu-button>
                    <mu-button flat>Action 2</mu-button>
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
            'headerTitle',
            'headerSubTitle',
            'headerImageSrc',
            'mediaTitle',
            'mediaSubTitle',
            'mediaImageSrc',
            'contentTitle',
            'contentSubTitle',
            'contentText'
        ],
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>