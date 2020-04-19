'use strict';
const USER_DATA = Symbol('Context#userData');
module.exports = {
  get userData() {
    if (this[USER_DATA]) return this[USER_DATA];
    return {};
  },
  set userData(value) {
    this[USER_DATA] = value;
  },
  async ok(data, msg) {
    this.body = {
      stat: 200,
      msg: msg || 'OK',
      data,
    };
  },
  async fail(msg, extraInfo) {
    this.body = {
      stat: -1,
      msg: msg || 'FAILED',
      data: null,
      extraInfo,
    };
  },
  async done(res, okMsg, errMsg) {
    if (res && res.state === this.constant.operate.OK && res.data) {
      this.ok(res.data, okMsg);
    } else if (res.state === this.constant.operate.FAIL) {
      this.fail('NETWORK_ERROR');
    } else {
      this.fail(errMsg);
    }
  },
  /**
   * 只检查数据库操作是否发生了错误，不检查数据是否为空
   * @param {Array | Object} res 数据库操作结果，可以是单个结果或者是一个数组
   * @return {Boolean} 返回检查后是否操作成功的结果
  */
  check(res) {
    if (Array.isArray(res)) {
      let flag = true;
      (res || []).forEach(item => {
        if (!(item && item.state === this.constant.operate.OK)) {
          flag = false;
          return;
        }
      });
      return flag;
    }
  },
};
