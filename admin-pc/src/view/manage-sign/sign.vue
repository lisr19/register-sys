<template>
  <div>
    <!--按钮部分-->
    <Card>
      <p slot="title">报名列表</p>
      <Row>
        <Col span="4">
          <Button
            type="primary"
            @click="openAddModal"
            style="margin-right: 20px"
            >新增
          </Button>
          <!--<Button type="error" ghost @click="">批量删除</Button>-->
        </Col>
        <Col span="4" offset="16">
          <Input
            clearable
            v-model="searchByName"
            @on-change="handleSearchByName"
            placeholder="输入关键字搜索"
          >
            <Icon type="ios-search" slot="suffix" />
          </Input>
        </Col>
      </Row>
    </Card>
    <!--表格部分-->
    <Card style="margin-top: 15px">
      <div>
        <Table :columns="columns" :data="tableData" border></Table>
      </div>
      <div class="" style="margin: 10px; overflow: hidden">
        <div style="float: right">
          <Page
            show-total
            show-elevator
            :total="page.total"
            :current="page.currentPage"
            @on-change="handlePageTurn"
          ></Page>
        </div>
      </div>
    </Card>

    <!--添加Modal-->
    <Modal
      v-model="isAdd"
      :mask-closable="false"
      :closable="false"
      title="添加："
      width="800"
    >
      <Form :model="addForm" ref="addForm" :rules="addRules" :label-width="130">
        <Card style="height: 600px; overflow: auto">
          <FormItem label="赛事名称：" prop="match_id">
            <Select
              v-model="addForm.match_id"
              style="width: 200px"
              @on-select="getTypeAndArea"
            >
              <Option
                v-for="(option, index) in matchList"
                :value="option.id"
                :key="index"
                >{{ option.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="赛事类型：" prop="type_id">
            <Select v-model="addForm.type_id" style="width: 200px">
              <Option
                v-for="(item, index) in typeList"
                :value="item.id"
                :key="index"
                >{{ item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="赛场：" prop="arena_id">
            <Select v-model="addForm.arena_id" style="width: 200px">
              <Option
                v-for="(item, index) in areaList"
                :value="item.id"
                :key="index"
                >{{ item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="参赛单位：" prop="unit_name">
            <Input
              clearable
              v-model="addForm.unit_name"
              placeholder="请填写参赛单位"
            />
          </FormItem>
          <FormItem label="指导老师姓名：" prop="teacher_name">
            <Input
              clearable
              v-model="addForm.teacher_name"
              placeholder="请填写指导老师姓名"
            />
          </FormItem>
          <FormItem label="指导老师手机号码：" prop="teacher_phone">
            <Input
              type="number"
              clearable
              v-model="addForm.teacher_phone"
              placeholder="请填写指导老师手机号码"
            />
          </FormItem>
          <FormItem label="指导老师身份证：" prop="teacher_IDcard_code">
            <Input
              clearable
              v-model="addForm.teacher_IDcard_code"
              placeholder="请填写指导老师身份证"
            />
          </FormItem>
          <FormItem label="身份证正反面：" prop="teacherImgs">
            <img-upload-more
              v-model="addForm.teacherImgs"
              @imgUpload="getUploadImg"
              @delImg="delUploadImg"
            ></img-upload-more>
            <!--<img-upload-more ref="imgTeacherFront" @imgUpload="getTeacherFront"></img-upload-more>-->
          </FormItem>
          <!--参赛学生model-->
          <Card
            v-for="(item, index) in addForm.addStudentList"
            :key="index"
            style="margin-top: 20px"
          >
            <FormItem
              label="选手姓名："
              :prop="'addStudentList.' + index + '.name'"
              :rules="{ required: true, message: '选手姓名不能为空' }"
            >
              <Input
                clearable
                v-model="item.name"
                placeholder="请填写选手姓名"
              />
            </FormItem>
            <FormItem label="选手地区：" prop="area">
              <v-distpicker @selected="onSelected"></v-distpicker>
            </FormItem>
            <FormItem
              label="选手所在学校："
              :prop="'addStudentList.' + index + '.school_name'"
              :rules="{ required: true, message: '选手所在学校不能为空' }"
            >
              <Input
                clearable
                v-model="item.school_name"
                placeholder="请填写选手所在学校"
              />
            </FormItem>
            <FormItem label="选手照片：">
              <img-upload ref="imgUpload" @imgUpload="getAvator"></img-upload>
            </FormItem>
            <FormItem
              label="选手身份证："
              :prop="'addStudentList.' + index + '.IDcard_code'"
              :rules="{
                type: 'string',
                max: 18,
                min: 18,
                pattern: /^\d{6}(1[8-9]|[2-9][0-9])\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
                required: true,
                message: '请填写正确的选手身份证',
              }"
            >
              <Input
                clearable
                v-model="item.IDcard_code"
                placeholder="请填写选手身份证"
              />
            </FormItem>
            <FormItem label="选手身份证正反面：">
              <img-upload-more
                :currentIndex="index"
                @imgUpload="getUploadImg2"
                @delImg="delUploadImg2"
              ></img-upload-more>
            </FormItem>
            <Button @click="handleRemove(index)" icon="md-remove"
              >取消选手
            </Button>
          </Card>

          <Button
            style="margin-top: 20px"
            type="primary"
            @click="handleAdd"
            icon="md-add"
            >新增选手
          </Button>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelAddModal">取消</Button>
        <Button type="primary" @click="addList">确认</Button>
      </div>
    </Modal>

    <!--编辑Modal-->
    <Modal
      v-model="isEdit"
      :mask-closable="false"
      :closable="false"
      title="编辑："
      width="600"
    >
      <Form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        :label-width="130"
      >
        <Card style="height: 600px; overflow: auto">
          <FormItem label="赛事名称：" prop="match_id">
            <Select
              v-model="editForm.match_id"
              style="width: 200px"
              @on-select="getTypeAndArea"
            >
              <Option
                v-for="(option, index) in matchList"
                :value="option.id"
                :key="index"
                >{{ option.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="赛事类型" prop="type_id">
            <Select v-model="editForm.type_id" style="width: 200px">
              <Option
                v-for="(item, index) in typeList"
                :value="item.id"
                :key="index"
                >{{ item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="赛场" prop="arena_id">
            <Select v-model="editForm.arena_id" style="width: 200px">
              <Option
                v-for="(item, index) in areaList"
                :value="item.id"
                :key="index"
                >{{ item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="参赛单位：" prop="unit_name">
            <Input
              clearable
              v-model="editForm.unit_name"
              placeholder="请填写参赛单位"
            />
          </FormItem>
          <FormItem label="指导老师姓名：" prop="name">
            <Input
              clearable
              v-model="editTeacherList.name"
              placeholder="请填写指导老师姓名"
            />
          </FormItem>
          <FormItem label="指导老师身份证：" prop="IDcard_code" >
            <Input
              clearable
              v-model="editTeacherList.IDcard_code"
              placeholder="请填写指导老师身份证"
            />
          </FormItem>
          <FormItem label="身份证正反面：" prop="IDcard_img">
            <img-upload-more
              ref="teacherIdCardImg"
              @imgUpload="getUploadImgForTeacher"
              @delImg="delUploadImgForTeacher"
            ></img-upload-more>
            <!-- <img
								:src="editTeacherList.IDcard_img1"
								width="50px"
								height="50px"
						/>
						<img
								:src="editTeacherList.IDcard_img1"
								width="50px"
								height="50px"
						/> -->
          </FormItem>
          <FormItem label="指导老师手机号码：" prop="phone">
            <Input
              type="number"
              clearable
              v-model="editTeacherList.phone"
              placeholder="请填写指导老师手机号码"
            />
          </FormItem>
          <Card
            v-for="(item, index) in editStudentList"
            :key="index"
            style="margin-top: 20px"
          >
            <FormItem label="选手姓名：">
              <Input
                clearable
                v-model="item.name"
                placeholder="请填写选手姓名"
              />
            </FormItem>
            <FormItem label="选手地区：" prop="area">
              <v-distpicker @selected="onSelected1"></v-distpicker>
            </FormItem>
            <FormItem label="选手所在学校：">
              <Input
                clearable
                v-model="item.school_name"
                placeholder="请填写选手所在学校"
              />
            </FormItem>

            <FormItem label="选手身份证：">
              <Input
                clearable
                v-model="item.IDcard_code"
                placeholder="请填写选手身份证"
              />
            </FormItem>
            <FormItem label="选手照片：" prop="avator ">
              <img-upload
                :ref="`img${item.id}`"
                @imgUpload="getAvator1"
                :currentIndex="index"
              ></img-upload>
            </FormItem>
            <FormItem label="选手身份证正反面：">
              <img-upload-more
                :ref="`img1${item.id}`"
                @imgUpload="getUploadImgForStudnet"
                :currentIndex="index"
                @delImg="delUploadImg3"
              ></img-upload-more>

              <!-- <img :src="item.IDcard_img1" width="50px" height="50px"/>
							<img :src="item.IDcard_img1" width="50px" height="50px"/> -->
            </FormItem>
            <Button @click="handleRemoveForEdit(index)" icon="md-remove"
              >取消选手
            </Button>
          </Card>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAdd1" icon="md-add"
                  >新增选手</Button
                >
              </Col>
            </Row>
          </FormItem>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelEditModal">取消</Button>
        <Button type="primary" @click="editList">确认</Button>
      </div>
    </Modal>
    <!--详情Modal-->
    <Modal
      v-model="isDetail"
      :mask-closable="false"
      :closable="false"
      title="详情信息："
      width="600"
    >
      <Card style="height: 600px; overflow: auto">
        <div class="data-show">
          <div class="data-show-item">
            指导老师姓名：<span>{{ teacherList.name }}</span>
          </div>
        </div>
        <div class="data-show">
          <div class="data-show-item">
            指导老师身份证：<span>{{ teacherList.IDcard_code }}</span>
          </div>
        </div>
        <div class="data-show">
          <div class="data-show-item">
            身份证正反面：
            <img :src="teacherList.IDcard_img1" width="50px" height="50px" />
            <img :src="teacherList.IDcard_img2" width="50px" height="50px" />
          </div>
        </div>
        <div class="data-show">
          <div class="data-show-item">
            指导老师手机号码：<span>{{ teacherList.phone }}</span>
          </div>
        </div>
        <div v-for="(item, index) in studentList" :key="index">
          <div class="data-show">
            <div class="data-show-item">
              选手姓名：<span>{{ item.name }}</span>
            </div>
          </div>
          <div class="data-show">
            <div class="data-show-item">
              选手所在地区：<span>{{ item.area }}</span>
            </div>
          </div>
          <div class="data-show">
            <div class="data-show-item">
              选手所在学校：<span>{{ item.school_name }}</span>
            </div>
          </div>
          <div class="data-show">
            <div class="data-show-item">
              选手照片：<img :src="item.avator" width="50px" height="50px" />
            </div>
          </div>
          <div class="data-show">
            <div class="data-show-item">
              选手身份证：<span>{{ item.IDcard_code }}</span>
            </div>
          </div>
          <div class="data-show">
            <div class="data-show-item">
              选手身份证正反面：
              <img :src="item.IDcard_img1" width="50px" height="50px" />
              {{}}
              <img :src="item.IDcard_img2" width="50px" height="50px" />
            </div>
          </div>
        </div>
      </Card>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelDetailModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getList,
  addList,
  delList,
  editList,
  getDetail,
  getMatchList,
  getTypeAndArea,
  uploadPic,
  getDetailForEdit,
} from "@/api/sign/sign";
import VDistpicker from "v-distpicker";
import ImgUpload from "../components/img-upload/img-upload";
import ImgUploadMore from "../components/img-upload/img-upload-more";


export default {
  components: {
    ImgUpload,
    VDistpicker,
    ImgUploadMore,
  },
  data() {
    return {
      uploadList: [],
      visible: false,
      addStudent: {},
      teacherInfo: {}, //老师信息,
      imgArray: [],
      typeList: [], //类型
      areaList: [], // 赛场
      choiceIds: "", //绑定类型
      studentList: [],
      teacherList: {},
      addTeacherList: [],
      editStudentList: [
        {
          studentIdCardImg: [],
        },
      ],
      //学生身份证照片数组
      StudetIdCardImg: [],
      editTeacherList: {},
      searchByPhone: "",
      searchByName: "",
      matchList: [], // 赛事名称下拉列表
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "赛事名称",
          align: "center",
          key: "match_name",
        },
        {
          title: "报名编号",
          align: "center",
          key: "num_code",
        },
        {
          title: "参赛单位",
          align: "center",
          key: "unit_name",
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      let data = Object.assign({}, params.row);
                      this.getDetailForEdit({ id: params.row.id });
                      this.getTypeAndArea(params.row.match_id);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      // let data = Object.assign({}, params.row)
                      let id = { id: params.row.id };
                      this.getDetail(id);
                      this.openDetailModal();
                    },
                  },
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "请确认删除",
                        // content: `<p>删除数据: ${params.row.name} 后无法恢复,确认删除?</p>`,
                        content: `<p>删除数据后无法恢复,确认删除?</p>`,
                        okText: "确认",
                        onOk: () => {
                          let id = { id: params.row.id };
                          this.delList(id);
                        },
                        // 取消删除
                        onCancel: () => {
                          this.$Message.info("取消删除！");
                        },
                      });
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      index_t: 0, // 添加学生的索引
      isAdd: false,
      isEdit: false,
      isDetail: false,
      addForm: {
        teacherImgs: [],
        addStudentList: [
          {
            status: 1,
            name: "",
            area: "",
            school_name: "",
            avator: "",
            IDcard_code: "",
            studentImgs: [],
          },
        ],
      },

      editForm: {},
      formCopy: {},
      // 批量选择的id对象
      delId: {
        ids: "",
      },
      page: {
        // 页面翻页对象
        total: 1, // 数据总数
        currentPage: 1, // 当前页面
      },
      searchOption: {}, // 查询用参数
      addRules: {
        match_id: [{ required: true, message: "赛事名称不能为空" }],
        type_id: [{ required: true, message: "赛事类型不能为空" }],
        arena_id: [{ required: true, message: "赛场不能为空" }],
        unit_name: [{ required: true, message: "参赛单位不能为空" }],
        teacher_name: [{ required: true, message: "指导老师不能为空" }],
        teacher_phone: [
          { required: true, message: "指导老师电话不能为空" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        teacher_IDcard_code: [
          { required: true, message: "指导老师身份证不能为空" },
          {
            type: "string",
            max: 18,
            min: 18,
            pattern: /^\d{6}(1[8-9]|[2-9][0-9])\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
            message: "请输入正确的身份证号",
            trigger: "blur",
          },
        ],
        teacherImgs: [
          { required: true, message: "指导老师身份证照片不能为空" },
        ],
      },
      editRules: {
        match_id: [{ required: true, message: "赛事名称不能为空" }],
        type_id: [{ required: true, message: "赛事类型不能为空" }],
        arena_id: [{ required: true, message: "赛场不能为空" }],
      },
    };
  },
  created() {
    this.getList({});
    this.getMatchList();
  },
  methods: {
    // 编辑modal打开
    openEditModal(params) {
    //   console.log(params);
      this.index_t = 0;
      this.$nextTick(() => {
        let teacherIdCardImg = [];
        teacherIdCardImg.push({
          url: params.teacher_list.IDcard_img1,
          name: "老师身份证图片正面",
          status: "finished",
        });
        teacherIdCardImg.push({
          url: params.teacher_list.IDcard_img2,
          name: "老师身份证图片反面",
          status: "finished",
        });
        this.$refs.teacherIdCardImg.updateImgUrl(teacherIdCardImg);
        this.editStudentList.forEach((item, index) => {
          let list = [];
          list.push({
            url: item.avator,
            name: "图片",
            status: "finished",
          });
          this.$refs[`img${item.id}`][0].updateImgUrl(list);
          let idCardImg = [];
          idCardImg.push({
            url: item.IDcard_img1,
            name: "学生身份证图片正面",
            status: "finished",
          });
          idCardImg.push({
            url: item.IDcard_img2,
            name: "学生身份证图片反面",
            status: "finished",
          });
          this.$refs[`img1${item.id}`][0].updateImgUrl(idCardImg);
        });
      });
      this.editForm = params.regist_info;
      setTimeout(() => {
        this.isEdit = true;
      }, 300);
    },
    getStudentImg(e, file) {
    //   console.log(e);
    //   console.log(file);
    },
    // 获取上传图片ur
    getUploadImg(url) {
      // console.log(url)
      this.addForm.teacherImgs.push(url);
    },
    // 删除上传图片url
    delUploadImg(index) {
      // console.log(url)
      this.addForm.teacherImgs.splice(index, 1);
    },

    // 获取上传图片选手身份证
    getUploadImg2(url, currIndex) {
      this.addForm.addStudentList[currIndex].studentImgs.push(url);
      // console.log(this.addForm.addStudentList);
    },
    // 删除上传图片选手
    delUploadImg2(index, currIndex) {
    //   console.log(this.addForm.addStudentList[currIndex]);
      this.addForm.addStudentList[currIndex].studentImgs.splice(index, 1);
      // console.log(this.addForm.addStudentList);
    },
    // 删除上传学生身份证
    delUploadImg3(index, currIndex) {
      this.editStudentList[currIndex].studentIdCardImg.splice(index, 1);
    //   console.log(this.editStudentList[currIndex].studentIdCardImg);
    },
    // 删除上传老师身份证
    delUploadImgForTeacher(index, currIndex) {
      this.editTeacherList.teacherIdCardImg.splice(index, 1);
    //   console.log(this.editTeacherList.teacherIdCardImg);
    },
    //获取赛事类型
    async getTypeAndArea(params) {
      // console.log(params)
      let tmp = { match_id: params };
      let res = await getTypeAndArea(tmp);
      if (res.errno === 0) {
        this.typeList = res.data.type_list;
        this.areaList = res.data.arena_list;
        this.areaList.forEach((i) => {
          i.name = i.area + i.address;
        });
      } else {
        this.$Message.error(res.errmsg);
      }
    },
    // 查询
    async getList(params) {
      if (this.searchByName) {
        params.search = this.searchByName;
      } else {
        params.search = "";
      }
      let res = await getList(params);
      if (res.errno === 0) {
        this.tableData = res.data.data;
        this.page = {
          total: res.data.count,
          currentPage: res.data.currentPage,
        };
      } else {
        this.$Message.error(res.data);
      }
    },
    // 获取赛事下拉列表
    async getMatchList(params) {
      let res = await getMatchList(params);
      if (res.errno === 0) {
        this.matchList = res.data;
      } else {
        this.$Message.error(res.data);
      }
    },
    // 获取详细信息
    async getDetail(params) {
      // console.log(params)
      let res = await getDetail(params);
      this.teacherList = res.data.teacher_list;
      this.studentList = res.data.student_list;
    },
    // 获取详细信息
    async getDetailForEdit(params) {
      let res = await getDetailForEdit(params);
      this.editStudentList = res.data.student_list;
      this.editTeacherList = res.data.teacher_list;
      let data = res.data;
      this.openEditModal(data);
    },
    // 添加
    async addList() {
      this.$refs.addForm.validate(async (valid) => {
		   //设置一个插入学生身份证图片标志
		  let flag =0
        // 表单校验
        if (valid) {
          // 表单验证成功
          if (this.addForm.teacherImgs.length < 2) {
            this.$Message.error("请上传老师身份证正反面2图");
            return;
          }
          let form = Object.assign({}, this.addForm);
          let teacherInfo = [
            {
              name: this.addForm.teacher_name,
              phone: this.addForm.teacher_phone,
              IDcard_code: this.addForm.teacher_IDcard_code,
              IDcard_img1: this.addForm.teacherImgs[0],
              IDcard_img2: this.addForm.teacherImgs[1],
            },
          ];
          this.addForm.addStudentList.forEach((item) => {
            if (item.studentImgs.length < 2) {
              item.IDcard_img1 = "";
              item.IDcard_img2 = "";
			  this.$Message.error("请上传选手身份证正反面2图");
			  flag=1;
              return;
            }
           
            item.IDcard_img1 = item.studentImgs[0];
            item.IDcard_img2 = item.studentImgs[1];
          });
          form.student_info = JSON.stringify(this.addForm.addStudentList);
          form.teacher_info = JSON.stringify(teacherInfo);
		//   console.log(form);
		if(flag!==1){
            let res = await addList(form);
          if (res.errno === 0) {
            // 添加成功
            this.$Message.success("添加成功");
            this.getList(this.searchOption);
            this.cancelAddModal();
          } else {
            // 添加失败
            this.$Message.error(res.errmsg);
          }
		}
        } else {
          this.$Message.error("请正确填写表单");
        }
      });
    },
    // 编辑
    async editList() {
      this.$refs.editForm.validate(async (valid) => {
		  //设置一个插入学生身份证图片标志
		  let flag =0
		// 表单校验
			if(!(/^\d{6}(1[8-9]|[2-9][0-9])\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(this.editTeacherList.IDcard_code))){ 
				this.$Message.error("老师身份证有误，请重填");
        return false; 
    } 
        if (valid) {
			if(!(/^1[3456789]\d{9}$/.test(this.editTeacherList.phone))){ 
				this.$Message.error("老师手机号码有误，请重填");
        return false; 
	} 

		  // 表单验证成功
		  if (this.editTeacherList.teacherIdCardImg.length < 2) {
            this.$Message.error("请上传老师身份证正反面2图");
            return;
		  }
		 this.editStudentList.forEach((item,index) => {
            if (item.studentIdCardImg.length < 2) {
			  this.$Message.error("请上传选手身份证正反面2图");
			  flag =1;
			}
			 if (!(/^\d{6}(1[8-9]|[2-9][0-9])\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(item.IDcard_code))) {
			  this.$Message.error("学生"+(index+1)+"身份证号码有误");
			  flag =1;
			}

			
          });
          let form = Object.assign({}, this.editForm);
          let teacher_info_t = [];
          teacher_info_t.push(this.editTeacherList);
          form.student_info = JSON.stringify(this.editStudentList);
          form.teacher_info = JSON.stringify(teacher_info_t);
		  // console.log(form)
		  if(flag!==1){
			  let res = await editList(form);
          if (res.errno === 0) {
            // 添加成功
            this.$Message.success("编辑成功");
            this.getList(this.searchOption);
            this.cancelEditModal();
          } else if (res.errmsg.errno === 1136) {
			//   console.log(res.errmsg)
				   // 编辑失败
				   this.$Message.error("新增选手的信息不完整，请正确填写表单");
			  }
		  else {
            // 编辑失败
            this.$Message.error(res.errmsg);
          }
		  }
          
        } else {
          this.$Message.error("请正确填写表单");
        }
      });
    },
    // 删除
    async delList(params) {
      let res = await delList(params);
      if (res.errno === 0) {
        this.$Message.success("删除成功");
        this.getList(this.searchOption);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 根据姓名查询
    handleSearchByName() {
      if (this.searchByName) {
        // 判断搜索条件是否为空
        this.searchOption.search = this.searchByName;
      } else {
        // 重置搜索内容
        this.searchOption.search = "";
      }
      this.searchOption.page = 1; // 初始化页数
      this.getList(this.searchOption);
    },
    openAddModal() {
      // this.$refs.imgUpload.updateImgUrl([])
      this.index_t = 0;
      this.userAddForm = {};
      this.typeList = [];
      this.areaList = [];
      this.addForm.addStudentList = [
        {
          status: 1,
          name: "",
          area: "",
          school_name: "",
          avator: "",
          IDcard_code: "",
          studentImgs: [],
        },
      ];
      this.addForm.teacherImgs = [];
      this.isAdd = true;
    },
    cancelAddModal() {
      this.index_t = 0;
      this.typeList = [];
      this.areaList = [];
      this.$refs.addForm.resetFields(); // 重置表单
      (this.addForm = {
        teacherImgs: [],
        addStudentList: [
          {
            status: 1,
            name: "",
            area: "",
            school_name: "",
            avator: "",
            IDcard_code: "",
            studentImgs: [],
          },
        ],
      }),
        (this.isAdd = false);
    },

    cancelEditModal() {
      this.$refs.editForm.resetFields(); // 重置表单
      this.editStudentList = [];
      this.editTeacherList = {};
      this.editForm = {};
      this.typeList = [];
      this.areaList = [];
      this.isEdit = false;
    },
    // 详情modal打开
    openDetailModal() {
      // this.$refs.imgUpload.updateImgUrl([])
      // this.detailData = data
      this.isDetail = true;
    },
    cancelDetailModal() {
      this.teacherList = {};
      this.studentList = [{}];
      this.isDetail = false;
    },
    // 页面翻页
    handlePageTurn(page) {
      this.searchOption.page = page;
      this.getList(this.searchOption);
    },
    // 获取上传头像url
    getAvator(url) {
      this.addForm.addStudentList[this.index_t].avator = url;
    },
    // 编辑学生头像获取上传头像url
    getAvator1(url, currIndex) {
      this.editStudentList[currIndex].avator = url;
    },
    // 编辑学生身份证获取上传身份证url
    getUploadImgForStudnet(url, currIndex) {
      this.editStudentList[currIndex].studentIdCardImg.push(url);
    },
    // 编辑学生身份证获取上传身份证url
    getUploadImgForTeacher(url, currIndex) {
      this.editTeacherList.teacherIdCardImg.push(url);
    },
    onSelected(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      // console.log(data)

      this.addForm.addStudentList[this.index_t].area =
        data.province.value + data.city.value + data.area.value;
      // console.log(data.province.value + data.city.value + data.area.value)
    },
    onSelected1(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      // console.log(data)
    //   console.log(this.index_t);
      this.editStudentList[this.index_t].area =
        data.province.value + data.city.value + data.area.value;
      // console.log(data.province.value + data.city.value + data.area.value)
    },
    handleAdd() {
      this.index_t++;

      this.addForm.addStudentList.push({
        status: 1,
        name: "",
        area: "",
        school_name: "",
        avator: "",
        IDcard_code: "",
        studentImgs: [],
      });
    },
    handleAdd1() {
      this.index_t++;
      //   console.log("学生索引"+index_t)
      this.editStudentList.push({
        status: 1,
        name: "",
        area: "",
        school_name: "",
        avator: "",
        IDcard_code: "",
        studentIdCardImg: [],
      });
    },
    handleRemove(index) {
      this.addForm.addStudentList.splice(index, 1);
    },
    handleRemoveForEdit(index) {
      this.editStudentList.splice(index, 1);
    },
    getAvatorforedit(url) {
    //   console.log(url);
      this.studentList.avator = url;
    //   console.log(this.studentList.avator);
      //   this.addForm.addStudentList[this.index_t].avator = url;
    },

    handleRemoveForImg(item) {
    //   console.log(item);
    //   console.log(this.editStudentList);
      this.editStudentList.avator = "";
    //   console.log(this.editStudentList.avator);
      // console.log(this.studentList);
    },
  },
};
</script>

<style scoped lang="less">
.data-show {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  .data-show-item {
    width: 80%;
  }
}
</style>
