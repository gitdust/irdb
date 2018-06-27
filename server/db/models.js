const mongoose = require('mongoose');

const { Schema } = mongoose;

// 资源 Schema
const ResourceSchema = new Schema({
  // 更新时间
  updatetime: Date,
  // 随机数
  random: Number,
  // 资源名字
  name: String,
  // 资源主页
  homepage: String,
  // 资源配图
  picture: String,
  // 资源描述
  describe: String,
  // 资源类型
  type: String, // ['电子书','图片','文献','语言','工具']
  // 是否需要翻墙访问
  vpn: Boolean,
}, {
  versionKey: false,
});

/**
 * 数据库中没有这个集合，数据库会自动创建这个集合存储数据，这个集合产生规则为：把Model名字字母全部变小写和在后面加复数s
 * versionKey：mongoose 会为文档增加一个 __v 字段，为 0 表示新创建
 */
exports.ResourceAbstract = mongoose.model('resources', ResourceSchema);
