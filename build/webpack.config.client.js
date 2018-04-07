const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
    port:'9999',
    progress:true,
    overlay:{
        errors:true
    },
    hot:true
    // open:true
}
const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]

const config = isDev ? webpackMerge(baseConfig,{
    devtool:"#cheap-module-eval-source-map",
    devServer:devServer,
    module:{
        rules:[
            {
                test:/\.styl$/,
                use:[
                    'vue-style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            module:true,
                            localIdentName:isDev ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64:5]' ,
                            camelCase:true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins:defaultPlugin.concat([
        new webpack.HotModuleReplacementPlugin()
        // new webpack.NoEmitOnErrorsPlugin()
    ])
}) : webpackMerge(baseConfig,{
    entry:{
        // vendor:['vue'],
        bundle:path.join(__dirname,'../src/index.js')
    },
    output:{
        filename:'js/[name].[chunkhash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.styl$/,
                use:ExtractTextPlugin.extract({
                    fallback:'vue-style-loader',
                    use:[
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true
                            }
                        },
                        'stylus-loader'
                    ]
                })

            }
        ]
    },
    optimization:{
      splitChunks:{
        chunks:"all" //默认将node_module文件打包到一起
      },
      runtimeChunk:true
    },
    plugins:defaultPlugin.concat([
        new ExtractTextPlugin('style.[contentHash:8].css')
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor',
        //     minChunks:Infinity
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'runtime',
        //     minChunks:Infinity
        // })
    ])
})

module.exports = config;
