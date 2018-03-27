const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compress-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {

  devtool: 'none',

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?sourceMap!sass-loader?sourceMap"
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new UglifyWebpackPlugin()],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial", // Remove this line if you don't want a single common vendors chunk
          name: "vendors" // Remove this line if you don't want a single common vendors chunk
        }
      }
    }
  },

  plugins: [
    // Analyze bundle
    new BundleAnalyzerPlugin(),

    // Set node environment to production
    // this is primarily for React, where this removes 179KB from the bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    // Hashes to be based on the relative path of the module
    new webpack.HashedModuleIdsPlugin(),

    // Ignore unneeded modules
    // Targetting locales in moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Compress the output
    // IMPORTANT: This plugin does not appear to be stable with webpack 4 release
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/
    // })
  ]
});