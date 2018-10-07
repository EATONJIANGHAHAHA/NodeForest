<template>
    <mu-container class="expension-panel">
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
</template>

<script>
    import md5 from "js-md5";
    var path = require("../common.js");

    export default {
        name: "AdminAccount",
        data() {
            return {
                // password:'',
                // repeatPassword:'',
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
            }
        },
        created() {
        },
        methods: {
            check() {

                this.$refs.form.validate().then((result) => {
                    if (result) {
                        this.form.password = md5(md5(this.form.password) + this.$store.state.admin.username)
                        this.form.repeatPassword = this.form.password
                        this.$http.post(path + ':3000/api/admin/update', {
                            password: this.form.password,
                            id: this.$store.state.admin.id
                        }).then(response => {
                            if (response.data.code === "1") {
                                this.dialogText = 'Update password failed.'
                                this.openDialog = true
                            } else {
                                this.dialogText = 'New password is saved.'
                                this.openDialog = true;
                                console.log("Admin: new password saved.");
                            }
                        }, response => {
                            this.dialogText = 'Update password failed: system error.'
                            this.openDialog = true
                        })

                    }
                    else {
                        this.dialogText = 'Please correct your input.'
                        this.openDialog = true
                    }
                })
            },

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
    .expension-panel {
        padding: 20px 0
    }
</style>