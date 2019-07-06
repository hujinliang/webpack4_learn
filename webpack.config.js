const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/pageA.js')
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
        contentBase: 'dist'
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
                // 提取公共样式，可以做持久化缓存
                styles: {
                    name: 'styles',
                    test: /\.css|\.scss$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        // 独立打包runtimeChunk
        runtimeChunk: 'single'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
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
        new HtmlWebpackPlugin({
            title: 'hjl webpack4',
            filename: 'index.html',
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 移除空白和换行
                minifyCSS: true
            },
            template: path.resolve(__dirname, './assets/index.html')
        }),
        new BundleAnalyzerPlugin()
    ]
}