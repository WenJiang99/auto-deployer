'use strict';
const operate = require('../constant/operate');
function checkResult(err, res) {
  if (err) return { state: operate.FAIL, data: null };
  return { state: operate.OK, data: res };
}
exports.checkResult = checkResult;
