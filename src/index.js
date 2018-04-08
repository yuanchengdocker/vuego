import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
import './style/global.styl'

import createRouter from './config/router'
import createStore from './store/store'
Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log('before each', to)
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve', to)
  next()
})

router.afterEach((to, from) => {
  console.log('after each', to)
})

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#root')
