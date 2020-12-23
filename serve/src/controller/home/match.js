const Base = require('./base.js');

module.exports = class extends Base {

  //获取赛事列表
  async listAction(){
	  let search = this.get('search');
    let data = await think.model('su_match')
          .where({'name|title':['like','%'+search+'%']})
          .page(this.get('page'))
          .countSelect()
	  return this.success(data);
  }

  //获取赛事详情
  async detailAction() {
    let id = this.get('id');
    let info = await think.model('su_match').where({'id':id}).find();
    return this.success(info);
  }

  //添加赛事
  async addAction(){
    let data=this.post();
    let res=await think.model('su_match').add(data);
    if(res){
      return this.success('添加成功');
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //删除赛事
  async deleteAction(){
    let id=this.get('id');
    let req=await think.model('su_match').where({'id':id}).delete();
    if(req){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }

  //修改赛事信息
  async updateAction(){
    let data=this.post();
    // console.log(data.status);
    if(data.status == 1){
      let info=await think.model('su_match').where({'id':['!=',data.id],'status':1}).find();
      if(!think.isEmpty(info)){
        return this.fail('只能启用一个赛事');
      }
    }
    let res=await think.model('su_match').where({'id':data.id}).update(data);    
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }

  //赛事下拉选择列表
  async idsAction(){
    let list=await think.model('su_match').field('id,name').select();  
    return this.success(list);
  }

};
