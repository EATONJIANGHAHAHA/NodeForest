import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import MyAccount from './views/MyAccount'
import Register from './views/Register'
import TreeManagement from './views/TreeManagement'
import TreeDetails from './views/TreeDetails'
import AdminHome from './views/AdminHome'
import StaffHome from './views/StaffHome'
import AdminAccount from './views/AdminAccount'
import StaffManagement from './views/StaffManagement'
import NewStaff from './views/NewStaff'
import EditStaff from './views/EditStaff'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Index,
        },
        {
            path: '/about',
            component: About,
        },
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/admin/home',
            component: AdminHome,
        },
        {
            path: '/staff_home',
            component: StaffHome,
        },
        {
            //dynamic routing passing location value into TreeDetails component.
            path: '/tree-details/:treeId',
            component: TreeDetails,
        },
        {
            path: '/myaccount',
            component: MyAccount,
        },
        {
            path: '/treemanagement',
            component: TreeManagement,
        },
        {
            path: '/admin/account',
            component: AdminAccount
        },
        {
            path: '/admin/staffs',
            component: StaffManagement
        },
        {
          path: '/admin/staffs/add',
          component: NewStaff
        },
        {
          path:'/admin/staffs/edit',
          component: EditStaff
        }
    ]
})
