import { join, resolve } from 'path'
import fs from 'fs-extra'
import { createBundleRenderer, BundleRenderer } from 'vue-server-renderer'
import { Middleware } from 'koa'
import { nodeEnv } from '@framework/env'
import cookie from 'cookie'


function renderToString(renderer, url, title = 'Web Template', cookies: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    renderer.renderToString({ url, title, cookies }, (err, html) => {
      if (err) {
        err.status = err.code
        err.expose = nodeEnv.not.prod
        reject(err)
        return
      }

      resolve(html)
    })
  })
}

const title = process.env.Title
const clientDir = resolve(__dirname, '../client')
const templatePath = join(clientDir, 'template.html')
const bundlePath = join(clientDir, 'vue-ssr-bundle.json')
const manifestPath = join(clientDir, 'vue-ssr-manifest.json')


async function createRenderer(bundle: string, template: string, clientManifest: object): Promise<BundleRenderer> {
  return createBundleRenderer(bundle, { runInNewContext: false, template, clientManifest })
}

export default async function ssr(): Promise<Middleware> {
  let renderer: BundleRenderer

  if (nodeEnv.not.local) {
    const template = await fs.readFile(templatePath, 'utf8')
    const clientManifest = await fs.readJSON(manifestPath)
    renderer = await createRenderer(bundlePath, template, clientManifest)
  }

  const middleware: Middleware = async(ctx, next) => {
    if (nodeEnv.is.local) {
      const outputPath = ctx.state.webpackStats.toJson().outputPath
      const template = ctx.state.fs.readFileSync(join(outputPath, 'template.html'), 'utf8')
      const clientManifest = ctx.state.fs.readFileSync(join(outputPath, 'vue-ssr-manifest.json'), 'utf8')
      renderer = await createRenderer(bundlePath, template, JSON.parse(clientManifest))
    }

    let html

    try {
      html = await renderToString(renderer, ctx.url, title, cookie.parse(ctx.get('cookie')))
    } catch (err) {
      if (err.status === 302 && err.url) {
        ctx.redirect(err.url)
        return
      } else if (err.status !== 404) {
        throw err
      }
    }

    if (html) ctx.body = html
    else await next()
  }

  return middleware
}
