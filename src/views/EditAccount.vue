<template>
    <div>
        <mu-container>
            <h1>Edit Account</h1>
            <h3>Username: {{this.form.user.username}}</h3>
            <mu-form ref="form" :model="form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="user.password" label="Password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="form.user.password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="repeatPassword" label="Repeat" :rules="repeatPasswordRules" v-if="form.user.password !== this.$store.state.user.password">
                    <mu-text-field type="password" v-model="form.repeatPassword"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.email" label="Email" :rules="emailRules">
                    <mu-text-field v-model="form.user.email"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.phone" label="Phone" :rules="phoneRules">
                    <mu-text-field type="number" v-model="form.user.phone"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="user.address" label="Address">
                    <mu-text-field v-model="form.user.address"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button @click="submit" round color="secondary">Save</mu-button>
            <mu-dialog title="Warning!" width="360" :open.sync="isDialogOpen">
                {{dialogText}}
                <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
            </mu-dialog>
        </mu-container>
    </div>
</template>

<script>
    import Router from '../router'
    import md5 from "js-md5";
    let Const = require("../common.js");

    export default {
        name: "EditAccount",
        data() {
            return {
                reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
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

                repeatPasswordRules: [
                    {
                        validate: (val) => val === this.form.user.password,
                        message: 'Repeat password should be the same.'
                    },
                ],
                emailRules: [
                    {
                        validate: (val) => this.reg.test(val),
                        message: 'Please check your email format.'
                    }
                ],
                form: {
                    user: {},
                    repeatPassword: '',
                },
                isDialogOpen: false,
                dialogText: '',
                labelPosition: 'top',
            }
        },
        created(){
            if (this.$store.state.user.id) {
                this.form.user.username = this.$store.state.user.username;
                this.form.user.id = this.$store.state.user.id;
                this.form.user.password = this.$store.state.user.password;
                this.form.repeatPassword = this.$store.state.user.password;
                this.form.user.email = this.$store.state.user.email;
                this.form.user.address = this.$store.state.user.address;
                this.form.user.phone = this.$store.state.user.phone;
            }
            else if (this.$store.state.staff.id) {
                this.form.user.username = this.$store.state.staff.username;
                this.form.user.id = this.$store.state.staff.id;
                this.form.user.password = this.$store.state.staff.password;
                this.form.repeatPassword = this.$store.state.staff.password;
                this.form.user.email = this.$store.state.staff.email;
                this.form.user.address = this.$store.state.staff.address;
                this.form.user.phone = this.$store.state.staff.phone;
            }
        },
        methods: {
            submit() {
                this.$refs.form.validate().then((result) => {
                    if(result) {
                        if (this.form.user.password !== this.$store.state.user.password) {
                            this.form.user.password = md5(md5(this.form.user.password) + this.form.user.username);
                            this.form.repeatPassword = this.form.user.password
                        }
                        this.$http.post( Const + ':3000/api/user/update',
                            {
                                password: this.form.user.password,
                                email: this.form.user.email,
                                address: this.form.user.address,
                                phone: this.form.user.phone,
                                id: this.form.user.id
                            }
                        ).then(response => {
                            console.log(response.data);
                            if(response.data.code === "1") {
                                this.openDialog('Changing information failed: system error');
                            }
                            else {
                                this.openDialog('Information saved.')
                                this.$store.dispatch("setUser", this.form.user);
                                Router.push('/account');
                            }
                        }, response => {
                            console.log(response.data);
                            this.openDialog("Changing information failed: system error");
                        })
                    }
                    else {
                        this.openDialog("Please check your input");
                    }
                });
            },

            openDialog(text) {
                this.dialogText = text;
                this.isDialogOpen = true;
            },

            closeDialog() {
                this.isDialogOpen = false;
            },
        }
    }
</script>

<style scoped>

</style>