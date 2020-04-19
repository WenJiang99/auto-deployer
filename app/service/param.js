'use strict';

const Service = require('egg').Service;

class ParamsService extends Service {
  /**
  * 用于在 ctx 指定属性上获取指定的参数
   * @param {Object} options 参数
   * @param {String[]} options.key  用户需要上传的参数的key
   * @param {Boolean} options.forBody 参数是否通过ctx.request.body上传
   * @param {Boolean} options.forQuery  参数是否通过ctx.request.query上传
   * @param {Boolean} options.forParams  参数是否通过ctx.params上传
   */
  getParamFromCtx(options) {
    const key = options && options.key;
    const forBody = options && options.forBody;
    const forQuery = options && options.forQuery;
    const forParam = options && options.forParam;
    const value = forBody
      ? this.ctx.request.body[key]
      : forQuery
        ? this.ctx.request.query[key]
        : forParam
          ? this.ctx.params[key]
          : this.ctx.userData[key];
    return value;

  }
  /**
  * 用于在 ctx 指定属性上获取指定的参数
   * @param {Object} options 参数
   * @param {String[]} options.keys  用户需要上传的参数的key列表
   * @param {Boolean} options.forBody 参数是否通过ctx.request.body上传
   * @param {Boolean} options.forQuery  参数是否通过ctx.request.query上传
   * @param {Boolean} options.forParams  参数是否通过ctx.params上传
   */
  getParamsFromCtx(options) {
    const keys = options && options.keys;
    const forBody = options && options.forBody;
    const forQuery = options && options.forQuery;
    const forParam = options && options.forParam;
    const values = (keys || []).map(key => this.getParamFromCtx({ key, forBody, forQuery, forParam }));
    return values;
  }
}

module.exports = ParamsService;
