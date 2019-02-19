const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};
  exports.static = {
    maxAge: 60 * 60 * 24 // maxAge 缓存，默认 1 年
  };
  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };
  exports.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.ejs'),
    injectCss: true,
    injectJs: true,
  };
  return exports;
};
