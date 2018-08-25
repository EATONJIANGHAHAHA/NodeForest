import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import Theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = true;

Theme.add('project', {
    primary: '#a5d6a7'
}, 'light');

Theme.use('project');
Vue.use(MuseUI);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template: '<App/>',
    components: { App }
});
