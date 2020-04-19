'use strict';
module.exports = options => {
  const headers = options && options.headers || [];
  const allow = options && options.allow;
  const every = options && options.every;
  const msg = options && options.msg || '';
  return async function (ctx, next) {
    const header = ctx.request.header;
    let exist;
    if (every) exist = headers.every(item => item in header);
    else exist = headers.some(item => item in header);

    if ((allow && !exist) || (!allow && exist)) ctx.fail(msg);
    else await next();
  };
};
