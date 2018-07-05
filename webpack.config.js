const path = require('path');
const webpack = require('webpack');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var port = process.env.PORT || 1984

module.exports = {
  entry: {
    bundle: './index.js',
    vendor: ['angular-material', 'angular-aria', 'angular-animate', '@uirouter/angularjs', 'lodash']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-1'],
          plugins: ["transform-decorators-legacy", "transform-class-properties"]
        },
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
          attrs: false
        }
      }],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })

    }, {

      test: /\.(?:png|jpg|jpeg|svg)$/,
      loader: 'url-loader',
      query: {
        // Inline images smaller than 10kb as data URIs
        limit: 10000
      }
    }

    ]
  },
  plugins: [
    new CleanObsoleteChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bundle', 'vendor', 'manifest'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([{
      from: 'app/assets/**/*',
      to: ''
    }])

  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: port
  }
};

