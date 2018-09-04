<template>
    <mu-drawer :open.sync="$store.state.openDrawer" :docked="docked" :right="position === 'right'" :z-depth="1">
        <mu-list>
            <mu-list-item button>
                <mu-list-item-title>Menu Item 1</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>Menu Item 2</mu-list-item-title>
            </mu-list-item>
            <mu-list-item  @click="closeDrawer" button>
                <mu-list-item-title>Close</mu-list-item-title>
            </mu-list-item>
        </mu-list>
    </mu-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        data() {
            return {
                docked: false,
                open: false,
                position: 'left',
            }
        },
        methods: {
            closeDrawer() {
                this.$store.dispatch('setDrawerClose');
            }
        }
    }
</script>

<style scoped>

</style>