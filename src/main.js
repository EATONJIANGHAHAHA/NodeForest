import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import muse from './muse'
// import resource from './resource'
import axios from 'axios';

Vue.config.productionTip = true;
Vue.prototype.$http = axios;
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
