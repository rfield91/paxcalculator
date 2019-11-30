import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import InterpolateLoaderOptionsPlugin from 'interpolate-loader-options-webpack-plugin';
import LessPluginFunctions from 'less-plugin-functions';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

const babelrc = {
    compact: false,
    babelrc: true,
};

export default async (env, config, options) => {
    const isDev = config.mode !== 'production' ? true : false;
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            disable: isDev,
        }),
        new CopyWebpackPlugin([
            {
                from: '**/*',
                to: '../',
                flatten: false,
                context: path.resolve(__dirname, '../www'),
            },
        ]),
        new InterpolateLoaderOptionsPlugin({
            loaders: [
                {
                    name: 'react-svg-loader',
                    include: ['svgo.plugins.1.cleanupIDs.prefix'],
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './scripts/html-template.js',
            filename: 'index.html',
            inject: false,
            chunks: ['app'],
        }),
        new WebpackPwaManifest({
            name: 'Pax Calculator',
            short_name: 'Pax',
            filename: 'manifest.json',
            display: 'standalone',
            publicPath: '/',
            ios: {
                'apple-mobile-web-app-status-bar-style': 'default',
            },
            inject: true,
            background_color: '#ffffff',
            crossorigin: 'use-credentials',
            start_url: '/',
            icons: [
                {
                    src: path.resolve(__dirname, '../assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    ios: true,
                    purpose: 'maskable',
                },
            ],
        }),
    ];

    return {
        entry: {
            app: [
                'core-js/stable',
                'regenerator-runtime/runtime',
                'es6-promise/auto',
                'focus-visible',
                'url-polyfill',
                //'./src/constants.js',
                './src/index.js',
            ],
        },
        output: {
            path: path.resolve(`./build/`),
            filename: `[name].js`,
            publicPath: '/',
            chunkFilename: `[name].js`,
        },
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            https: true,
            contentBase: path.join(__dirname, '../build'),
            compress: true,
            port: 9000,
            after: (app, server) => {},
            index: 'index.html',
            historyApiFallback: {
                index: '/index.html',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(json)$/,
                    type: 'javascript/auto',
                    resourceQuery: /url/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name][hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: { compact: false, ...babelrc },
                },
                {
                    test: /\.svg$/,
                    oneOf: [
                        {
                            resourceQuery: /react/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: { compact: false, ...babelrc },
                                },
                                {
                                    loader: 'react-svg-loader',
                                    options: {
                                        jsx: true,
                                        svgo: {
                                            plugins: [
                                                {
                                                    removeDimensions: true,
                                                },
                                                {
                                                    prefixIds: true,
                                                },
                                                {
                                                    cleanupIDs: {
                                                        prefix: 'h[hash]-',
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name][hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|ttf|eot|woff|woff2|otf|fbx)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name][hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function() {
                                    return [Autoprefixer];
                                },
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                plugins: [new LessPluginFunctions()],
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx', '.css', '.less'],
        },
        stats: {
            children: false,
        },
        plugins,
    };
};
