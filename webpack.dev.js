const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval",

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude:[/node_modules/, /__tests__/]},
      
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      
      {
        test: /\.(s*)css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
      }
    ]
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  }
});