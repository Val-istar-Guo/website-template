import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '../routes'


Vue.use(VueRouter)

export default function createRouter (options) {
  options.router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
  })
}
