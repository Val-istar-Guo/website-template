// Client entry file
import Vue from 'vue'
import createApp from './create-app'
import * as cookie from '@client/utils/cookie'
import cookies from 'cookie'


cookie.init(cookies.parse(document.cookie))
const { app, store, router } = createApp()

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { initialData } = this.$options

    if (initialData) {
      initialData.call(this, {
        store: this.$store,
        route: to,
        router,
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  },
})


// eslint-disable-next-line no-undef
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)

router.onReady(() => {
  app.$mount('#app', true)

  Vue.mixin({
    beforeMount() {
      const { initialData } = this.$options
      if (initialData) {
        this.dataPromise = initialData.call(this, {
          store: this.$store,
          route: this.$route,
          router,
        })
      }
    },
  })
})

