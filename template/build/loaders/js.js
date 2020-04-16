const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/preset-env', { corejs: 3, useBuiltIns: 'entry' }],
    ],
  },
};

export default {
  test: /\.js$/,
  exclude: file => ( /node_modules/.test(file) && !/\.vue\.js/.test(file)),
  use: [babelLoader, 'source-map-loader'],
}
