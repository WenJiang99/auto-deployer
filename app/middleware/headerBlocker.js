'use strict';
/**
 * 在请求头中检测指定的header
 * @param {Object} options 中间件选项
 * @param {String[]} options.headers 要检测的header列表
 * @param {Boolean} options.allow 当指定header存在时候是 允许（true）或禁止（false）指定 此次请求
 * @param {Boolean} options.every 为true时，所有指定的header都存在是才算存在，为false时只要有一个存在则为存在
 * @param {String?} options.msg 禁止时候返回的msg
 */
module.exports = options => {
  const headers = options && options.headers || [];
  const allow = options && options.allow;
  const every = options && options.every;
  const msg = options && options.msg || '';
  return async function (ctx, next) {
    let exist;
    if (every) exist = headers.every(item => !!ctx.get(item));
    else exist = headers.some(item => !!ctx.get(item));

    if ((allow && !exist) || (!allow && exist)) ctx.fail(msg);
    else await next();
  };
};
