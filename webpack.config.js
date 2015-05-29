var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  devtool: "source-map",
  watch: true,
  entry: {
    client: "./app/js/app",
    vendor: ["jquery", "backbone", "underscore", "react", "pusher"]
  },
  output: {
    path: __dirname + "/public/js",
    publicPath: "/js",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    noParse: [/jquery/, /backbone/, /underscore/, /react/, /pusher/],
    loaders: [
      {
        test: /\.scss$/,
        loader: "sass-loader!css-loader!sass-loader?paths=app/css"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".scss", ".html"]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.scripts.js", Infinity)]
};

// ---
// generated by coffee-script 1.9.2
