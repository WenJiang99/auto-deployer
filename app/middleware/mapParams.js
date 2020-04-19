'use strict';
/**
* 用于将用户请求时携带的参数都统一映射到 ctx.userData上
 * @param {Object} options 参数
 * @param {String[]} options.keys  用户需要上传的参数的key列表
 * @param {Boolean} options.forBody 参数是否通过ctx.request.body上传
 * @param {Boolean} options.forQuery  参数是否通过ctx.request.query上传
 * @param {Boolean} options.forParams  参数是否通过ctx.params上传
 * @param {Boolean} options.block  当用户请求中缺少了某些参数时是否要对请求进行拦截，默认为true
 */
module.exports = (options) => {
  return async (ctx, next) => {
    const keys = (options && options.keys) || [];
    const forBody = options && options.forBody;
    const forParam = options && options.forParams;
    const forQuery = options && options.forQuery;
    const block = options && options.block;
    const values = ctx.service.param.getParamsFromCtx({ keys, forParam, forBody, forQuery }) || [];
    let allExists = true;
    const needed = [];
    values.forEach((v, index) => {
      if (!v) {
        needed.push(keys[index]);
        allExists = false;
      } else {
        // 用户数据统一映射到ctx.userData 上
        ctx.userData = { ...ctx.userData, ...{ [keys[index]]: v } };
      }
    });
    if (block) {
      if (allExists) {
        await next();
      } else {
        ctx.fail('PARAM_NOT_FOUND', { needed });
      }
    } else {
      await next();
    }
  };
};
