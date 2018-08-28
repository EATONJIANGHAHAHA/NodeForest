import Vue from 'vue'
import Vuex from 'vuex'
import User from "./model/User";

Vue.use(Vuex);

var api = '127.0.0.1:3000/api/';

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
            return state.trees.find(tree => tree.treeId === Number(treeId));
        }
    },
    //async tasks.
    actions: {
        setUser(context, user) {
            console.log(user.username, user.password);
            let url = api + '/login';
            this.$http.post(url);
            /*context.commit('setUser', user);*/
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
            context.commit('setTrees', trees)
        }
    }
})
