const path = require('path');
const fs = require('fs-extra');
const merge = require('webpack-merge');
const utils = require('./utils');

// 默认配置
let dllConfig = {
  entry: utils.VENDORS,
  output: {
    // output: {
    //   publicPath: 'http://host:port/build', // cdn
    // },
    path: utils.DLLPath,
    // TODO: [name].[hash].js 映射
    filename: '[name].js',
    library: '[name]_library', // 暴露的全局对象名，与 webpack.DllPlugin.name 保持一致
  },
  plugins: [
    utils.DefinePlugin(),
    utils.DLLPlugin(),
  ],
};

if (utils.DEBUG) {
  fs.emptyDirSync(path.resolve('public', 'statics', 'dll'));
  dllConfig = merge(dllConfig, {
    mode: 'development',
  });
} else {
  fs.emptyDirSync(path.resolve('public', 'statics', 'js'));
  dllConfig = merge(dllConfig, {
    mode: 'production',
    plugins: [
      // utils.UglifyJsPlugin(),
    ],
  });
}

module.exports = dllConfig;
