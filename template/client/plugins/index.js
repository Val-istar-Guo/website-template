import createRouter from './vue-router'
import createStore from './vuex'
import createVuetify from './vuetify'

export function register(options) {
  createRouter(options)
  createStore(options)
  createVuetify(options)
}
