const log = require('../../modules/log');
const Resource = require('../../db/models').ResourceAbstract;
const utils = require('../../utils');

let COUNT = 0;

// 首页列表
exports.getResources = async (body, res) => {
  let records = [];
  const pageNo = body.pageNo - 1;
  const pageSize = 7;
  const pattern = { type: body.type };
  // utils.sleep(2);
  try {
    if (body.defaultMode) {
      // 首次获取数据
      COUNT = await Resource.find().count().exec();
      records = await Resource.find()
        .sort({ updatetime: -1 })
        .limit(pageSize)
        .skip(pageSize * pageNo)
        .exec();
    } else {
      // TODO: await 优化
      COUNT = await Resource.find(pattern).count().exec();
      records = await Resource.find(pattern).limit(pageSize).skip(pageSize * pageNo).exec();
    }
    res.json({
      ok: true,
      data: {
        count: COUNT,
        results: records,
      },
    });
  } catch (error) {
    log.error(error);
    res.json({ ok: false, message: error });
  }
};

// 新增资源
exports.addResource = async (data, res) => {
  try {
    // const { name } = data;
    // const found = Resource.find({ name });
    // if (found) {
    //   res.json({ ok: false, message: `${name}已经存在` });
    // } else {
    const random = utils.random();
    const updatetime = new Date();
    const record = new Resource({ random, updatetime, ...data });
    record.save();
    res.json({ ok: true });
    // }
  } catch (error) {
    log.error(error);
    res.json({ ok: false, message: error });
  }
};
