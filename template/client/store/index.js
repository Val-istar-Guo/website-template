import * as MUTATIONS from '../contants/mutations'
import { FETCH_STATUS } from '../contants/status'


const isProd = process.env.NODE_ENV === 'production'
const fetch = () => new Promise(resolve => setTimeout(resolve, 4000))

export default {
  strict: !isProd,

  modules: {
  },

  state: {
    isload: false,
    value: '',
  },

  actions: {
    fetchValue: async({ commit }, payload) => {
      // needless dispatch
      // if (state.value === payload) return

      console.log('fetching value', payload)
      commit(MUTATIONS.UPDATE_FETCH_STATE, FETCH_STATUS.FETCHING)
      await fetch()
      console.log('fetched value', payload)
      commit(MUTATIONS.UPDATE_FETCH_STATE, FETCH_STATUS.FETCHED)
      commit(MUTATIONS.UPDATE_VALUE, payload)
    },
  },

  mutations: {
    [MUTATIONS.UPDATE_VALUE](state, payload) {
      state.value = payload
    },
    [MUTATIONS.UPDATE_FETCH_STATE](state, payload) {
      state.isload = payload === FETCH_STATUS.FETCHED
    },
  },

}
