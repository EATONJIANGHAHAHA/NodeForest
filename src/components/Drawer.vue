<template>
    <mu-drawer :open.sync="$store.state.openDrawer" :docked="docked" :right="position === 'right'" :z-depth="2">
        <mu-appbar color="secondary">
            <mu-button icon slot="left">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            Menu
        </mu-appbar>
        <mu-list>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/staffs" @click="closeDrawer">
                <mu-list-item-title>Manage Staff</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/account" @click="closeDrawer">
                <mu-list-item-title>Account</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id">
                <mu-icon value="filter_hdr" left></mu-icon>
                <mu-list-item-title>Trees</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id" to="/trees/applications" @click="closeDrawer">
                <mu-icon value="file_copy"></mu-icon>
                <mu-list-item-title>Applications</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id" to="/account" @click="closeDrawer">
                <mu-icon value="person_outline"></mu-icon>
                <mu-list-item-title>Profile</mu-list-item-title>
            </mu-list-item>
            <mu-list-item  @click="closeDrawer" button>
                <mu-icon value="close"></mu-icon>
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