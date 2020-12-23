const Base = require('./base.js');

//小程序端对于赛事成绩操作的接口
module.exports = class extends Base {
  //查询赛事成绩 
  async infoAction() {
    //获取传入的参数(post)：name，ID，phone
    let data = this.post();

    //查询相关信息
    let info = await think.model('su_match_regist_student')
          .join('su_match_regist_teacher on su_match_regist_teacher.regist_id = su_match_regist_student.regist_id')
          .join('su_match_regist on  su_match_regist_student.regist_id = su_match_regist.id')
          .where({'su_match_regist_student.name':data.name,'su_match_regist_student.IDcard_code':data.ID,'su_match_regist_teacher.phone':data.phone})
          .field('su_match_regist.id,su_match_regist_teacher.name teacher_name')
          .select();
    if (think.isEmpty(info)) {
      return this.fail(100,'没有相关信息');
    }else{
      for(var i in info){
        //获取赛事赛场信息
        let regist_info=await think.model('su_match_regist')
          .join('su_match on su_match_regist.match_id=su_match.id')
          .join('su_match_arena on su_match_regist.arena_id=su_match_arena.id')
          .where({'su_match_regist.id':info[i].id})
          .field('su_match.name match_name,su_match_arena.area,su_match.id match_id,su_match_arena.id arena_id')
          .find();
        info[i].regist_info=regist_info;
        //成绩
        let grade=await think.model('su_match_grade').where({'match_id':regist_info.match_id,'regist_id':info[i].id}).getField('grade',true);
        info[i].grade=grade;
        //得到赛区排名
        let rank1 = await think.model('su_match_grade')
              .join('su_match on su_match_grade.match_id = su_match.id')
              .join('su_match_arena on su_match.id = su_match_arena.match_id')
              .where({'su_match_arena.id':regist_info.arena_id})
              .order('grade DESC')
              .field('su_match_grade.*')
              .select();
          let a_rank;
          for(var j in rank1){
            if (rank1[j].regist_id == info[i].id) {
              a_rank = j+1;
              info[i].a_rank=a_rank;
              break;
            }
          };
          
          //得到全国排名
          let rank2 = await think.model('su_match_grade').where({'match_id':regist_info.match_id}).order('grade DESC').select();
          let n_rank;
          for(var j in rank2){
            if (rank2[j].regist_id == info[i].id) {
              n_rank = j+1;
              info[i].n_rank=n_rank;
              break;
            }
          };
      }
      return this.success(info);
    }
  }
};
