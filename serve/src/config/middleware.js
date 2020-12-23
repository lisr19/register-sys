const path = require('path');
const isDev = think.env === 'development';
const cors = require('kcors');

module.exports = [
  {
		handle: cors,
		options: {
			origin: (ctx) => {
				return ctx.header.origin;
			},
			credentials: true,
			allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
		}
	},
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
