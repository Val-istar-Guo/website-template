/**
 * NOTE webpack base config is the Duplicate code
 *      in webpack.config.ssr.js and webpack.config.client.js
 */
import path from 'path'
import webpack from 'webpack'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'


import cssLoader from './loaders/css'
import tsLoader from './loaders/ts'
import jsLoader from './loaders/js'
import fontLoader from './loaders/font'
import htmlLoader from './loaders/html'
import vueLoader from './loaders/vue'
import imageLoader from './loaders/image'
import pugLoader from './loaders/pug'


const isProd = process.env.NODE_ENV === 'production'

// base client config
export default {
  context: path.resolve(__dirname, '..'),
  mode: isProd ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      vueLoader,
      tsLoader,
      jsLoader,
      cssLoader,
      fontLoader,
      htmlLoader,
      pugLoader,
      imageLoader,
    ],
  },

  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, '../framework/'),
      '@client': path.resolve(__dirname, '../client'),
      '@server': path.resolve(__dirname, '../server'),
    },
    extensions: ['.js', '.vue', '.ts'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
    }),
  ],
}
