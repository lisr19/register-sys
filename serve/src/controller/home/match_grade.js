const Base = require('./base.js');

module.exports = class extends Base {

  //成绩列表
  async listAction(){
    let search = this.get('search');
    let list=await think.model('su_match_grade')
        .join('su_match on su_match_grade.match_id=su_match.id')
        .join('su_match_regist on su_match_grade.regist_id=su_match_regist.id')
        .where({'su_match.name|su_match_regist.num_code':['like','%'+search+'%']})
        .field('su_match_grade.*,su_match.name macth_name,su_match_regist.num_code')
        .order('su_match_grade.grade DESC')
        .page(this.get('page'))
        .countSelect();
    return this.success(list);
  }

  //成绩详情
  async detailAction(){
    let id=this.get('id');
    //成绩
    let grade_info=await think.model('su_match_grade').where({'id':id}).find();
    if (think.isEmpty(grade_info)) {
      return this.fail(100,'没有相关的成绩信息');
    }
    //带队老师
    let teacher_info=await think.model('su_match_regist_teacher').where({'regist_id':grade_info.regist_id}).find();
    //学生
    let student_info=await think.model('su_match_regist_student').where({'regist_id':grade_info.regist_id}).select();
    grade_info.teacher_info=teacher_info;
    grade_info.student_info=student_info;
    return this.success(grade_info);
  }

  //添加成绩信息
  async addAction() {
    let data = this.post();
    let req=await think.model('su_match_grade').where({'match_id':data.match_id,'regist_id':data.regist_id}).find();
    if(!think.isEmpty(req)){
      return this.fail(100,'赛事队伍成绩已存在，请勿重复添加');
    };
    let res=await think.model('su_match_grade').add(data);
    if (res) {
      return this.success(res);
    }else{
      return this.fail(100,'添加失败');
    }
  }

  //根据赛事id和报名编号获取报名信息
  async regist_infoAction(){
    let match_id=this.get('match_id');
    let num_code=this.get('num_code');
    let regist_info=await think.model('su_match_regist').where({'match_id':match_id,'num_code':num_code}).find();
    if(think.isEmpty(regist_info)){
      return this.fail('没有相关的报名信息');
    }else{
      //带队老师
      let teacher_info=await think.model('su_match_regist_teacher').where({'regist_id':regist_info.id}).find();
      //学生
      let student_info=await think.model('su_match_regist_student').where({'regist_id':regist_info.id}).select();
      regist_info.teacher_info=teacher_info;
      regist_info.student_info=student_info;
      return this.success(regist_info);
    }
  }

  //删除成绩信息
  async deleteAction() {
    let id=this.get('id');
    let res = await think.model('su_match_grade').where({'id':id}).delete();
    if (!res) {
      return this.fail(100,'删除失败');
    }
    return this.success('删除成功');
  }

  //修改成绩信息
  async updateAction(){
    let data = this.post();
    //修改成绩信息
    let res = await think.model('su_match_grade').where({'id':data.id}).update({'grade':data.grade});
    if (res) {
      return this.success('修改成功');
    }else{
      return this.fail(100,'修改失败');
    }
  }
};
