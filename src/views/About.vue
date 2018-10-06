<template>
    <div>
        <mu-container>
            <mu-flex justify-content="center">
                <p>There will be more information available soon.</p>
                <input style="display: none" type="file" @change="onFileChanged" ref="fileInput"/>
                <mu-button @click="$refs.fileInput.click()">Select File:</mu-button>
                <mu-text-field v-if="selectedFile" v-model="selectedFile.name"/>
                <mu-button @click="onSubmitClicked" :disabled="shouldDisable">Upload</mu-button>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
    const path = require("../common");

    export default {
        name: "About",
        data() {
            return {
                selectedFile: null,
                shouldDisable: true,
                treeId: 1
            }
        },
        components: {

        },
        methods: {
            onFileChanged() {
                this.selectedFile = event.target.files[0];
                this.shouldDisable = false;
            },
            onSubmitClicked() {
                const fd = new FormData();
                fd.append('treeImage', this.selectedFile);
                fd.append('treeId', 1);
                this.$http.post(path + ":3000/api/tree/uploadPhoto", fd)
                    .then(response => {
                    console.log(response.data);
                }, response => {
                    console.log("upload failed.");
                })
            }
        }
    }
</script>

<style scoped>

</style>
