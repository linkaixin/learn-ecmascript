const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');

/**
 * 1. webpack各种依赖之间版本兼容问题很大
 * 2. webpack性能优化很困难
 * 3. 复杂配置的上手很困难
 */

/**
 * 样式安装的loader
 * sass sass-loader
 * postcss postcss-loader autoprefixer
 * css-loader
 * vue-style-loader
 */

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    externals: {
        'vue': 'Vue'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue',]
    },
    devtool: 'source-map',
    resolveLoader: {
        modules: [
            'node_modules',
            resolve(__dirname, './loaders')
        ]
    },
    module: {
        rules: [{
            test: /\.tpl$/,
            loader: 'tpl-loader'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
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
        },
        {
            test: /\.css$/,
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
            ]
        }]
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'public/index.html')
        })
    ]
}