import postcssPresetEnv from 'postcss-preset-env'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'


const isProd = process.env.NODE_ENV === 'production'
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [ postcssPresetEnv({ stage: 0 }) ],
  },
}

const cssModuleLoader = {
  resourceQuery: /module/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[local]_[hash:base64:5]'
      },
    },
    postcssLoader,
  ],
}

// this matches plain `<style>` or `<style scoped>`
const normalCssLoader = {
  use: [
    !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    postcssLoader,
  ]
}

const stylusLoader = {
  test: /\.styl$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    'stylus-loader',
  ],
}


export default {
  test: /\.(css|postcss|styl)$/,
  oneOf: [cssModuleLoader, normalCssLoader, stylusLoader],
}
