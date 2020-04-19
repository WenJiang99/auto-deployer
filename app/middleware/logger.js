'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const body = ctx.request.body;
    const query = ctx.request.query;
    const params = ctx.params;
    const headers = ctx.request.headers;
    ctx.logger.info(`params ==> ${JSON.stringify(params)}, body ==> ${JSON.stringify(body)}, query ==> ${JSON.stringify(query)}`);
    ctx.logger.info(`headers ==> ${JSON.stringify(headers)}`);
    await next();
  };
};
