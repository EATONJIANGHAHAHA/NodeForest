<template>
    <mu-drawer :open.sync="$store.state.openDrawer" :docked="docked" :right="position === 'right'" :z-depth="1">
        <mu-list>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/home" @click="closeDrawer">
                <mu-list-item-title>Home</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/manageStaff" @click="closeDrawer">
                <mu-list-item-title>Manage Staff</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/account" @click="closeDrawer">
                <mu-list-item-title>Account</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id">
                <mu-list-item-title>Trees</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id">
                <mu-list-item-title>Profile</mu-list-item-title>
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