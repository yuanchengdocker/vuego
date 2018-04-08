import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './style/global.styl'

import createRouter from './config/router'
Vue.use(VueRouter)

new Vue({
  router: createRouter(),
  render: h => h(App)
}).$mount('#root')
