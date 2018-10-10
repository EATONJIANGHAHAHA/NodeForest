<!--Detail page of the tree-->
<!--Can be used both by the user and staff-->
<template>
    <div style="padding-left: 200px; padding-right: 200px">
        <h1>Tree No. {{tree.treeId}}</h1>
        <mu-flex class="flex-wrapper" justify-content="center" fill>
            <mu-flex justify-content="end" fill>
                <img v-lazy="this.treeImageSrc" height="200px" width="200px"/>
            </mu-flex>
            <mu-list>
                <mu-list-item v-for="item in infos" v-bind="item">
                    <mu-list-item-title>{{item.label}}</mu-list-item-title>
                    <mu-list-item-content>{{item.value}}</mu-list-item-content>
                </mu-list-item>
                <mu-flex>
                    <mu-button v-if="this.$store.state.user.id || this.$store.state.staff.id" :to="this.photosRoutePath">
                        <mu-icon value="photo_album"></mu-icon>
                        Historical Photos
                    </mu-button>
                    <mu-button :to= routePath v-if="this.$store.state.user.id">
                        <mu-icon value="card_giftcard"></mu-icon>
                        Postcard
                    </mu-button>
                    <input style="display: none" type="file" @change="onFileChanged" ref="fileInput"/>
                    <mu-button v-if="this.$store.state.staff.id" @click="$refs.fileInput.click()">
                        <mu-icon value="folder"></mu-icon>
                        Select File
                    </mu-button>
                    <mu-text-field v-if="selectedFile" v-model="selectedFile.name" disabled=""/>
                    <mu-button v-if="this.$store.state.staff.id" @click="onSubmitClicked" :disabled="shouldDisable">
                        <mu-icon value="cloud_upload"></mu-icon>
                        Upload
                    </mu-button>
                </mu-flex>
            </mu-list>
        </mu-flex>
    </div>
</template>

<script>
    import Tree from "../model/Tree";
    import 'muse-ui-loading/dist/muse-ui-loading.css';

    const path = require("../common");
    export default {
        name: "TreeDetails",
        data() {
            return {
                photosRoutePath: '',
                tree: Tree,
                selectedFile: null,
                shouldDisable: true,
                routePath:'/postcards/add/',
                treeImageSrc:'',
                infos: [
                    //here we have to leave the declaration of this array contains objects, we will modify
                    //this array later after we have passed the data locally during mounting.
                    {}
                ],
            }
        },
        components: {},
        /*
           Initialize the tree information.
        */
        created() {
            this.tree = this.$store.getters.getTreebyId(this.$route.params.treeId);
            //here we reinitialize this array as a new empty array.
            this.infos = [];
            this.infos.push({id: 1, label: 'Name:', value: this.tree.name});
            this.infos.push({id: 2, label: 'Health:', value: this.tree.health});
            this.infos.push({id: 3, label: 'Location:', value: this.tree.location});
            this.infos.push({id: 4, label: 'Updated at:', value: this.tree.upload_date});
            this.infos.push({id: 5, label: 'Sayings:', value: this.tree.sayings});
            this.infos.push({id: 6, label: 'Species:', value: this.tree.species});
            this.treeImageSrc = path + ':3000/' + this.tree.photo_src;
            this.photosRoutePath = '/trees/photos/' + this.tree.treeId;
        },
        mounted() {
            this.routePath += this.tree.treeId;
        },
        methods: {
            onFileChanged() {
                this.selectedFile = event.target.files[0];
                this.shouldDisable = false;
            },
            onSubmitClicked() {
                const loading = this.$loading({
                    //options
                });
                const fd = new FormData();
                fd.append('treeImage', this.selectedFile);
                fd.append('treeId', this.tree.treeId);
                this.$http.post(path + ":3000/api/tree/uploadPhoto", fd)
                    .then(response => {
                        console.log(response.data);
                        setTimeout(() => {
                            loading.close();
                        },1000)
                    }, response => {
                        console.log("upload failed.");
                        setTimeout(() => {
                            loading.close();
                        },1000)
                    });
                this.selectedFile = 'undefined';
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
