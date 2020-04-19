'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.post('/github/:repo',
    middleware.mapParams({ keys: ['repo'], forParams: true, block: true }),
    middleware.headerBlocker({ headers: ['X-Github-Event', 'X-GitHub-Delivery', 'X-Hub-Signature'], allow: true, every: true, msg: 'Allow-Github-Only' }),
    controller.deploy.index
  );
};
