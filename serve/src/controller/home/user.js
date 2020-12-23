const Base = require('./base.js');

module.exports = class extends Base {
  //获取微信用户列表
  async listAction() {
    let search = '%' + this.get('search') + '%';
    let list=await think.model('su_user')
            .where({'nickname':['like',search]})
            .page(this.get('page'))
            .countSelect();
    return this.success(list);
  }
};

