import Vue from 'vue'
import Vuex from 'vuex'
import User from "./model/User";
import Admin from "./model/Admin";
import Staff from "./model/Staff";

Vue.use(Vuex);

function storeLocalStore (state) {
    window.localStorage.setItem("userMsg",JSON.stringify(state));
}
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
            storeLocalStore(state);
        },
        setTrees(state, trees) {
            state.trees = trees;
            storeLocalStore(state);
        },
        setAdmin(state, admin) {
            state.admin = admin;
            storeLocalStore(state);
        },
        setStaff(state, staff) {
            state.staff = staff;
            storeLocalStore(state);
        },
        setDrawerOpen(state) {
            state.openDrawer = true;
            storeLocalStore(state);
        },
        setDrawerClose(state) {
            state.openDrawer = false;
            storeLocalStore(state);
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
