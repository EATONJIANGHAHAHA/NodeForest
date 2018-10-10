<template>
    <mu-container>
        <mu-carousel transition="fade" style="padding-top: 50px;">
            <mu-carousel-item v-for="photoPath in photoPaths">
                <img :src="photoPath">
            </mu-carousel-item>
        </mu-carousel>
    </mu-container>
</template>

<script>
    import path from '../common';

    export default {
        name: "HistoricalPhotos",
        data() {
            return {
                photoPaths: [],
            }
        },
        created() {
            this.$http.get(path + ':3000/api/tree/getPhotos/' + this.$route.params.treeId, {}).then(response => {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++)
                    this.photoPaths.push(path + ':3000/' + response.data[i].path);
            }, response => {
                console.log('error connection server with response: ' + response);
            });
            console.log(this.photoPaths);
        }
    }
</script>

<style scoped>

</style>