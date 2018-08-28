import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
Vue.http.options.emulateJSON = true;
// Vue.http.options.credentials = true;
export default VueResource;