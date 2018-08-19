import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import About from './views/About'
import Home from './views/Home'
import Login from './views/Login'
import MyAccount from './views/MyAccount'
import Register from './views/Register'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          component: Index,
      },
      {
          path: '/about',
          component: About,
      },
      {
          path: '/home',
          component: Home,
      },
      {
          path: '/login',
          component: Login,
      },
      {
          path: '/register',
          component: Register,
      },
      {
          path: '/myaccount',
          component: MyAccount,
      },
  ]
})
