const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compress-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {

  devtool: 'none',

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader?sourceMap!sass-loader?sourceMap"
        })
      }
    ]
  },
  
  plugins: [
    // Analyze bundle
    //new BundleAnalyzerPlugin(),

    // Set node environment to production
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    
    // Enable scope hoisting - faster browser execution
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    // Create implicit vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename: 'vendor.bundle.js',
      minChunks: (module) => module.context && module.context.indexOf('node_modules') >= 0
    }),

    // OPTIONAL - Pull common dependencies out of deferred (async) modules/bundles
    // Dependency must be common among XX (minChunks) modules
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: true,
    //   children: true, 
    //   minChunks: 3
    // })

    // Minimize Javascript
    new webpack.optimize.UglifyJsPlugin(),

    // Hashes to be based on the relative path of the module
    new webpack.HashedModuleIdsPlugin(),

    // Compile and extract styles.css file
    new ExtractTextPlugin('style.css'),

    // Ignore unneeded modules
    // Targetting locales in moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Compress the output
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/
    })
  ]
});