const log = require('./log');
const config = require('../config');

const oneOfError = (name) => {
  const ErrorTypes = ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'];
  const found = ErrorTypes.find(type => type === name);
  return found;
};

module.exports = (app) => {
  app.use((err, req, res, next) => {
    if (err.message === config.CORS_ERR) {
      res.json({ ok: false, message: '不受信任的来源!' }); // cors 无效
    } else if (oneOfError(err.name)) {
      res.json({ ok: false, message: err.message });
    } else {
      next();
    }
  });
  /** 4xx / 5xx */
  app.use((req, res) => {
    const errorMessage = `http request(${req.method}-${req.originalUrl}) not found!`;
    log.error(errorMessage);
    res.json({ ok: false, message: errorMessage });
  });
};
