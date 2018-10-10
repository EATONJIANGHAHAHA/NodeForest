<template>
    <mu-container>
        <mu-paper :z-depth="1" class="demo-list-wrap" width="100%" style="margin: 20px">
            <mu-appbar color="secondary">
                My Account
            </mu-appbar>
            <mu-list style="margin: 20px" textline="two-line" class="main" :nested-indent="true"
                     toggle-nested-type="popover">
                <mu-list-item v-for="item in infos" v-bind="item">
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.label}}</mu-list-item-title>
                        <mu-list-item-sub-title>{{item.value}}</mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-button full-width color="primary" to="/account/edit"><mu-icon value="edit" left></mu-icon>Edit</mu-button>
            </mu-list>
        </mu-paper>
    </mu-container>

</template>

<script>
    import User from "../../model/User";

    export default {
        name: "MyAccount",
        components: {},
        data() {
            return {
                user: new User(),
                infos: []
            }
        },
        created() {

            this.infos.push({id: 1, label: 'Username:', value: this.$store.state.user.username});
            this.infos.push({id: 2, label: 'Password:', value: '***********'});
            this.infos.push({id: 3, label: 'Email:', value: this.$store.state.user.email});
            this.infos.push({id: 4, label: 'Address:', value: this.$store.state.user.address});
            this.infos.push({id: 5, label: 'Balance:', value: this.$store.state.user.balance});
            this.infos.push({id: 6, label: 'Phone:', value: this.$store.state.user.phone});
        }
    }
</script>

<style scoped>

</style>
