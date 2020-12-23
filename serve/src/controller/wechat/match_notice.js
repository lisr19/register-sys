const Base = require('./base.js');

//小程序端对于赛事通知操作的接口
module.exports = class extends Base {
  //获取赛事通知
  async infoAction() {
    let list=await think.model('su_match_notice')
          .join('su_match on su_match_notice.match_id=su_match.id')
          .where({'su_match.status':1,'su_match_notice.status':1})
          .field('su_match_notice.*')
          .order('su_match_notice.id DESC')
          .select();
    return this.success(list);
  }
};
