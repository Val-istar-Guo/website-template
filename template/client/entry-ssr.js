// Server Side Render Bundle entry file
import createApp from './create-app'
import * as cookie from '@client/utils/cookie'


async function loadComponentsInitialData({ components, store, router }) {
  return Promise.all(components.map(component => {
    if (component.initialData) {
      return component.initialData({ store, route: router.currentRoute, router })
    }
  }))
}

export default async ctx => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  const { url, cookies } = ctx
  cookie.init(cookies)

  router.push(url)
  router
    .onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) return reject({ code: 404 })

      loadComponentsInitialData({ store, router, components: matchedComponents })
        .then(() => {
          ctx.state = store.state
          if (router.currentRoute.fullPath !== url) {
            reject({ code: 302, url: router.currentRoute.path })
          } else {
            resolve(app)
          }
        })
        .catch(reject)
    }, reject)
})
