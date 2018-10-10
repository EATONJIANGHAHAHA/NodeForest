<!--Register user page.-->
<template>
    <div>
        <mu-container>
            <h1>Edit Account</h1>
            <h3>Username: {{this.form.staff.username}}</h3>
            <mu-form ref="form" :model="form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="staff.password" label="Password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="form.staff.password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="repeatPassword" label="Repeat" :rules="repeatPasswordRules" v-if="form.staff.password !== this.$store.state.staff.password">
                    <mu-text-field type="password" v-model="form.repeatPassword"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="staff.email" label="Email" :rules="emailRules">
                    <mu-text-field v-model="form.staff.email"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="staff.phone" label="Phone" :rules="phoneRules">
                    <mu-text-field type="number" v-model="form.staff.phone"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="staff.address" label="Address">
                    <mu-text-field v-model="form.staff.address"></mu-text-field>
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
    import Router from '../../router'
    import md5 from "js-md5";
    import Staff from "../../model/Staff";
    let path = require("../../common.js");

    export default {
        name: "Edit Account",
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
                        validate: (val) => val === this.form.staff.password,
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
                    staff: new Staff(),
                    repeatPassword: '',
                },
                isDialogOpen: false,
                dialogText: '',
                labelPosition: 'top',
            }
        },
        created(){
            this.form.staff.username = this.$store.state.staff.username;
            this.form.staff.id = this.$store.state.staff.id;
            this.form.staff.password = this.$store.state.staff.password;
            this.form.repeatPassword = this.$store.state.staff.password;
            this.form.staff.email = this.$store.state.staff.email;
            this.form.staff.address = this.$store.state.staff.address;
            this.form.staff.phone = this.$store.state.staff.phone;

        },
        components: {
        },
        methods: {

            submit() {

                this.$refs.form.validate().then((result) => {
                    if(result) {
                        if (this.form.staff.password !== this.$store.state.staff.password) {
                            this.form.staff.password = md5(md5(this.form.staff.password) + this.form.staff.username);
                            this.form.repeatPassword = this.form.staff.password
                        }
                        this.$http.put( path + ':3000/api/staff/update',
                            {
                                password: this.form.staff.password,
                                email: this.form.staff.email,
                                address: this.form.staff.address,
                                phone: this.form.staff.phone,
                                id: this.form.staff.id
                            }
                        ).then(response => {
                            console.log(response.data);
                            if(response.data.code === "1") {
                                this.openDialog('Changing information failed: system error');
                            }
                            else {
                                this.openDialog('Information saved.')
                                this.$store.dispatch("setStaff", this.form.staff);
                                Router.push('/staff/account');
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
