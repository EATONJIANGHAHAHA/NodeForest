<template>
    <mu-container class="expension-panel" v-if="$store.state.admin.id">
        <h1>Edit Account: {{this.$store.state.admin.username}}</h1>
        <mu-form ref="form" :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
            <mu-form-item label="NewPassword" :rules="passwordRules" prop="password">
                <mu-text-field type="password" v-model="form.password"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Repeat" :rules="repeatPasswordRules" prop="repeatPassword">
                <mu-text-field type="password" v-model="form.repeatPassword"></mu-text-field>
            </mu-form-item>
        </mu-form>
        <mu-button round @click="check" color="secondary">Save</mu-button>
        <mu-dialog title="Notice" width="360" :open.sync="openDialog">
            {{dialogText}}
            <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
        </mu-dialog>
    </mu-container>
    <mu-container v-else-if="$store.state.staff.id || $store.state.user.id">
        <mu-paper :z-depth="1" class="demo-list-wrap" width="100%" style="margin: 20px">
            <mu-appbar color="secondary">
                My Account
            </mu-appbar>
            <mu-list style="margin: 20px" textline="two-line" class="main" nested-indent="true"
                     toggle-nested-type="popover">
                <mu-list-item v-for="item in infos" v-bind="item">
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.label}}</mu-list-item-title>
                        <mu-list-item-sub-title>{{item.value}}</mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-button color="primary" @click="editClicked()"><mu-icon value="edit" left></mu-icon>Edit</mu-button>
            </mu-list>
        </mu-paper>
    </mu-container>
</template>

<script>
    import md5 from "js-md5";
    var path = require("../common.js");
    import Staff from "../model/Staff";
    import User from "../model/User";

    export default {
        name: "Account",
        data() {
            return {
                labelPosition: 'top',
                passwordRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Password is required'
                    },
                    {
                        validate: (val) => val.length >= 3,
                        message: 'Password name has to be longer than 3 characters'
                    }
                ],
                repeatPasswordRules: [
                    {
                        validate: (val) => val === this.form.password,
                        message: 'Repeat password should be the same.'
                    }
                ],
                form: {
                    password: '',
                    repeatPassword: '',
                },
                openDialog: false,
                dialogText: 'Update password failed.',
                staff: new Staff(),
                user: new User(),
                infos: [],
            }
        },
        created() {
            if (this.$store.state.user.id) {
                this.infos.push({id: 1, label: 'Username:', value: this.$store.state.user.username});
                this.infos.push({id: 2, label: 'Password:', value: '***********'});
                this.infos.push({id: 3, label: 'Email:', value: this.$store.state.user.email});
                this.infos.push({id: 4, label: 'Address:', value: this.$store.state.user.address});
                this.infos.push({id: 5, label: 'Balance:', value: this.$store.state.user.balance});
                this.infos.push({id: 6, label: 'Phone:', value: this.$store.state.user.phone});
            } else if (this.$store.state.staff.id) {
                this.infos.push({id: 1, label: 'Username:', value: this.$store.state.staff.username});
                this.infos.push({id: 2, label: 'Password:', value: '***********'});
                this.infos.push({id: 3, label: 'Email:', value: this.$store.state.staff.email});
                this.infos.push({id: 4, label: 'Address:', value: this.$store.state.staff.address});
                this.infos.push({id: 6, label: 'Phone:', value: this.$store.state.staff.phone});
            }
        },
        methods: {
            /*
            this method will check what type of user is logged in and and behave certain behaviour.
            */
            editClicked() {
                if (this.$store.state.staff.id) {
                    this.$router.push('/staff/account/edit')
                } else {
                    this.$router.push('/user/account/edit')
                }
            },

            /*

            */
            check() {
                this.$refs.form.validate().then((result) => {
                    if (result) {
                        this.form.password = md5(md5(this.form.password) + this.$store.state.admin.username);
                        this.form.repeatPassword = this.form.password;
                        this.$http.post(path + ':3000/api/admin/update', {
                            password: this.form.password,
                            id: this.$store.state.admin.id
                        }).then(response => {
                            if (response.data.code === "1") {
                                this.dialogText = 'Update password failed.';
                                this.openDialog = true;
                            } else {
                                this.dialogText = 'New password is saved.';
                                this.openDialog = true;
                                console.log("Admin: new password saved.");
                            }
                        }, response => {
                            this.dialogText = 'Update password failed: system error.';
                            this.openDialog = true;
                        })
                    }
                    else {
                        this.dialogText = 'Please correct your input.';
                        this.openDialog = true;
                    }
                })
            },

            /*
            this method will close the dialog.
            */
            closeDialog() {
                this.clear();
                this.openDialog = false;
            },

            /*
               Called when the update password operation finished.
            */
            clear() {
                this.$refs.form.clear();
                this.form.password = '';
                this.form.repeatPassword = '';
            },
        }
    }
</script>

<style scoped>
</style>