const Base = require('./base.js');

//小程序端对于报名信息操作的接口
module.exports = class extends Base {
  
  //添加报名信息
  async addAction() {
    let data = this.post();
    let num_code=Date.now();
    // console.log(data);
    //添加match_regist表相关信息：参赛编号、参赛单位、match_id
    let reg= await think.model('su_match_regist').add({'num_code':num_code,'unit_name':data.unit_name,'match_id':data.match_id,'arena_id':data.arena_id,'type_id':data.type_id});
    // console.log(reg);  
    //添加学生信息
    let stu_res=JSON.parse(data.student_info);
    for(var i in stu_res){
      stu_res[i].regist_id=reg;
    };
    let stu=await think.model('su_match_regist_student').addMany(stu_res);
    //添加老师信息
    let tea_res=JSON.parse(data.teacher_info);
    for(var i in tea_res){
      tea_res[i].regist_id=reg;
    };
    let tea=await think.model('su_match_regist_teacher').addMany(tea_res);
    if(reg&&stu&&tea){
      return this.success(num_code);
    }else{
      return this.fail(100,'添加失败')
    }
  }

  //查询报名信息
  async infoAction() {
    //获取传入的参数(post):选手姓名、选手身份证、指导老师电话
    let data = this.post();
    
    //查询相关信息
    let info = await think.model('su_match_regist_student')
          .join('su_match_regist on su_match_regist.id = su_match_regist_student.regist_id')
          .join('su_match_regist_teacher on su_match_regist_teacher.regist_id = su_match_regist.id')
          .where({'su_match_regist_student.name':data.name,'su_match_regist_student.IDcard_code':data.ID,'su_match_regist_teacher.phone':data.phone})
          .field('su_match_regist.id')
          .select();
    if (think.isEmpty(info)) {
      return this.fail(100,'无相关信息');
    }else{
      let list=[];
      for(var i in info){
        //获取赛事赛场信息
        let regist_info=await think.model('su_match_regist')
          .join('su_match on su_match_regist.match_id=su_match.id')
          .join('su_match_arena on su_match_regist.arena_id=su_match_arena.id')
          .where({'su_match_regist.id':info[i].id})
          .field('su_match.name match_name,su_match_arena.area,su_match_arena.address')
          .find();
        //选手
        let student_list=await think.model('su_match_regist_student').where({'regist_id':info[i].id}).select();
        //老师
        let teacher_list=await think.model('su_match_regist_teacher').where({'regist_id':info[i].id}).find();
        let info_index={
          regist_info:regist_info,
          student_list:student_list,
          teacher_list:teacher_list
        }; 
        list.push(info_index);
      }
      return this.success(list);
    }
  }

  //获取赛事信息和赛场下拉列表
  async match_arenaAction(){
    let res = await think.model('su_match').where({'status':1}).find();
    let type_list=await think.model('su_match_type').where({'id':['IN',res.type_id]}).select();
    let list=await think.model('su_match_arena').where({'match_id':res.id}).select();
    let data={
      match_id:res.id,
      match_name:res.name,
      arena_list:list,
      type_list:type_list
    }
    return this.success(data);
  }
};
