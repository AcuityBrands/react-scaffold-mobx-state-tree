const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval",

  module: {
    rules: [
      // Compiles and inlines sass or css
      {
        test: /\.(s*)css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    historyApiFallback: true,
    hot: true
  }
});