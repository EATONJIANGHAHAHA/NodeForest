import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import Theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = true

Theme.use('light');
Vue.use(MuseUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
