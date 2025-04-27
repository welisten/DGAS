const HtmlWebpackPlugin     = require('html-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin     = require('copy-webpack-plugin')
const TerserWebpackPlugin   =  require('terser-webpack-plugin')
const webpack               = require('webpack')
const path                  = require('path')
const { name }              = require('file-loader')
require('dotenv').config()

const envKeys = Object.keys(process.env)
    .filter(key => key.startsWith('APP_'))
    .reduce((acc, atual) => {
        acc[`process.env.${atual}`] = JSON.stringify(process.env[atual])
        return acc
    }
, {})

module.exports = {
    mode: process.env.APP_NODE_ENV || 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/javascript/platform.js'),
        footerPages: path.resolve(__dirname, 'src/javascript/footerPages.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename:'[name][contenthash].js',
        clean: true,
        assetModuleFilename:'[name][ext]'
    },
    devtool: 'source-map',
    module: {
        rules:[
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.( png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(mp3|ogg|wav)$/i,
                type:'asset/resource'
            }
        ],
       
    },
    optimization:{
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
        splitChunks: {
            cacheGroups: {
                default: false,
                sharedStyle:{
                    name: 'shared',
                    type: 'css/mini-extract',
                    chunks: (chunk) => {
                        return chunk.name !== 'bundle'
                    },
                    enforce: true
                }
            }
        }
    },
    plugins:[
            new HtmlWebpackPlugin({
                title: 'Desenvolvendo Guapi',
                filename: 'index.html',
                template: path.resolve(__dirname, 'src/pages/index.html'),
                chunks: ['bundle']
            }),
            new HtmlWebpackPlugin({
                title: 'Políticas de Acessibilidade',
                filename: 'accessibilityPolicy.html',
                template: path.resolve(__dirname, 'src/pages/accessibilityPolicy.html'),
                chunks: ['footerPages']
            }),
            new HtmlWebpackPlugin({
                title: 'Créditos',
                filename: 'credits.html',
                template: path.resolve(__dirname, 'src/pages/credits.html'),
                chunks: ['footerPages']
            }),
            new HtmlWebpackPlugin({
                title: 'Políticas de Privacidade',
                filename: 'privacyTerms.html',
                template: path.resolve(__dirname, 'src/pages/privacyTerms.html'),
                chunks: ['footerPages']
            }),
            new HtmlWebpackPlugin({
                title: 'Termos de Serviço',
                filename: 'termsOfService.html',
                template: path.resolve(__dirname, 'src/pages/termsOfService.html'),
                chunks: ['footerPages']
            }),
            new MiniCssExtractPlugin({
                filename: '[name][contenthash].css'
            }),
            new CopyWebpackPlugin({
                patterns:[
                    {
                        from: path.resolve(__dirname, 'src/assets'),
                        to: './assets'
                    },
                    {
                        from: 'src/data/*.json',
                        to: './data/[name][ext]',
                        noErrorOnMissing: false
                    },
                    {
                        from: 'src/games',
                        to: './games',
                        globOptions: {
                            dot: true,
                            ignore: ['**/.git/**']
                        }
                    },
                    {
                        from: 'src/constants/platformData.js',
                        to: './constants/[name][ext]',
                        noErrorOnMissing: false
                    },
                    {
                        from: 'src/javascript/navigation.js',
                        to: './util/[name][ext]',
                        noErrorOnMissing: false
                    },
                    {
                        from: 'src/constants/colors.js',
                        to: './constants/[name][ext]',
                        noErrorOnMissing: false
                    }
                ]
            }),
            new webpack.DefinePlugin(envKeys),
            new BundleAnalyzerPlugin()
        ]
}