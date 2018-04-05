const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

let config = {
    target:"web",
    entry:{
        bundle:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    },
    output:{
        filename:'js/[name].[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },{
                test:/\.styl$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
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
                
            },{
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'img/[name]-[hash:5].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new extractTextPlugin('style/style.[contenthash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime',
            minChunks:Infinity
        }),
        new HTMLPlugin()
    ]

}

if(isDev){
    config.devtool = "#cheap-module-eval-source-map"
    config.devServer={
        port:'9999',
        progress:true,
        overlay:{
            errors:true
        },
        hot:true,
        open:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{  
    config.output.filename = 'js/[name].[chunkhash:8].js'
    config.plugins.push(
        new CleanPlugin(
            ['dist/js/*.js','dist/css/*.css',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './build'),
                to:path.resolve(__dirname, './dist'),
                force: true
            }
        ])
    )
}

module.exports = config;