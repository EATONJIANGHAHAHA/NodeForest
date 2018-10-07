<template>
    <mu-container class="expension-panel">
        <h1>Staff List</h1>
        <mu-expansion-panel v-for="staff in staffs" v-bind="staff">
            <div slot="header">{{staff.username}}</div>
            Email:     {{staff.email}}, Phone:     {{staff.phone}}, Address:     {{staff.address}}
            <mu-button slot="action" flat color="secondary" @click="modifyStaff(staff.id)">Modify</mu-button>
            <mu-button slot="action" flat color="secondary" @click="deleteStaff(staff.id)">Delete</mu-button>
        </mu-expansion-panel>
        <mu-flex justify-content="center">
            <mu-button style="margin-top: 10px" color="secondary" to="/admin/staffs/add">Add Staff</mu-button>
        </mu-flex>
    </mu-container>
</template>

<script>
    let path = require("../common.js");
    export default {
        name: "StaffManagement",
        data() {
            return {
                staffs: [],
            }
        },
        created() {
            console.log("Admin: manageStaff");
            this.$http.get( path + ':3000/api/admin/staffs', {
            }).then(response => {
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++)
                    this.staffs.push(response.data[i]);
            }, response => {
                console.log('error');
            });
        },

        methods: {
            deleteStaff(e){
                console.log(e);
            },
            modifyStaff(staffId){
                this.$router.push({
                    path: '/admin/staffs/edit',
                    // name: 'EditStaff',
                    query: {
                        staffId: staffId
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
</style>