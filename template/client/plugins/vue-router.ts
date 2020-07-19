import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@client/views/route'


Vue.use(VueRouter)

export default function createRouter(options): void {
  const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
  })

  options.router = router
}
