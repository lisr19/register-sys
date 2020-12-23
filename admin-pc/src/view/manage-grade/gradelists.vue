<template>
	<div>
		<!--按钮部分-->
		<Card>
			<p slot="title">成绩列表</p>
			<Row>
				<Col span="4">
				<Button  type="primary"  @click="openAddModal" style="margin-right: 20px ">新增</Button>
				<!--<Button type="error" ghost @click="">批量删除</Button>-->
				</Col> 
				<Col span="4" offset="16">
				<Input clearable v-model="searchByName" @on-change="handleSearchByName"
				       placeholder="输入关键字搜索">
					<Icon type="ios-search" slot="suffix" />
				</Input>
				</Col>
			</Row>
		</Card>
		<!--表格部分-->
		<Card style="margin-top: 15px">
			<div>
				<Table  :columns="columns" :data="tableData" border
				></Table>
			</div>
			<div class="" style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<Page show-total show-elevator :total="page.total" :current="page.currentPage"
					      @on-change="handlePageTurn"></Page>
				</div>
			</div>
		</Card>

		<!--添加Modal-->
		<Modal v-model="isAdd" :mask-closable="false" :closable="false" title="成绩列表添加：" width="600" height="10" scrollable>
			<Form :model="addForm" ref="addForm" :rules="addRules" :label-width="130">
				<Card style="max-height: 600px;overflow: auto">
					<FormItem label="赛事名称：" prop="match_id">
						<Select v-model="addForm.match_id" style="width:200px">
							<Option v-for="(option, index) in matchList" :value="option.id" :key="index">{{ option.name }}</Option>
						</Select>
					</FormItem>
					<FormItem label="报名编号：" prop="num_code">
						<Input type="number" clearable v-model="addForm.num_code" placeholder="请填写报名编号" @on-change="handleFill"/>
					</FormItem>
					<FormItem label="得分：" prop="grade">
						<Input type="number" clearable v-model="addForm.grade" placeholder="请填写得分"/>
					</FormItem>
					<div v-if="tipMsg" style="margin: 20px 0;text-align: center;font-size: 20px">{{tipMsg}}</div>
					<template v-if="isShow">
						<FormItem label="赛事类型：" prop="type_name">
							<Select disabled v-model="matchInfo.type_id" style="width:200px">
								<Option v-for="(option, index) in typeList" :value="option.id" :key="index">{{ option.name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="参赛单位：" prop="unit_name">
							<Input clearable disabled v-model="matchInfo.unit_name" placeholder="请填写参赛单位"/>
						</FormItem>
						<FormItem label="指导老师姓名：" prop="name" >
							<Input clearable disabled v-model="teacherInfo.name"/>
						</FormItem>
						<FormItem label="指导老师身份证：" prop="IDcard_code" >
							<Input clearable disabled v-model="teacherInfo.IDcard_code" placeholder="请填写指导老师身份证"/>
						</FormItem>
						<FormItem label="身份证正反面：" prop="IDcard_img" >
							<img :src=teacherInfo.IDcard_img1 width="50px" height="50px"/>
							{{  }}
							<img :src=teacherInfo.IDcard_img2 width="50px" height="50px"/>
						</FormItem>
						<FormItem label="指导老师手机号码：" prop="phone" >
							<Input clearable disabled v-model="teacherInfo.phone" placeholder="请填写指导老师手机号码"/>
						</FormItem>
						<FormItem
								v-for="(item, index) in studentInfo"
								:key="index"
								:label="'选手信息'"
								:prop="'item'"
						>
							选手姓名
							<Input clearable disabled v-model="item.name"/>
							选手地区
							<Input clearable disabled v-model="item.area"/>
							选手所在学校
							<Input clearable disabled v-model="item.school_name"/>
							选手照片
							<img :src=item.avator width="50px" height="50px"/>
							</br>
							选手身份证
							<Input clearable disabled v-model="item.IDcard_code"/>
							选手身份证正反面：
							<img :src=item.IDcard_img1 width="50px" height="50px"/>
							<img :src=item.IDcard_img2 width="50px" height="50px"/>
						</FormItem>
					</template>
				</Card>
			</Form>
			<!--自定义页脚-->
			<div slot="footer">
				<Button type="text" @click="cancelAddModal">取消</Button>
				<Button type="primary" @click="addList">确认</Button>
			</div>
		</Modal>

		<!--编辑Modal-->
		<Modal v-model="isEdit" :mask-closable="false" :closable="false" title="用户编辑：" width="600">
			<Form :model="editForm" ref="editForm" :rules="editRules" :label-width="130">
				<Card>
					<FormItem label="赛事名称" prop="macth_name">
						<Input clearable disabled v-model="editForm.macth_name" placeholder="请填写赛事"/>
					</FormItem>
					<FormItem label="报名编号：" prop="num_code">
						<Input type="number" clearable disabled v-model="editForm.num_code" placeholder="请填写报名编号" />
					</FormItem>
					<FormItem label="得分：" prop="grade">
						<Input type="number" clearable v-model="editForm.grade" placeholder="请填写得分"/>
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
		<Modal v-model="isDetail" :mask-closable="false" :closable="false" title="详情信息：" width="600">
			<Card style="height: 600px;overflow: auto">
				<div class="data-show">
					<div class="data-show-item">
					赛事名称：<span>{{detailData.match_name}}</span>
					</div>
				</div>
				<div class="data-show">
					<div class="data-show-item">
					得分：<span>{{detailData.grade}}</span>
					</div>
				</div>
				<div class="data-show">
					<div class="data-show-item">
					指导老师姓名：<span>{{teacherList.name}}</span>
					</div>
				</div>
				<div class="data-show">
					<div class="data-show-item">
					指导老师身份证：<span>{{teacherList.IDcard_code}}</span>
					</div>
				</div>
				<div class="data-show">
					<div class="data-show-item">
					身份证正反面：
					<img :src=teacherList.IDcard_img1 width="50px" height="50px"/>
					{{  }}
					<img :src=teacherList.IDcard_img2 width="50px" height="50px"/>
					</div>
				</div>
				<div class="data-show">
					<div class="data-show-item">
					指导老师手机号码：<span>{{teacherList.phone}}</span>
					</div>
				</div>
				<div v-for="(item, index) in studentList">
					<div class="data-show">
						<div class="data-show-item">
						选手姓名：<span>{{item.name}}</span>
						</div>
					</div>
					<div class="data-show">
						<div class="data-show-item">
						选手所在地区：<span>{{item.area}}</span>
						</div>
					</div>
					<div class="data-show">
						<div class="data-show-item">
						选手所在学校：<span>{{item.school_name}}</span>
						</div>
					</div>
					<div class="data-show">
						<div class="data-show-item">
						选手照片：<img :src=item.avator width="50px" height="50px"/>
						</div>
					</div>
					<div class="data-show">
						<div class="data-show-item">
						选手身份证：<span>{{item.IDcard_code}}</span>
						</div>
					</div>
					<div class="data-show">
						<div class="data-show-item">
						选手身份证正反面：
						<img :src=item.IDcard_img1 width="50px" height="50px"/>
						{{  }}
						<img :src=item.IDcard_img2 width="50px" height="50px"/>
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
	import {getList,addList,delList,editList,getDetail,getMatchList,getInfo, getTypeList} from '@/api/grade/gradelist'
	import ImgUpload from '../components/img-upload/img-upload'
	export default {
		components: {
			ImgUpload
		},
		data () {
			return {
				isShow: false,
				searchByPhone:'',
				searchByName:'',
				matchList:[], // 赛事名称下拉框
				matchInfo:{}, // 匹配的信息
				teacherInfo:{},
				studentInfo:[],
				typeList:[],
				studentList:[],
				teacherList:{},
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '赛事名称',
						align: 'center',
						key: 'macth_name',
					},
					{
						title: '报名编号',
						align: 'center',
						key: 'num_code',
					},
					{
						title: '得分',
						align: 'center',
						key: 'grade',
					},
					{
						title: '操作',
						align: 'center',
						key: 'handle',
						width: 220,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
									},
									style: {
										marginRight: '5px',					
									},
									on: {
										click: () => {
											let data = Object.assign({}, params.row)
											// this.formCopy = Object.assign({}, data)
											delete data.password
											this.openEditModal(data)
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'success'
									},
									style: {
										marginRight: '5px',
									},
									on: {
										click: () => {
											// let data = Object.assign({}, params.row)
											// let params_t = {}
											// params_t.match_id = params.row.match_id
											// params_t.num_code = params.row.num_code
											// this.getMatchType(params_t)
											this.getDetail({id: params.row.id}, params.row.macth_name)
											// console.log(params.row.id)
											
											this.detailData.match_name = params.row.macth_name
											// console.log(this.detailData.match_name)
                          					this.openDetailModal()
										}
									}
								}, '详情'),
								h('Button', {
									props: {
										type: 'error',
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '请确认删除',
												// content: `<p>删除数据: ${params.row.macth_name} 后无法恢复,确认删除?</p>`,
												content: `<p>删除数据后无法恢复,确认删除?</p>`,
												okText: '确认',
												onOk: () => {
													let id = {id: params.row.id}
													this.delList(id)
												},
												// 取消删除
												onCancel: () => {
													this.$Message.info('取消删除！')
												}
											})
										}
									}
								}, '删除')
							])
						}
					}
				],
				tableData: [],
				detailData:{},
				isAdd: false,
				isEdit: false,
				isDetail: false,
				addForm: {},
				editForm: {},
				formCopy:{},
				// 批量选择的id对象
				delId: {
					ids: ''
				},
				page: {// 页面翻页对象
					total: 1, // 数据总数
					currentPage: 1// 当前页面
				},
				searchOption: {}, // 查询用参数
				addRules: {
					match_id: [ { required: true, message: '赛事名称不能为空'}],
					num_code: [ { required: true, message: '报名编号不能为空', trigger: 'blur' }
					],
					grade: [ { required: true, message: '得分不能为空', trigger: 'blur' }]
				},
				editRules: {
					macth_name: [ { required: true, message: '赛事名称不能为空', trigger: 'blur' }],
					num_code: [ { required: true, message: '报名编号不能为空', trigger: 'blur' }],
					grade: [ { required: true, message: '得分不能为空' }]
				},
				tipMsg:''
			}
		},
		created () {
			this.getList({})
			this.getMatchList()
			this.getTypeList()
		},
		methods: {
			// 查询
			async getList (params) {
				if(this.searchByName){
					params.search=this.searchByName
				}else {
					params.search = ''
				}
				let res = await getList(params)
				if (res.errno === 0) {
					this.tableData = res.data.data
					this.page = {
						total: res.data.count,
						currentPage: res.data.currentPage
					}
				} else {
					this.$Message.error(res.data)
				}
			},
			// 获取赛事下拉列表
			async getMatchList (params) {

				let res = await getMatchList(params)
				if (res.errno === 0) {
					this.matchList = res.data
				} else {
					this.$Message.error(res.data)
				}
			},
			// 获取赛事类型列表
			async getTypeList (params) {
				let res = await getTypeList(params)
				if (res.errno === 0) {
					this.typeList = res.data
				} else {
					this.$Message.error(res.data)
				}
			},
			// 获取详细信息
			async getDetail (params, name) {
				// console.log(params)
				let res = await getDetail(params)
				this.detailData = res.data
				this.detailData.match_name = name
				this.teacherList = res.data.teacher_info
				this.studentList = res.data.student_info
				// console.log(this.teacherList)
			},
			// 获取填充信息
			async getInfo (params) {
				// console.log(id)
				let res = await getInfo(params)
				if (res.errno ===0) {
					this.matchInfo = res.data
					this.studentInfo = res.data.student_info
					this.teacherInfo = res.data.teacher_info
					this.tipMsg = ''
					this.isShow = true
				}else {
					this.tipMsg = '没有相关的报名信息，请核实赛事和报名编号'
				}

				
			},
			// 获取填充信息
			async getMatchType (params) {
				// console.log(id)
				let res = await getInfo(params)
				if (res.errno ===0) {
					this.detailData.type_id = res.data.type_id
				}
			},
			// 添加
			async addList () {
				this.$refs.addForm.validate(async (valid) => { // 表单校验
					if (valid) { // 表单验证成功
						let form = {}
						form.match_id = this.addForm.match_id
						form.regist_id = this.teacherInfo.regist_id
						form.grade = this.addForm.grade
						// console.log(form)
						let res = await addList(form)
						if (res.errno ===0) { // 添加成功
							this.$Message.success('添加成功')
							this.getList(this.searchOption)
							this.cancelAddModal()
						} else { // 添加失败
							this.$Message.error(res.errmsg)
						}
					} else {
						this.$Message.error('请正确填写表单')
					}
				})
			},
			// 编辑
			async editList () {
				this.$refs.editForm.validate(async (valid) => { // 表单校验
					if (valid) { // 表单验证成功
						let form = {}
						form.id = this.editForm.id
						form.grade = this.editForm.grade
						// console.log(form)
						let res = await editList(form)
						if (res.errno ===0) { // 添加成功
							this.$Message.success('编辑成功')
							this.getList(this.searchOption)
							this.cancelEditModal()
						} else { // 编辑失败
							this.$Message.error(res.errmsg)
						}
					} else {
						this.$Message.error('请正确填写表单')
					}
				})
			},
			// 删除
			async delList (params) {
				let res = await delList(params)
				if (res.errno === 0) {
					this.$Message.success('删除成功')
					this.getList(this.searchOption)
				} else {
					this.$Message.error(res.message)
				}
			},
			// 根据姓名查询
			handleSearchByName () {
				if (this.searchByName) { // 判断搜索条件是否为空
					this.searchOption.search = this.searchByName
				} else { // 重置搜索内容
					this.searchOption.search = ''
				}
				this.searchOption.page = 1 // 初始化页数
				this.getList(this.searchOption)
			},
			// 添加modal打开
			openAddModal () {
				this.isShow = false
				this.matchInfo = {}
				this.teacherInfo = {}
				this.studentInfo = []
				// this.$refs.imgUpload.updateImgUrl([])
				this.isAdd = true
			},
			cancelAddModal () {
				this.isShow = false
				this.$refs.addForm.resetFields()// 重置表单
				this.addForm = {}
				this.isAdd = false
			},
			// 编辑modal打开
			openEditModal (params) {
				// if (params[`avator`] && params.avator !== '') {
				// 	let list = []
				// 	list.push({
				// 		url: params.avator,
				// 		name: '选手照片',
				// 		status: 'finished'
				// 	})
				// 	this.$refs.imgUploadByEdit.updateImgUrl(list)
				// }
				this.editForm = params
				setTimeout(()=>{
					this.isEdit = true
				},300)
			},
			cancelEditModal () {
				this.$refs.editForm.resetFields()// 重置表单
				this.editForm = {}
				this.isEdit = false
			},
			// 详情modal打开
			openDetailModal (data) {
				// console.log(this.detailData.match_name)
				// this.$refs.imgUpload.updateImgUrl([])
				this.isDetail = true
			},
			cancelDetailModal () {
				this.detailData = {}
				this.teacherList = {}
				this.studentList = []
				this.isDetail = false
			},
			// 页面翻页
			handlePageTurn (page) {
				this.searchOption.page = page
				this.getList(this.searchOption)
			},
			// 填充信息
			handleFill (){
				let params = {}
				params.match_id = this.addForm.match_id
				params.num_code = this.addForm.num_code
				if(!params.match_id||!params.num_code){
					this.tipMsg = ''
					this.isShow =false
				}else {
					setTimeout(()=>{
						this.getInfo(params)
					},500)
				}
			}
		}
	}
</script>

<style scoped>
	.data-show{
		display: flex;
		justify-content: space-around;
		margin-bottom: 20px;
		.data-show-item{
			width: 100%;
		}
	}
</style>
</style>
