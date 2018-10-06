<template>
    <mu-container class="expension-panel">
        <h1>{{this.$store.state.admin.username}}</h1>
        <mu-form ref="form" :model="form" class="mu-login-form" :label-position="labelPosition" label-width="100">
            <mu-form-item label="password" :rules="passwordRules">
                <mu-text-field v-model="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Password" :rules="repeatPasswordRules">
                <mu-text-field type="password" v-model="repeatPassword"></mu-text-field>
            </mu-form-item>
        </mu-form>
        <mu-button round @click="check" color="secondary">Save</mu-button>
    </mu-container>
</template>

<script>
    export default {
        name: "AdminAccount",
        data() {
            return {
                password:'',
                repeatPassword:'',
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
                repeatPasswordRules:[
                    {
                        validate: (val) => val===password,
                        message: 'Repeat password should be the same.'
                    }
                ],
                form:{
                    password,
                    repeatPassword,

                }
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
</style>