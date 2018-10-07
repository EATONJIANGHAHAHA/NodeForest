<template>
    <mu-container class="expension-panel">
        <h1>New Staff</h1>
        <mu-form ref="form" :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
            <mu-form-item label="Username" :rules="usernameRules" prop="username">
                <mu-text-field type="text" v-model="form.username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Password" :rules="passwordRules" prop="password">
                <mu-text-field type="password" v-model="form.password"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Email" :rules="emailRules" prop="email">
                <mu-text-field type="email" v-model="form.email"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Phone" prop="phone" :rules="phoneRules">
                <mu-text-field type="number" v-model="form.phone" max-length="13"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Address" prop="address">
                <mu-text-field type="text" v-model="form.address"></mu-text-field>
            </mu-form-item>
        </mu-form>
        <mu-button round @click="check" color="secondary">Add</mu-button>
        <mu-dialog title="Notice" width="360" :open.sync="openDialog">
            {{dialogText}}
            <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
        </mu-dialog>
    </mu-container>
</template>

<script>
    import md5 from "js-md5";
    let path = require("../common.js");
    let reg_str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

    export default {
        name: "NewStaff",
        data() {
            return {
                // password:'',
                // repeatPassword:'',
                labelPosition: 'top',
                usernameRules: [
                    { validate: (val) => !!val, message: 'Username is required'},
                    { validate: (val) => val.length >= 3, message: 'Username should be longer than 3 characters'}
                ],
                passwordRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Password is required'
                    },
                    {
                        validate: (val) => val.length >= 3,
                        message: 'Password has to be longer than 3 characters'
                    }
                ],

                phoneRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Phone number is required.'
                    },
                    {
                        validate: (val) => val.length >= 7,
                        message: 'Phone number should be at least 7 numbers.'
                    },

                    {
                        validate: (val) => val.length < 14,
                        message: 'Phone number should not be longer than 13 numbers.'
                    }
                ],

                emailRules: [
                    {
                        validate: (val) => !!val,
                        message: 'Email is required'
                    },
                    {
                        validate: (val) => reg_str.test(val),
                        message: 'Please enter a valid email address'
                    }
                ],

                form: {
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    address: ''
                },
                openDialog: false,
                dialogText: 'Insert new staff failed.',
            }
        },
        created() {
        },
        methods: {
            check() {

                this.$refs.form.validate().then((result) => {
                    if (result) {
                        this.form.password = md5(md5(this.form.password) + this.form.username)
                        this.$http.post(path + ':3000/api/admin/staffs/add', {
                            username: this.form.username,
                            password: this.form.password,
                            email: this.form.email,
                            address: this.form.address,
                            phone: this.form.phone
                        }).then(response => {
                            if (response.data.code === "1") {
                                this.dialogText = 'Adding new staff failed.'
                                this.openDialog = true
                            } else {
                                this.dialogText = 'New staff added.'
                                this.openDialog = true;
                                console.log("Admin: new staff saved.");
                                this.$router.push('/admin/staffs');
                            }
                        }, response => {
                            this.dialogText = 'Adding new staff failed: system error.'
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