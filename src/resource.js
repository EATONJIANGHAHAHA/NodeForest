import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.credentials = false;
export default VueResource;