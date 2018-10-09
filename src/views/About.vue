<template>
    <div>
        <mu-container>
            <mu-flex justify-content="center">
                <p>There will be more information available soon.</p>
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
