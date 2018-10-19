import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import About from './views/About'
import Login from './views/Login'
import Register from './views/Register'
import TreeDetails from './views/TreeDetails'
import StaffManagement from './views/admin/StaffManagement'
import NewStaff from './views/admin/NewStaff'
import EditStaff from './views/admin/EditStaff'
import NewTreeApp from './views/user/NewTreeApp'
import PostcardApp from './views/user/PostcardApp'
import Postcards from './views/user/Postcards'
import StaffPostcards from './views/staff/Postcards'
import HistorialPhotos from './views/HistoricalPhotos'
import TreeEdit from './views/TreeEdit'
import Home from './views/Home'
import Account from './views/Account'
import Applications from './views/Applications'
import EditAccount from './views/EditAccount'
const Const = require('./common');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: Const.root,
            component: Index,
        },
        {
            path: Const.about,
            component: About,
        },
        {
            path: Const.user + Const.home,
            component: Home,
        },
        {
            path: Const.user + Const.account,
            component: Account
        },
        {
            path: Const.user + Const.applications,
            component: Applications
        },
        {
            path: Const.user + Const.account + Const.edit,
            component: EditAccount
        },
        {
            path: Const.applications + Const.add,
            component: NewTreeApp
        },
        {
            path: Const.user + Const.postcards,
            component: Postcards
        },
        {
            path: Const.postcards + Const.add + Const.dTreeId,
            component: PostcardApp
        },
        {
            path: Const.login,
            component: Login,
        },
        {
            path: Const.register,
            component: Register,
        },
        {
            path: Const.staff + Const.home,
            component: Home,
        },
        {
            path: Const.staff + Const.applications,
            component: Applications
        },
        {
            path: Const.staff + Const.postcards,
            component: StaffPostcards
        },
        {
            path: Const.staff + Const.account,
            component: Account
        },
        {
            path: Const.staff + Const.account + Const.edit,
            component: EditAccount
        },
        {
            path: Const.trees + Const.detail + Const.dTreeId,
            component: TreeDetails,
        },
        {
            path: Const.trees + Const.photos + Const.dTreeId,
            component: HistorialPhotos,
        },
        {
            path: Const.trees + Const.edit + Const.dTreeId,
            component: TreeEdit
        },
        {
            path: Const.admin + Const.home,
            component: Home,
        },
        {
            path: Const.admin + Const.account,
            component: Account
        },
        {
            path: Const.admin + Const.staffs,
            component: StaffManagement
        },
        {
            path: Const.admin + Const.staffs + Const.add,
            component: NewStaff
        },
        {
            path: Const.admin + Const.staffs + Const.edit,
            component: EditStaff
        }
    ]
})
