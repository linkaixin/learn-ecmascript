const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // externals: {
    //     'vue': 'Vue'
    // },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserlist: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ]
}