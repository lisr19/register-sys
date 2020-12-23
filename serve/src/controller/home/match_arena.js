const Base = require('./base.js');

module.exports = class extends Base {

  //赛场列表
  async listAction(){
	  let search = this.get('search');
    let list= await think.model('su_match_arena')
          .join('su_match on su_match_arena.match_id=su_match.id')
          .where({'su_match.name|su_match_arena.area|su_match_arena.address':['like','%'+search+'%']})
          .field('su_match_arena.*,su_match.name match_name')
          .page(this.get('page'))
          .countSelect();
	  return this.success(list);
  }

  //赛场删除
  async deleteAction(){
    let id =this.get('id');
    let res=await think.model('su_match_arena').where({'id':id}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }

  //赛场添加
  async addAction(){
    let data=this.post();
    let res=await think.model('su_match_arena').add(data);
    if(res){
      return this.success(res);
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //赛场修改
  async updateAction(){
    let data=this.post();
    let res=await think.model('su_match_arena').where({'id':data.id}).update(data);
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }
};
