let webpack =  require('webpack');
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        app: [
            './src/js/main.js',
            './src/scss/main.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, './assets/js'),
        file: "[name].js"
    },

    module: {
        rule: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s?css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.eventNames.NODE_ENV === development,
                        },
                    },
                    'css-loader', 'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],

    stats: {
        all: true,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true
    },
    mode: "production"
}