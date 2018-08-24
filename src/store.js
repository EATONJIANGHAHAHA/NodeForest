import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //defines application-wise variable.
    state: {
        userName: ''
    },
    /*
    this function are used for changing states. All states must changed using commit only
    so that the real time refreshments for all components shell work.
     */
    mutations: {
        setUserName(state, userName) {
            state.userName = userName;
        }
    },
    getters: {

    },
    actions: {

    }
})
