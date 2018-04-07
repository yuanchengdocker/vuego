const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: '8088',
  progress: true,
  overlay: {
    errors: true
  },
  hot: true
  // open:true
}
const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const config = webpackMerge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer: devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: isDev ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64:5]',
              camelCase: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
