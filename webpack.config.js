const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    mode: 'production',
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
            chunks: 'all',
            cacheGroups: {
                // priority：优先级 值越大优先级越高
                // chunks: chunk来源 async(动态加载模块)，initial(入口模块)，all(全部模块入口和动态的）
                //---- 异步函数库，分别进行打包，按需加载,减少首屏请求数
                // 大型第三方库，如jquery lodash vue，合并打包并做长缓存
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]lodash[\\/]|jquery/,
                    priority: 10
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
                },
                // node_modules，也可以做长缓存，优先级最低
                modules: {
                    test: /node_modules/,
                    priority: -10,
                    name: 'modules',
                    chunks: "all"
                },
            }
        },
        // 独立打包runtimeChunk
        runtimeChunk: 'single'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './assets/index.html')
        }),
        new BundleAnalyzerPlugin()
    ]
}