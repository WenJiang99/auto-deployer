'use strict';

const Controller = require('egg').Controller;

class DeployController extends Controller {
  async index() {
    this.ctx.ok({ repo: this.ctx.params.repo });
  }
}

module.exports = DeployController;

