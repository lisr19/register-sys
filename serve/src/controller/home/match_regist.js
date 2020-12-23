const Base = require('./base.js');

module.exports = class extends Base {
  //报名列表
  async listAction(){
    let search = this.get('search');
    let regist_list=await think.model('su_match_regist')
          .join('su_match on su_match_regist.match_id=su_match.id')
          .where({'su_match_regist.num_code|su_match_regist.unit_name|su_match.name':['like','%'+search+'%']})
          .field('su_match_regist.*,su_match.name match_name')
          .order('id DESC')
          .page(this.get('page'))
          .countSelect();
    let data=regist_list.data;
    for(var i in data){
      let teacher_name=await think.model('su_match_regist_teacher').where({'regist_id':data[i].id}).getField('name',true);
      data[i].teacher_name=teacher_name;
      let student_list=await think.model('su_match_regist_student').where({'regist_id':data[i].id}).getField('name');
      data[i].student_name=student_list.join();
    };
    regist_list.data=data;
    return this.success(regist_list);
  }

  //报名列表导出
  async exportAction(){
    let search = this.get('search');
    let regist_list=await think.model('su_match_regist')
          .join('su_match on su_match_regist.match_id=su_match.id')
          .where({'su_match_regist.num_code|su_match_regist.unit_name|su_match.name':['like','%'+search+'%']})
          .field('su_match_regist.*,su_match.name match_name')
          .select();
    for(var i in regist_list){
      let teacher_name=await think.model('su_match_regist_teacher').where({'regist_id':regist_list[i].id}).getField('name',true);
      regist_list[i].teacher_name=teacher_name;
      let student_list=await think.model('su_match_regist_student').where({'regist_id':regist_list[i].id}).getField('name');
      regist_list[i].student_name=student_list.join();
    };
    return this.success(regist_list);
  }

  //报名详情
  async detailAction(){
    let id=this.get('id');
    let regist_info=await think.model('su_match_regist').where({'su_match_regist.id':id})
                    .join('su_match on su_match_regist.match_id=su_match.id')
                    .field('su_match_regist.*,su_match.name match_name')
                    .find();
    let student_list=await think.model('su_match_regist_student').where({'regist_id':id}).select();
    let teacher_list=await think.model('su_match_regist_teacher').where({'regist_id':id}).find();
    for(var i in student_list){
      student_list[i].studentIdCardImg=[student_list[i].IDcard_img1,student_list[i].IDcard_img2];
     
    }
    teacher_list.teacherIdCardImg=[teacher_list.IDcard_img1,teacher_list.IDcard_img2];
   
    let data={
      regist_info:regist_info,
      student_list:student_list,
      teacher_list:teacher_list,

    };
    return this.success(data);
  }

  //添加报名信息
  async addAction(){
    let data= this.post();
    let num_code=Date.now();
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
      let info={
        id:reg,
        num_code:num_code
      };
      return this.success(info);
    }else{
      return this.fail(100,'添加失败')
    }
  }

  //修改信息
  async updateAction(){

    let data= this.post();
    
    let stu_res=JSON.parse(data.student_info);
     for(var i in stu_res){
      stu_res[i].IDcard_img1 = stu_res[i].studentIdCardImg[0]
      stu_res[i].IDcard_img2 = stu_res[i].studentIdCardImg[1]
      stu_res[i].regist_id=data.id;
       //删除一些元素，使其数组中的元素一致
       delete stu_res[i].id;
       delete stu_res[i].add_time;
       delete stu_res[i].update_time;
       delete stu_res[i].studentIdCardImg
      
       console.log(stu_res[i])
      
     };
     let tea_res=JSON.parse(data.teacher_info);
     for(var i in tea_res){
      
      tea_res[i].IDcard_img1 = tea_res[i].teacherIdCardImg[0]
      tea_res[i].IDcard_img2 = tea_res[i].teacherIdCardImg[1]
      tea_res.regist_id=data.id;
      delete tea_res[i].teacherIdCardImg
      
      console.log(tea_res[i])
     };
  
   

    //一定要保证n个在一次连接中进行
    const updateReg = this.ctx.model('su_match_regist');
    const deleteStudent = this.ctx.model('su_match_regist_student').db(updateReg.db());
    const deleteTeacher = this.ctx.model('su_match_regist_teacher').db(updateReg.db());
    const addStudent = this.ctx.model('su_match_regist_student').db(updateReg.db());
    const addTeacher = this.ctx.model('su_match_regist_teacher').db(updateReg.db());

    //开启事务
    await updateReg.transaction(async () =>{
      //捕捉异常
      try{
        let reg = await updateReg.where({'id':data.id}).update({'unit_name':data.unit_name,'match_id':data.match_id,'arena_id':data.arena_id,'type_id':data.type_id});
        if (think.isEmpty(reg)) {
          throw "没有相关报名信息";
        }
        //重新删除在添加
    await deleteStudent.where({'regist_id':data.id}).delete();
    await deleteTeacher.where({'regist_id':data.id}).delete();
     //添加学生信息
     
     let addStudentReg =  await addStudent.addMany(stu_res);
     //添加老师信息
     
     let addTeacherReg = await addTeacher.addMany(tea_res);
     if(!addTeacherReg){
      throw "修改老师信息错误"
    }
     return this.success('修改成功');
      }
      catch(e){//出错就rollback
         console.log(e);
         await updateReg.rollback();
         return this.fail(e)
      }
    })


    // 'regist_id':stu_res.regist_id,'name':stu_res.name,'area':stu_res.area,
    // 'school_name':stu_res.school_name,'avator':stu_res.avator,'IDcard_code':stu_res.IDcard_code,
    // 'IDcard_img1':stu_res.IDcard_img1,'IDcard_img2':stu_res.IDcard_img2

    // let reg= await think.model('su_match_regist')
    //         .where({'id':data.id})
    //         .update({'unit_name':data.unit_name,'match_id':data.match_id,'arena_id':data.arena_id,'type_id':data.type_id});
    // if (think.isEmpty(reg)) {
    //   return this.fail(100,'没有相关报名信息');
    // }
    // //重新删除在添加
    // await think.model('su_match_regist_student').where({'regist_id':data.id}).delete();
    // await think.model('su_match_regist_teacher').where({'regist_id':data.id}).delete();
    //添加学生信息
    // let stu_res=JSON.parse(data.student_info);
    // for(var i in stu_res){
    //   stu_res[i].regist_id=data.id;
    //   //删除一些元素，使其数组中的元素一致
    //   delete stu_res[i].id;
    //   delete stu_res[i].add_time;
    //   delete stu_res[i].update_time;
    //   console.log(stu_res[i]);

    // };
 
    // let stu=await think.model('su_match_regist_student').addMany(stu_res);
    // //添加老师信息
    // let tea_res=JSON.parse(data.teacher_info);
    // for(var i in tea_res){
    //   tea_res.regist_id=data.id;
    // };
    // let tea=await think.model('su_match_regist_teacher').addMany(tea_res);
    // return this.success('修改成功');
  }

  //删除报名
  async deleteAction(){
    let id=this.get('id');
    //删除学生
    await think.model('su_match_regist_student').where({'regist_id':id}).delete();
    //删除老师
    await think.model('su_match_regist_teacher').where({'regist_id':id}).delete();
    let res=await think.model('su_match_regist').where({'id':id}).delete();
    if(res){
      return this.success('删除成功');
    }else{
      return this.fail(100,'删除失败')
    }
  }

  //根据赛事id获取赛场和赛事类型下拉选择
  async arena_idsAction(){
    let match_id=this.get('match_id');
    let res = await think.model('su_match').where({'id':match_id}).find();
    let type_list=await think.model('su_match_type').where({'id':['IN',res.type_id]}).select();
    let list=await think.model('su_match_arena').where({'match_id':match_id}).select();
    let data={
      type_list:type_list,
      arena_list:list
    }
    console.log(data)
    return this.success(data);
  }
}



    
    

  
    


