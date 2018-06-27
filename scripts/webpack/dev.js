require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const utils = require('./utils');
const base = require('./base');

module.exports = merge(base, {
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '127.0.0.1',
    port: process.env.FRONT_PORT,
    contentBase: path.resolve('public'),
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
});
