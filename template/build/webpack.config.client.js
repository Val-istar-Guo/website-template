import webpack from 'webpack'
import merge from 'webpack-merge'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import common from './webpack.config.common'


const isProd = process.env.NODE_ENV === 'production'
const plugins = [
  new VueSSRClientPlugin({ filename: 'vue-ssr-manifest.json' }),

  new webpack.DefinePlugin({
    'process.env.WEB_CONTAINER': JSON.stringify('browser'),
  }),

  new CopyWebpackPlugin([
    {
      from: './client/template.html',
      to: 'template.html',
    },
    {
      from: './client/manifest.json',
      to: 'manifest.json',
    },
    {
      from: './client/service-worker.js',
      to: 'service-worker.js',
    },
    {
      from: './node_modules/sw-toolbox/sw-toolbox.js',
      to: 'sw-toolbox.js',
    },
  ]),
]

if (isProd) plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
if (process.env.ANALYZER) plugins.push(new BundleAnalyzerPlugin())



export default merge(common, {
  entry: {
    bundle: ['@babel/polyfill', './client/entry-client'],
  },

  output: {
    filename: isProd ? '[name].[chunkhash:8].js' : '[name].[hash].js',
    chunkFilename: isProd ? 'chunk.[name].[chunkhash:8].js' : 'chunk.[name].[hash].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    }
  },

  plugins,
})
