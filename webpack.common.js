const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {

  // Entry point to the application
  entry: {
    app:  path.resolve(sourcePath, 'index.tsx')
  },

  // Application output location
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: ''
  },

  // Resolve these files during bundling
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be compiled by 'awesome-typescript-loader'.
      // Then Babel will transpile the es6 javascript to es5.  Babel has better support for tree-shaking
      { 
        test: /\.tsx?$/, 
        loaders:["babel-loader","ts-loader"]
      },

      // Load images into assets folder on output
      {
        test:/\.(png|jpe?g|gif)$/,
        exclude:/node_modules/,
        loader: 'url-loader?limit=1024&name=/assets/[name].[ext]'
      }
    ]
  },

  // Sometimes it's preferrable to keep 3rd party libraries external.  If this
  // section is uncommented, you must place a script tag somewhere to import
  // the library as the build process will skip bundling these external references
  /*externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "mapbox-gl": "mapboxgl",
    "chart.js": "Chart"
  },*/

  plugins: [
    // Inject the bundles into the distribution index.html
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/template.html',
      filename: 'index.html'
    }),

    // Copy the data folder to build folder
    new CopyWebpackPlugin([
      { from: 'data', to: 'data' }
    ])
  ]
};