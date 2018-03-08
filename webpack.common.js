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
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/, 
        loaders:["babel-loader","awesome-typescript-loader"]
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