<template>
    <mu-container class="expension-panel">
        <h1>Staff List</h1>
        <mu-expansion-panel v-for="staff in staffs" v-bind="staff">
            <div slot="header">{{staff.username}}</div>
            Email: {{staff.email}}, Phone: {{staff.phone}}, Address: {{staff.address}}
            <mu-button slot="action" flat color="secondary" @click="modifyStaff(staff.id)">Modify</mu-button>
            <mu-button slot="action" flat color="secondary" @click="deleteStaff(staff.id)">Delete</mu-button>
        </mu-expansion-panel>
        <mu-flex justify-content="center">
            <mu-button style="margin-top: 10px" color="secondary" to="/admin/staffs/add">Add Staff</mu-button>
        </mu-flex>
        <mu-dialog title="Notice" width="360" :open.sync="openDialog">
            {{dialogText}}
            <mu-button slot="actions" flat color="primary" @click="closeDialog">Close</mu-button>
        </mu-dialog>
    </mu-container>
</template>

<script>
    let Const = require("../../common.js")
    export default {
        name: "StaffManagement",
        data() {
            return {
                staffs: [],
                openDialog: false,
                dialogText: 'Insert new staff failed.',
            }
        },
        created() {
            this.getStaffs();
        },

        methods: {

            getStaffs(){
                console.log("Admin: manageStaff");
                this.$http.get(Const.path + ':3000/api/admin/staffs', {}).then(response => {
                    console.log(response.data);
                    this.staffs = [];
                    for (let i = 0; i < response.data.length; i++)
                        this.staffs.push(response.data[i])
                }, response => {
                    console.log('error')
                })
            },

            modifyStaff(staffId) {
                this.$router.push({
                    path: '/admin/staffs/edit',
                    query: {
                        staffId: staffId
                    }
                })
            },

            deleteStaff(staffId) {
                console.log(staffId);
                this.$http.get(Const.path + ':3000/api/staff/hasTrees?staffId=' + staffId)
                    .then(response => {
                        if (response.data[0].number !== 0) {
                            this.dialogText = "Cannot delete: the staff has work to do!";
                            this.openDialog = true;
                        }
                        else {
                            this.$http.get(Const.path + ':3000/api/staff/hasUnsolvedApps?staffId=' + staffId)
                                .then(response => {
                                    if (response.data[0].number !== 0) {
                                        this.dialogText = "Cannot delete: the staff has work to do!";
                                        this.openDialog = true;
                                    }
                                    else {

                                        this.$http.post(Const.path + ':3000/api/admin/staffs/delete', {
                                            staffId: staffId
                                        }).then(response => {
                                            if (response.data.code === "1") {
                                                this.dialogText = 'Deleting staff failed.';
                                                this.openDialog = true
                                            } else {
                                                this.dialogText = 'Staff deleted';
                                                this.openDialog = true;
                                                console.log("Admin: staff " + staffId + " deleted.");
                                                this.$router.push('/admin/staffs');
                                                this.getStaffs();
                                            }
                                        }, response => {
                                            this.dialogText = 'Deleting staff failed: system error.';
                                            this.openDialog = true
                                        })

                                    }
                                });
                        }
                    });

            },
            closeDialog() {
                this.openDialog = false;
            },

        }
    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
</style>