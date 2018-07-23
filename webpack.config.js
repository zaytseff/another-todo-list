const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production'
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  entry: {
    app: './js/app.js',
  },
  module: {
    rules: [
      // From Bootasterp docs ------------------
      {
        test: /\.(css|less)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },

      // URL Loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.tpl$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      // title: 'TODO List - special for LAR',
      filename: 'index.html',
      template: 'index.html',
      // inject: true
    }),
    new webpack.HotModuleReplacementPlugin('styles.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      // chunkFilename: "[id].css"
    }),
    new UglifyJSPlugin({
      // sourceMap: true
      // minimize: true
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
    // publicPath: '/'
  },
  devServer : {
    host: 'localhost',
    port: 8080,
  }
};
