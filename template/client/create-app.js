import 'normalize.css'
import Vue from 'vue'
import App from './app'
import { register } from './plugins'


export default function() {
  const options = {
    render: h => h(App),
  }

  register(options)

  const app = new Vue(options)

  return { app, store: options.store, router: options.router }
}
