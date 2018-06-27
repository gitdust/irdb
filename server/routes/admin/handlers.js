const log = require('../../modules/log');
const Resource = require('../../db/models').ResourceAbstract;
const utils = require('../../utils');

let count = 0;

// 资源列表，翻页
exports.getResources = async (query, res) => {
  let records = null;
  const pageSize = Number(query.pageSize);
  const pageNo = Number(query.pageNo) - 1;
  const pattern = { name: { $regex: query.q, $options: 'i' } };
  // TODO: 只能向后翻页？
  try {
    count = await Resource.find(pattern).count().exec();
    records = await Resource.find(pattern).limit(pageSize).skip(pageSize * pageNo).exec();
    res.json({
      ok: true,
      data: {
        count,
        results: records,
      },
    });
  } catch (error) {
    log.error(error);
    res.json({ ok: false, message: error });
  }
};

// 新增/更新资源
exports.updateResource = async (data, res) => {
  try {
    const { _id, ...ret } = data;
    if (_id) {
      Resource.update({ _id }, { $set: { ...ret } }).exec();
    } else {
      const random = utils.random();
      const record = new Resource({ random, ...ret });
      record.save();
    }
    res.json({ ok: true });
  } catch (error) {
    log.error(error);
    res.json({ ok: false, message: error });
  }
};

exports.delResource = async (id, res) => {
  try {
    Resource.remove({ _id: id }).exec();
    res.json({ ok: true });
  } catch (error) {
    log.error(error);
    res.json({ ok: false, message: error });
  }
};
