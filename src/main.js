import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import theme from 'muse-ui/lib/theme'

Vue.config.productionTip = true

theme.use('dark')
Vue.use(MuseUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
