import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    props: true,
    component: Todo,
    meta: {
      title: 'vue-go'
    },
    children: [
      {
        path: 'lala',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
