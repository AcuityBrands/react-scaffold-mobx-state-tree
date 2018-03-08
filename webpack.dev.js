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
      // Inline is better for hot module reloading
      {
        test: /\.(s*)css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [

    // Set the node environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // Enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    
    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    
  ],

  // Setup development server
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    historyApiFallback: true,
    hot: true
  }
});