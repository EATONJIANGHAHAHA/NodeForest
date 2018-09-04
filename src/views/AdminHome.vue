<template>
    <mu-container class="expension-panel">
        <mu-expansion-panel v-for="staff in staffs" v-bind="staff">
            <div slot="header">{{staff.username}}</div>
            Email:     {{staff.email}}, Phone:     {{staff.phone}}, Address:     {{staff.address}}
            <mu-button slot="action" flat color="secondary">Modify</mu-button>
            <mu-button slot="action" flat color="secondary">Delete</mu-button>
        </mu-expansion-panel>
        <mu-flex justify-content="center">
            <mu-button style="margin-top: 10px" color="secondary">Add Staff</mu-button>
        </mu-flex>
    </mu-container>
</template>

<script>
    export default {
        name: "AdminHome",
        data() {
            return {
                staffs: [],
            }
        },
        created() {
            this.$http.get('http://127.0.0.1:3000/api/admin/get_all_staffs', {
            }).then(response => {
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++)
                    this.staffs.push(response.data[i]);
            }, response => {
                console.log('error');
            });
        }
    }
</script>

<style scoped>
    .expension-panel {
        padding: 20px 0
    }
</style>