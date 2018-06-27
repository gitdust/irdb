const express = require('express');
const handlers = require('./handlers');
// const config = require('../config');
const log = require('../../modules/log');

const router = express.Router();

// /api
router.post('/', (req, res) => {
  const { type, pageNo, defaultMode } = req.body;
  handlers.getResources({ type, pageNo, defaultMode }, res);
});

// router.post('/', (req, res) => {
//   const data = req.body;
//   handlers.addResource(data, res);
// });

// /api/client
// 收集客户端报错，主要是手机浏览器的问题
router.get('/client', (req, res) => {
  log.info(req.query);
  res.json({ ok: true });
});

module.exports = router;
