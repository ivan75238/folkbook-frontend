const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
    },
    entry: ["@babel/polyfill", './src/index'],
    output: {
        filename: '[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                },
                // include: "/fonts/",
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(css|scss)$/,
                /*exclude: /node_modules/,*/
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: 'body',
            favicon: "./src/common/favicon.svg",
        }),
        new CopyPlugin([
            {from: 'src/config/*.json', toType: 'dir'},
        ]),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            modules: path.resolve(__dirname, 'src/modules/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            pages: path.resolve(__dirname, 'src/pages/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            routes: path.resolve(__dirname, 'src/routes/'),
            store: path.resolve(__dirname, 'src/store/'),
            config: path.resolve(__dirname, 'src/config/'),
            actions: path.resolve(__dirname, 'src/actions/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        }
    },
};
