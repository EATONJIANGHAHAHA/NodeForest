import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import muse from './muse'
import axios from 'axios';

Vue.config.productionTip = true;
Vue.prototype.$http = axios.create({
    withCredentials: true
});
new Vue({
    el: '#app',
    router,
    store,
    muse,
    // resource,
    render: h => h(App),
    template: '<App/>',
    components: { App }
});
