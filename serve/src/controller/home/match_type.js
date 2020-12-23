const Base = require('./base.js');

module.exports = class extends Base {
  //类型列表
  async listAction(){
	  let search = this.get('search');
    let data = await think.model('su_match_type')
          .where({'name':['like','%'+search+'%']})
          .page(this.get('page'))
          .countSelect()
	  return this.success(data);
  }

  //类型删除
  async deleteAction(){
    let id =this.get('id');
    let req=await think.model('su_match').where({'type_id':id}).find();
    if(!think.isEmpty(req)){
      return this.fail(100,'有赛事绑定该赛事类型，删除失败');
    };
    let res=await think.model('su_match_type').where({'id':id}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }

  //类型添加
  async addAction(){
    let data=this.post();
    let res=await think.model('su_match_type').add(data);
    if(res){
      return this.success(res);
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //类型修改
  async updateAction(){
    let data=this.post();
    let res=await think.model('su_match_type').where({'id':data.id}).update(data);
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }

  //赛事类型下拉选择
  async idsAction(){
    let list=await think.model('su_match_type').field('id,name').select();  
    return this.success(list);
  }
};
