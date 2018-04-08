import VueRouter from 'vue-router'
import routes from './routes.js'

export default () => {
  return new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active-vue',
    linkExactActiveClass: 'exacti-active-vue',
    scrollBehavior (to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true
  })
}
