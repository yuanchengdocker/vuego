// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    props: true, // 会讲上面id 以props的形式传入组件
    name: 'app',
    component: () => import('../views/todo/todo.vue'),
    meta: {
      title: 'vue-go'
    },
    beforeEnter: (to, from, next) => {
      console.log('before enter', to)
      next()
    }
    // children: [
    //   {
    //     path: 'lala',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
