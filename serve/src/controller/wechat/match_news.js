const Base = require('./base.js');

module.exports = class extends Base {
  //赛事动态
  async infoAction() {
    let list=await think.model('su_match_news')
          .join('su_match on su_match_news.match_id=su_match.id')
          .where({'su_match.status':1,'su_match_news.status':1})
          .field('su_match_news.*')
          .order('su_match_news.id DESC')
          .select();
    return this.success(list);
  }
};
