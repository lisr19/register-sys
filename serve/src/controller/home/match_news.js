const Base = require('./base.js');

module.exports = class extends Base {

  //赛事动态列表
  async listAction(){
    let search = this.get('search');
    let list=await think.model('su_match_news')
          .join('su_match on su_match_news.match_id=su_match.id')
          .where({'su_match_news.title|su_match.name':['like','%'+search+'%']})
          .field('su_match_news.*,su_match.name match_name')
          .order('su_match_news.id DESC')
          .page(this.get('page'))
          .countSelect();
	  return this.success(list);
  }

  //添加
  async addAction(){
    let data=this.post();
    let res=await think.model('su_match_news').add(data);
    if(res){
      return this.success(res);
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //删除
  async deleteAction(){
    let id=this.get('id');
    let res=await think.model('su_match_news').where({'id':id}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败');
    }
  }

  //修改
  async updateAction(){
    let data=this.post();
    let res=await think.model('su_match_news').where({'id':data.id}).update(data);
    if(res){
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }

};
