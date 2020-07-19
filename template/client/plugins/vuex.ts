import Vue from 'vue'
import Vuex from 'vuex'
import store from '@client/views/store'


Vue.use(Vuex)

export default function createStore(options): void {
  options.store = new Vuex.Store(store)
}
