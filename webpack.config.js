const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/pageA.js'),
        // vendor: [path.resolve(__dirname, './src/utils/logger.js'),
        //     path.resolve(__dirname, './src/utils/time.js')
        // ]
    },
    output: {
        filename: "js/[name].[chunkHash:8].js",
        path: path.resolve(__dirname, './dist')
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: ['node_modules', './src/utils'],
        alias: {
            '@style': path.resolve(__dirname, './assets/scss')
        }
    },
    devServer: {
      contentBase: 'dist'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    priority: 2,
                    name: 'common',
                    chunks: "initial"
                },
                logger: {
                    test: /logger/,
                    chunks: "async",
                    name: "logger",
                    priority: 4,
                    enforce: true,
                },
                time: {
                    test: /time/,
                    chunks: "async",
                    name: "time",
                    priority: 5,
                    enforce: true,
                }
            }
        },
        runtimeChunk: 'single'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './assets/index.html')
        })
    ]
}