<template>
    <mu-drawer :open.sync="$store.state.openDrawer" :docked="docked" :right="position === 'right'" :z-depth="2">
        <mu-appbar color="secondary">
            Menu
        </mu-appbar>
        <mu-list>
            <mu-list-item button v-if="this.$store.state.admin.id || this.$store.state.user.id || this.$store.state.staff.id" @click="home()">
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
            <mu-list-item button v-if="this.$store.state.user.id || this.$store.state.staff.id" @click="postcards">
                <mu-icon value="card_giftcard"></mu-icon>
                <mu-list-item-title>Postcards</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="account">
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
    const Const = require('../common');

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
            home() {
                if(this.$store.state.user.id) this.$router.push(Const.user + Const.home);
                if(this.$store.state.staff.id) this.$router.push(Const.staff + Const.home);
                if(this.$store.state.admin.id) this.$router.push(Const.admin + Const.home);
                this.closeDrawer();
            },
            trees(){
              if(this.$store.state.user.id) this.$router.push(Const.user + Const.applications);
              if(this.$store.state.staff.id) this.$router.push(Const.staff + Const.applications);
              this.closeDrawer()
            },
            postcards(){
                if(this.$store.state.user.id) this.$router.push(Const.user + Const.postcards);
                if(this.$store.state.staff.id) this.$router.push(Const.staff + Const.postcards);
                this.closeDrawer()
            },
            account(){
                if(this.$store.state.user.id) this.$router.push(Const.user + Const.account,);
                if(this.$store.state.staff.id) this.$router.push(Const.staff + Const.account);
                if(this.$store.state.admin.id) this.$router.push(Const.admin + Const.account);
                this.closeDrawer()
            },
            closeDrawer() {
                this.$store.dispatch(Const.store.setDrawerClose);
            }
        }
    }
</script>

<style scoped>

</style>