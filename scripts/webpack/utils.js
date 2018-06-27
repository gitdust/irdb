// 默认 DEBUG 环境，脚本不压缩混淆
const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV === 'development';

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');

// cpu 个数
const CPUS = os.cpus().length <= 0 ? 1 : os.cpus().length;

// webpack 编译脚本环境变量设置
const DefinePlugin = () => new webpack.DefinePlugin({
  'process.env.NODE_ENV': `"${NODE_ENV}"`,
});

// https://github.com/gdborton/webpack-parallel-uglify-plugin
const UglifyJsPlugin = () => new WebpackParallelUglifyPlugin({
  workerCount: CPUS,
  sourceMap: true,
  uglifyJS: {
    output: {
      // 不需要格式化
      beautify: false,
      // 不保留注释
      comments: false,
    },
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告
      warnings: false,
      // 删除所有的 `console` 语句，可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值,
      reduce_vars: true,
    },
  },
});

// 多线程编译插件
const happyThreadPool = HappyPack.ThreadPool({ size: CPUS });

// TODO: 样式的多线程编译
const HappyJSPlugin = () => new HappyPack({
  id: 'js',
  threadPool: happyThreadPool,
  loaders: [
    {
      loader: 'babel-loader',
      query: {
        // cacheDirectory有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
        cacheDirectory: true,
        compact: false,
      },
    },
  ],
});

// 第三方库
const VENDORS = {
  base: [
    'vue/dist/vue.esm.js',
    'vuex',
    'vue-router',
    'axios',
    'nprogress',
    'vue-head',
  ],
};
const DLLPath = DEBUG
  ? path.resolve('public', 'statics', 'dll')
  : path.resolve('public', 'statics', 'js');

const DLLPlugin = () => new webpack.DllPlugin({
  path: path.join(DLLPath, '[name].manifest.json'), // manifest.json 输出路径
  name: '[name]_library',
});

const VendorKeys = Object.keys(VENDORS);
const DLLReferencePlugin = () => VendorKeys.map((vendorKey) => {
  const manifestFile = path.join(DLLPath, `${vendorKey}.manifest.json`);
  return new webpack.DllReferencePlugin({ manifest: manifestFile });
});

// css-loader.query
// const CssLoaderQuery = {
//   sourceMap: true,
//   modules: true,
//   importLoaders: 2,
//   localIdentName: '[name]-[local]-[hash:base64:5]',
// };

// 静态资源在 cdn 的目录
const CDNRoot = 'irdb/';

module.exports = {
  DEBUG,
  VENDORS,
  DefinePlugin,
  // CssLoaderQuery,
  UglifyJsPlugin,
  HappyJSPlugin,
  DLLPath,
  DLLPlugin,
  DLLReferencePlugin,
  CDNRoot,
};
