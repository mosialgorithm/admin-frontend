import { createRouter, createWebHistory } from 'vue-router'
import HomeView       from '../views/HomeView.vue'
import LoginView      from '../views/auth/LoginView.vue'
import RegisterView   from '../views/auth/RegisterView.vue'
import ForgotPassView from '../views/auth/ForgotPassView.vue'
import AuthUserView   from '../views/auth/AuthUserView.vue'
import ChangePassView from '../views/auth/ChangePassView.vue'
import store          from '@/store'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { loginRequired: true }
  },
  // ---------------------- auth app ------------------------
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { loginRedirect: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { loginRedirect: true }
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPass',
    component: ForgotPassView
  },
  {
    path: '/authUser',
    name: 'AuthUser',
    component: AuthUserView
  },
  {
    path: '/changePass',
    name: 'changePass',
    component: ChangePassView
  },
  // --------------------- end of auth app --------------------------
  // --------------------- blog app ---------------------------------
  {
    path: '/changePass',
    name: 'changePass',
    component: ChangePassView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (store.state.isAuthenticated) {
      next()
    } else {
      next('/login')
    } 

  } else if (to.matched.some(record => record.meta.loginRedirect)){
    if (!store.state.isAuthenticated) {
      next()
    } else {
      next('/')
    } 

  } else {
    next()
  }
});


export default router
