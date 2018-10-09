import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import About from './views/About'
import Home from './views/user/Home'
import Login from './views/Login'
import Register from './views/Register'
import TreeManagement from './views/staff/TreeManagement'
import TreeDetails from './views/TreeDetails'
import AdminHome from './views/admin/Home'
import StaffHome from './views/staff/Home'
import AdminAccount from './views/admin/Account'
import StaffManagement from './views/admin/StaffManagement'
import NewStaff from './views/admin/NewStaff'
import EditStaff from './views/admin/EditStaff'
import MyAccount from './views/user/Account'
import EditAccount from './views/user/EditAccount'
import NewTreeApp from './views/user/NewTreeApp'

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
            path: '/account',
            component: MyAccount
        },
        {
            path: '/account/edit',
            component: EditAccount
        },
        {
            path: '/trees/application',
            component: NewTreeApp
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
            path: '/staff/home',
            component: StaffHome,
        },
        {
            //dynamic routing passing location value into TreeDetails component.
            path: '/tree-details/:treeId',
            component: TreeDetails,
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
