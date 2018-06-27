const base = require('./base');
// const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' })
const CompressionPlugin = require('compression-webpack-plugin');
// const utils = require('./utils');

module.exports = WebpackMerge(base, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minimize=true',
          'postcss-loader',
          'less-loader?javascriptEnabled=true',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minimize=true',
        ],
      },
    ],
  },
  plugins: [
    // utils.UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'statics/css/[name].css',
      chunkFilename: 'statics/css/[name].[contenthash:5].css',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // scope hosting
    new ModuleConcatenationPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.less|css$/,
          chunks: 'all', // 合并所有 css chunk
          enforce: true,
        },
      },
    },
  },
});
