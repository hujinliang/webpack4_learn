const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const WorkBoxPlugin = require('workbox-webpack-plugin')
const StringReplacePlugin = require('./plugins/StringReplacePlugin')


module.exports = {
    mode: 'production',
    entry: {
        pageA: path.resolve(__dirname, './src/pageA.js'),
        pageB: path.resolve(__dirname, './src/pageB.js')
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
                use: [{
                    loader: MiniCssPlugin.loader
                }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css/,
                use: [{
                    loader: MiniCssPlugin.loader
                }, 'css-loader']
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
        contentBase: 'dist',
        proxy: {
            // 跨域代理转发
            '/comments': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: ''
                }
            }
        },
    },
    optimization: {
        // code split
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // priority：优先级 值越大优先级越高
                // chunks: chunk来源 async(动态加载模块)，initial(入口模块)，all(全部模块入口和动态的）
                // 大型第三方库，如jquery lodash vue，合并打包并做长缓存
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]lodash[\\/]|jquery/,
                    priority: 10
                },
                //---- 异步函数库，分别进行打包，按需加载,减少首屏请求数
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
        new StringReplacePlugin({
            source: 'Hello',
            content: 'notHello'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new MiniCssPlugin({
            filename: '[name].[chunkHash].css',
            chunkFilename: '[name].[chunkHash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS 处理器，默认为 cssnano
            cssProcessorOptions: {safe: true, discardComments: {removeAll: true}}, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        }),
        // 可以用config.entry.keys得到一个页面的List，然后每个页面对应一个template来进行打包
        new HtmlWebpackPlugin({
            title: 'hjl pageA',
            filename: 'pageA.html',
            template: path.resolve(__dirname, './assets/index.html'),
            chunks: ['pageA', 'runtime', 'vendor', 'modules']
        }),
        new HtmlWebpackPlugin({
            title: 'hjl pageB',
            filename: 'pageB.html',
            template: path.resolve(__dirname, './assets/index.html'),
            chunks: ['pageB', 'runtime', 'modules']
        }),
        new WorkBoxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: /\.html$/, // 匹配HTML文件
                    handler: 'NetworkFirst' // 网络优先
                }
            ]
        }),
        // new BundleAnalyzerPlugin()
    ]
}