const path = require('path');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const PublicPath = utils.DEBUG ? '/' : `//packagejson.oss-cn-qingdao.aliyuncs.com/${utils.CDNRoot}`;

// 压缩 html 内联 js 和 css
const minifyConfig = {
  // 仅压缩内联在html里面的js
  minifyJS: true,
  // 仅压缩内联在html里面的css
  minifyCSS: true,
  // 以html5的文档格式解析html的模板文件
  html5: true,
  // 删除Html文件里面的注释
  removeComments: true,
  // 删除空格
  collapseWhitespace: true,
  // 删除换行
  preserveLineBreaks: false,
  collapseInlineTagWhitespace: true,
  removeRedundantAttributes: true,
};

module.exports = {
  mode: utils.DEBUG ? 'development' : 'production',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('dist'),
    publicPath: PublicPath,
    filename: 'statics/js/[name].[hash:5].js',
    chunkFilename: 'statics/js/[name].[hash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.(jpe?g|png|gif)(\?.*)?$/,
        use: 'url-loader?limit=1024&name=statics/img/[name]-[hash:5].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader?limit=1024&name=statics/css/[name]-[hash:5].[ext]',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      cache: true,
      inject: true,
      template: path.join('public', 'index.html'),
      minify: utils.DEBUG ? false : minifyConfig,
    }),
    utils.DefinePlugin(),
    utils.HappyJSPlugin(),
    ...utils.DLLReferencePlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
      statics: path.resolve('public', 'statics'),
      styles: path.resolve('src', 'styles'),
    },
  },
};
