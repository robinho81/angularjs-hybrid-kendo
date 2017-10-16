var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/app.ts',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.html'],
      alias: {
        "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
            test: /\.html$/,
            loader: 'raw-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ use: 'css-loader' })
          }
        ]
    },
    
    output: {
      filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          path.resolve(__dirname, '../src')
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills'] 
        }),
        new ExtractTextPlugin('styles.css') // outputs all styles to styles.css
    ]
};