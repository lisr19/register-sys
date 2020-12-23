const Base = require('./base.js');

module.exports = class extends Base {
  async listAction(){
	  let search = this.get('search');
  	  let where= {'area':['like','%'+search+'%']}
	  let data = await think.model('match').where(where)
		  .page(this.get('page')).countSelect()
	  return this.success(data);
  }
  async get_infoAction(){
    let area=this.get('area');
    let info=await think.model('match').where({'area':area}).find();
    if(think.isEmpty(info)){
      return this.fail(100,'赛场不存在');
    }else{
      return this.success(info);
    }
  }
  async delete_infoAction(){
    let area =this.get('area');
    let res=await think.model('match').where({'area':area}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }
  async add_infoAction(){
    let data=this.post();
    console.log(data);
    let res=await think.model('match').where({'id':data.id}).add({'area':data.area});
    if(res){
      return this.success('添加成功');
    }else{
      return this.fail(100,'添加失败');
    }
  }
  async update_infoAction(){
    let data=this.post();
    console.log(data);
    let res=await think.model('match').where({'id':data.id}).update({'area':data.area});
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }
};
