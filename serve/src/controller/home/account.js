const Base = require('./base.js');

module.exports = class extends Base {
  //添加管理员
  async addAction() {
    let data = this.post();
    let password = think.md5(data.password);
    let valid = await think.model('su_account').where({'account':data.account}).find();
    if (!think.isEmpty(valid)) {
      return this.fail(100,'账户名已存在');
    }
    let res = await think.model('su_account').add({'account':data.account,'password':password});
    if (!res) {
      return this.fail(100,'添加失败');
    }
    return this.success(res);
  }

  //删除管理员
  async deleteAction() {
    let id = this.get('id');
    if(id==1){
      return this.fail(100,'超级管理员不能删除');
    };
    let res = await think.model('su_account').where({'id':id}).delete();
    if (res) {
      return this.success('删除成功');
    }
    return this.fail(100,'删除失败');
  }

  //获取管理员列表
  async listAction() {
    let search = '%' + this.get('search') + '%';
    let list=await think.model('su_account')
            .where({'account':['like',search],'id':['!=',1]})
            .page(this.get('page'))
            .countSelect();
    return this.success(list)
  }

  //修改密码
  async update_passwordAction() {
    let data = this.post();
    let password = think.md5(data.password);
    if (data.id == 1) {
      return this.fail(100,'超级管理员密码无法修改');
    }
    let res = await think.model('su_account').where({'id':data.id}).update({'password':password});
    if(res){
      return this.success('修改成功');
    }
    return this.fail(100,'修改失败');
  }
  
};
