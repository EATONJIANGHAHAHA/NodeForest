<template>
    <mu-drawer :open.sync="$store.state.openDrawer" :docked="docked" :right="position === 'right'" :z-depth="2">
        <mu-appbar color="secondary">
            <!--<mu-button icon slot="left">
                <mu-icon value="menu"></mu-icon>
            </mu-button>-->
            Menu
        </mu-appbar>
        <mu-list>
            <mu-list-item button v-if="this.$store.state.admin.id || this.$store.state.user.id || this.$store.state.staff.id" @click="toTheirHome()">
                <mu-icon value="home"/>
                <mu-list-item-title>Home</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/staffs" @click="closeDrawer">
                <mu-list-item-title>Manage Staff</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.admin.id" to="/admin/account" @click="closeDrawer">
                <mu-list-item-title>Account</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-if="this.$store.state.user.id || this.$store.state.staff.id" @click="trees()">
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
            toTheirHome() {
                console.log(this.$store.state.admin.id);
                console.log(this.$store.state.staff.id);
                if(this.$store.state.user.id) this.$router.push('/user/home');
                if(this.$store.state.staff.id) this.$router.push('/staff/home');
                if(this.$store.state.admin.id) this.$router.push('/admin/home');
                this.closeDrawer();
            },
            trees(){
              if(this.$store.state.user.id) this.$router.push('/applications');
              if(this.$store.state.staff.id) this.$router.push('/staff/applications');
              this.closeDrawer()
            },
            closeDrawer() {
                this.$store.dispatch('setDrawerClose');
            }
        }
    }
</script>

<style scoped>

</style>