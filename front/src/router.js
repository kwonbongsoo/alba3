import Vue from 'vue'
import Router from 'vue-router'
import Site from './views/Site.vue'
import SiteInfo from './views/SiteInfo.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'site',
      component: Site,
      meta: {
        auth : store.getters.login_info.is_login
      }
    },
    {
      path: '/siteInfo',
      name: 'siteInfo',
      component: SiteInfo,
      meta: {
        auth : store.getters.login_info.is_login
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth : true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
router.beforeEach((to, from, next) => {
  if(!to.matched.some((routerInfo) => {
    return routerInfo.meta.auth;
  }))
  {
    if (store.getters.login_info.is_login)
      next();
    else
      next('/login');
  }
  else
    next();
})

export default router;
