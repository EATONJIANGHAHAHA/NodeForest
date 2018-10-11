import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import muse from './muse'
import axios from 'axios'
import Loading from 'muse-ui-loading'
import VueLazyLoad from 'vue-lazyload'
import animated from 'animate.css'

Vue.use(animated);
Vue.use(Loading);
Vue.use(VueLazyLoad);
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
    components: { App },
    watch:{
        "$route" : 'checkLogin'
    },
    created() {
        if(!getCookie('session')){
            this.$router.push('/login');
        }
        else localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg"))));
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
        })
    },
    methods:{
        checkLogin(){

            if(!getCookie('session') && this.$route.path !== '/register' && this.$route.path !== '/about'){
                this.$router.push('/login');
            }
        }
    }
});

/**
 * Set cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * Get cookie
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
Vue.prototype.getCookie = getCookie;

/**
 * Delete cookie
 * @param name
 */
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
