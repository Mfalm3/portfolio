let webpack = require('webpack');
let path = require('path');
let helpers = require('./helpers');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    entry: {
        app: [
            helpers.root('src/js/app.js'),
            helpers.root('src/scss/main.scss')
        ]
    },

    output: {
        path: path.resolve(__dirname, helpers.root('assets/js')),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [helpers.root('src/js/components')]
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }, 'sass-loader'
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: '[id].css',
        }),
        new VueLoaderPlugin(),
    ],
    stats: {
        all: true,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true
    },
    mode: "development",
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            'vue$': isDev ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.esm.js',
            'components': helpers.root('src/js/components'),
            '@': helpers.root('src/js')
        }
    }
};