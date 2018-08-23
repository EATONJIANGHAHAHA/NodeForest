import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user_name: ''
    },
    mutations: {
        "SET_USER": function (state, user_name) {
            state.user_name = user_name
        }
    },
    getters: {
        "GET_USER": function(state) {
            return state.user_name
        }
    },
    actions: {}
})
