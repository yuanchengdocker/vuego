const path = require('path')
const vueloaderConfig = require('./vueloader.config')

const isDev = process.env.NODE_ENV === 'development'

let config = {
  entry: {
    bundle: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueloaderConfig(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name]-[hash:5].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
