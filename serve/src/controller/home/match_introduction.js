const Base = require('./base.js');

//PC端对于赛事简介的操作
module.exports = class extends Base {
  //获取赛事简介列表
  
  async listAction(){
	  let search = this.get('search');
  	  let where= {'id|match_name|valid_time|status|title|content':['like','%'+search+'%']}
	  let data = await think.model('match_introduction').where(where)
		  .page(this.get('page')).countSelect()
	  return this.success(data);
  }

  //根据ID进行查询

  async introduction_ID_infoAction() {
    let id = this.get('id');
    let info = await think.model('match_introduction').where({'id':id}).find();
    if (think.isEmpty(info)) {
      return this.fail(100,'该赛事没有简介');
    }
    return this.success(info);
  }
  //根据名字进行查询
  async introcdution_name_infoAction() {
    let name = this.get('match_name');
    let info = await think.model('match_introduction').where({'match_name':name}).find();
    if (think.isEmpty(info)) {
      return this.fail(100,'该赛事没有简介');
    }
    return this.success(info);
  }
  //添加相关信息
  async add_infoAction(){
    let data=this.post();
    //添加赛事简介的标题有效时间和文本内容
    let res=await think.model('match_introduction')
              .join('match_type')
              .join('match')
              .add({'match_introduction.id':data.id,'match_introduction.match_name':data.match_name,
                    'match_introduction.valid_time':data.valid_time,'match_introduction.status':data.status,
                    'match_introduction.title':data.title,'match_introduction.content':data.content,
                    'match_introduction.release_time':data.release_time,
                    'match_type.id':data.id,
                    'match.id':data.id});
              
        if(res){
      return this.success('添加成功');
        }
    else{
      return this.fail(100,'添加失败');
        }
    }
    //删除相关信息
    async delete_infoAction(){
        let id=this.get('id');
        let info1=await think.model('match_introduction').where({'match_introduction.id':id}).delete();
        let info2=await think.model('match_type').where({'match_type.id':id}).delete();
        if(info1&&info2){
          return this.success('删除成功');
        }else{
          return this.fail(100,'删除失败');
        }
      }
      //修改相关信息
      async update_infoAction(){
        let data=this.post();
        console.log(data);
        let res=await think.model('match_introduction')
        .join('match_type')
        .join('match')
        .update({'match_introduction.id':data.id,'match_introduction.match_name':data.match_name,
              'match_introduction.valid_time':data.valid_time,'match_introduction.status':data.status,
              'match_introduction.title':data.title,'match_introduction.content':data.content,
              'match_introduction.release_time':data.release_time,
              'match_type.id':data.id,
              'match.id':data.id});       
         if(res){
          return this.success('修改成功');
        }else{
          return this.fail(100,'修改失败');
        }
      }

};
