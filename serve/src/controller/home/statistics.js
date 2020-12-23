const Base = require('./base.js');

module.exports = class extends Base {
  //获取微信用户列表
  async statisticsAction() {
    let res = new Object;
    let concerned = await think.model('su_user').count();
    let regist = await think.model('su_match_regist').count();
    let match = await think.model('su_match').count();
    let arena = await think.model('su_match_arena').count();
    let type = await think.model('su_match_type').field('id,name').select();
    let match_type = await think.model('su_match').field('type_id').select();
    for (var i in type)
        type[i].count = 0;
    for (var i in match_type) {
        for (var j in match_type[i].type_id) {
            for (var k in type) {
                if (match_type[i].type_id[j] == type[k].id) {
                    type[k].count++;
                    break;
                }   
            }
        }
    }
    res.concerned_num = concerned;
    res.regist_num = regist;
    res.match_num = match;
    res.arena_num = arena;
    res.type_info = type;
    return this.success(res);
  }
};