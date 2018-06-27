const express = require('express');
const handlers = require('./handlers');
const config = require('../../config');
// const log = require('../modules/log');

const router = express.Router();

router.use('/', (req, res, next) => {
  const TOKEN = req.body.token || req.query.token;
  if (config.TOKEN !== TOKEN) {
    res.json({ ok: false, message: '无权限' });
  } else {
    next();
  }
});

// /admin
router.get('/', (req, res) => {
  const { pageSize, pageNo, q } = req.query;
  handlers.getResources({ pageSize, pageNo, q }, res);
});
router.post('/', (req, res) => {
  const { token, ...ret } = req.body;
  handlers.updateResource(ret, res);
});
router.delete('/', (req, res) => {
  const { id } = req.body;
  handlers.delResource(id, res);
});

module.exports = router;

