const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap!sass-loader?sourceMap"
        })
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin('style.css')
  ]
});