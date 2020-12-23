const Base = require('./base.js');

module.exports = class extends Base {
  //赛事公布列表
  async listAction(){
    let search = this.get('search');
    let list=await think.model('su_match_publish')
          .join('su_match on su_match_publish.match_id=su_match.id')
          .where({'su_match_publish.title|su_match.name':['like','%'+search+'%']})
          .field('su_match_publish.*,su_match.name match_name')
          .order('su_match_publish.id DESC')
          .page(this.get('page'))
          .countSelect();
    return this.success(list);
  }

  //添加
  async addAction(){
    let data=this.post();
    let res=await think.model('su_match_publish').add(data);
    if(res){
      return this.success(res);
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //删除
  async deleteAction(){
    let id=this.get('id');
    let res=await think.model('su_match_publish').where({'id':id}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }

  //修改
  async updateAction(){
    let data=this.post();
    let res=await think.model('su_match_publish').where({'id':data.id}).update(data);
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }
};
