import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const curUser = firebase.auth().currentUser
  const requireAuth = to.matched.some((record) => record.meta.auth)
  if (requireAuth && !curUser) {
    next('/?message=login')
  } else {
    next()
  }
})

export default router
