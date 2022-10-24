const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

let mode = 'production' //development, production
module.exports = {
    mode: mode,
    entry: ["@babel/polyfill", "./src/index.jsx"], //javascript
    // entry: ["@babel/polyfill", "./src/index.ts"], //typescript
    output: {
        filename: 'assets/js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "assets/[name][ext][query]",
        clean: true,
    },
    devtool: false, //'source-map'
    devServer: {
        port: 3000
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "./src/favicon.ico", to: "favicon.ico" },
            ],
          }),

    ],
    module: {
        rules: [
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader",
            // },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env",]
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },


            {
                test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash].[ext]'
                }
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react',
                        {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]

                    }
                }
            },

            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },

            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts'],
    },
}