const Base = require('./base.js');

module.exports = class extends Base {
  //获取赛事简介
  async infoAction() {
    let res = await think.model('su_match').where({'status':1}).find();
    return this.success(res);
  }
};
