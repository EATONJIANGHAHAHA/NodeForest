import Vue from 'vue'
import Vuex from 'vuex'
import User from "./model/User";
import Admin from "./model/Admin";
import Staff from "./model/Staff";

Vue.use(Vuex);

export default new Vuex.Store({
    //defines application-wise variable.
    state: {
        user: new User,
        admin: new Admin,
        staff: new Staff,
        trees: [],
        openDrawer: false,
    },
    /*
    this function are used for changing states. All states must changed using commit only
    so that the real time refreshments for all components shale work.
     */
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setTrees(state, trees) {
            state.trees = trees;
        },
        setAdmin(state, admin) {
            state.admin = admin;
        },
        setStaff(state, staff) {
            state.staff = staff;
        },
        setDrawerOpen(state) {
            state.openDrawer = true;
        },
        setDrawerClose(state) {
            state.openDrawer = false;
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getTrees(state) {
            return state.trees;
        },
        getTreebyId:(state) => (treeId) => {
            console.log("treeId: ");
            console.log(treeId);
            return state.trees.find(tree => tree.treeId === Number(treeId));
        }
    },
    //async tasks.
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
            console.log('user in the store');
            console.log(context.state.user);
        },
        setAdmin(context, admin) {
            context.commit('setAdmin', admin);
            console.log('admin in the store');
            console.log(context.state.admin);
        },
        setStaff(context, staff) {
            context.commit('setStaff', staff);
            console.log('staff in the store');
            console.log(context.state.staff);
        },
        setTrees(context, trees) {
            context.commit('setTrees', trees);
            console.log('trees in the store: ');
            console.log(context.state.trees);
        },
        setDrawerOpen(context) {
            context.commit('setDrawerOpen');
        },
        setDrawerClose(context) {
            context.commit('setDrawerClose');
        }
    }
})
