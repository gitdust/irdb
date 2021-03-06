const config = require('./config');
const express = require('express');
const history = require('connect-history-api-fallback');
const helmet = require('helmet');
const morganDebug = require('morgan-debug');

const app = express();

const routes = require('./routes/index');
const mdlError = require('./modules/error');
const mdlStatic = require('./modules/static');

app.disable('x-powered-by'); // 隐藏服务器类型
app.set('trust proxy'); // 允许反向代理
app.set('port', config.PORT);

app.use(helmet());
if (config.DEBUG) {
  app.use(morganDebug('irdb.request', ':method :url :status :res[content-length] - :response-time ms', { skip: req => req.method === 'OPTIONS' }));
}
if (!config.DEBUG) {
  // 线上才应用 HTML5 History API
  app.use(history({
    htmlAcceptHeaders: ['text/html'],
    rewrites: [
      { from: /\//, to: '/index.html' },
    ],
  }));
}

mdlStatic(app);
routes(app);
mdlError(app);

module.exports = app;
