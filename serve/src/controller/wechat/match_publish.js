const Base = require('./base.js');

//小程序端对于获奖公布操作的接口
module.exports = class extends Base {
  async infoAction() {
    let list=await think.model('su_match_publish').order('id DESC').select();
    return this.success(list);
  }
};
