import Vue from 'vue'
import Vuex from 'vuex'
import User from "./model/User";

Vue.use(Vuex);

export default new Vuex.Store({
    //defines application-wise variable.
    state: {
        user: new User,
        trees: [],
    },
    /*
    this function are used for changing states. All states must changed using commit only
    so that the real time refreshments for all components shale work.
     */
    mutations: {
        setUser(state, user) {
            state.user = user;
            console.log('user in the store');
            console.log(state.user);
        },
        setTrees(state, trees) {
            state.trees = trees;
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
            console.log("treeId: ")
            console.log(treeId);
            return state.trees.find(tree => tree.treeId === Number(treeId));
        }
    },
    //async tasks.
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
        },
        setUsername(context, username) {
            let user = state.getUser();
            user.username = username;
            context.commit('setUser', user)
        },
        setPassword(context, password) {
            let user = state.getUser();
            user.password = password;
            context.commit('setUser', user)
        },
        setTrees(context, trees) {
            context.commit('setTrees', trees);
            console.log('trees in the store: ');
            console.log(context.state.trees);
        }
    }
})
