const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {

  entry: {
    app:  path.resolve(sourcePath, 'index.tsx')
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loaders:["babel-loader","awesome-typescript-loader"]},

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // Loads URLs specified in CSS files
      /*{
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
      }*/
      {
        test:/\.(png|jpe?g|gif)$/,
        exclude:/node_modules/
        ,loader: 'url-loader?limit=1024&name=/assets/[name].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/app.html',
      filename: 'index.html'
    }),

    new CopyWebpackPlugin([
      //{ from: 'assets', to: 'assets' },
      { from: 'data', to: 'data' }
    ])
  ]
};