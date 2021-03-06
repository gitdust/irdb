/**
 * 正确返回 { ok: true, data: '接口数据' }
 * 错误返回 { ok: false, message: '错误信息' }
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mdlCors = require('../modules/cors');

const apiRoutes = require('./api/routes');
const adminRoutes = require('./admin/routes');

module.exports = (app) => {
  const router = express.Router();

  router.use(bodyParser.json());
  mdlCors(router);

  router.use('/api', apiRoutes);
  router.use('/admin', adminRoutes);

  app.use(router);
};
