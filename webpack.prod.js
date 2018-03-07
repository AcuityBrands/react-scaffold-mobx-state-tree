const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compress-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },

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
    new BundleAnalyzerPlugin(),

    // Set node environment to production
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    
    // Enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    // Split node_modules into vendor chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: (module) => module.context && module.context.indexOf('node_modules') >= 0
    }),

    // Minimize Javascript
    new webpack.optimize.UglifyJsPlugin(),

    new webpack.HashedModuleIdsPlugin(),

    // Compile and extract styles.css file
    new ExtractTextPlugin('style.css'),

    // Ignore unneeded modules
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // GZip the output
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});