import Vue from 'vue'
import Vuex from 'vuex'
import User from "./model/User";

Vue.use(Vuex);

export default new Vuex.Store({
    //defines application-wise variable.
    state: {
        user: new User
    },
    /*
    this function are used for changing states. All states must changed using commit only
    so that the real time refreshments for all components shale work.
     */
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        getUser(state) {
            return state.user;
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
        }
    }
})
