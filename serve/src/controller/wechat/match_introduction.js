const Base = require('./base.js');

//小程序端对于赛事简介操作的接口
module.exports = class extends Base {
  //获取赛事简介
  async get_infoAction() {
    //找到已发布赛事的赛事名称
    let match_name = await think.model('match').where({'status':1}).field('name').find();
    if (think.isEmpty(match_name)) {
      return this.fail(100,'没有发布的赛事');
    }
    //根据赛事名称来找到赛事简介
    let res = await think.model('match_introduction').where({'match_name':match_name.name}).field('title,content').find();
    if (think.isEmpty(res)) {
      return this.fail(100,'该赛事没有简介');
    }
    return this.success(res);
  }
};
