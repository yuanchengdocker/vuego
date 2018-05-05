const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: '9999',
  progress: true,
  overlay: {
    errors: true
  },
  hot: true,
  historyApiFallback: {
    index: '/index.html'
  }
  // open:true
}
const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const config = isDev ? webpackMerge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  devServer: devServer,
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     module: true,
          //     localIdentName: isDev ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64:5]',
          //     camelCase: true
          //   }
          // },
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
}) : webpackMerge(baseConfig, {
  devtool: false,
  entry: {
    vendor: ['vue'],
    bundle: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // css代码压缩
                minimize: true
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
        })

      }
    ]
  },
  plugins: defaultPlugin.concat([
    new ExtractTextPlugin('style.[contenthash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin()
  ])
})

module.exports = config
