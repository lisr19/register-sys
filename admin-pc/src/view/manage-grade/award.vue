<template>
	<div>
		<!--按钮部分-->
		<Card>
			<p slot="title">获奖公布</p>
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
		<Modal v-model="isAdd" :mask-closable="false" :closable="false" title="添加：" width="900">
			<Form :model="addForm" ref="addForm" :rules="addRules" :label-width="130">
				<Card>
					<FormItem label="赛事名称：" prop="match_id">
						<Select v-model="addForm.match_id" style="width:200px">
							<Option v-for="(option, index) in matchList" :value="option.id" :key="index">{{ option.name }}</Option>
						</Select>
					</FormItem>
					<FormItem label="获奖公布标题：" prop="title">
						<Input clearable v-model="addForm.title" placeholder="请填写获奖公布标题"/>
					</FormItem>
					<FormItem label="获奖公布内容：" prop="content">
						<editor ref="addEditor" :value="addForm.content" @on-change="handleChange"/>
						<!-- <Input clearable v-model="addForm.content" placeholder="请填写获奖公布内容"/> -->
					</FormItem>
					<!--<FormItem label="发布时间：" prop="release_time">-->
						<!--<DatePicker  type="datetime"  placeholder="请选择发布时间"   v-model="addForm.release_time"-->
						            <!--@on-change="v=>{addForm.release_time=v}"-->
						<!--&gt;</DatePicker>-->
					<!--</FormItem>-->
				</Card>
			</Form>
			<!--自定义页脚-->
			<div slot="footer">
				<Button type="text" @click="cancelAddModal">取消</Button>
				<Button type="primary" @click="addList">确认</Button>
			</div>
		</Modal>

		<!--编辑Modal-->
		<Modal v-model="isEdit" :mask-closable="false" :closable="false" title="编辑：" width="900">
			<Form :model="editForm" ref="editForm" :rules="editRules" :label-width="130">
				<Card>
					<FormItem label="赛事名称：" prop="match_name">
						<Input clearable disabled v-model="editForm.match_name" placeholder="请填写赛事名称"/>
					</FormItem>
					<FormItem label="获奖公布标题：" prop="title">
						<Input clearable v-model="editForm.title" placeholder="请填写获奖公布标题"/>
					</FormItem>
					<FormItem label="获奖公布内容：" prop="content">
						<editor ref="editEditor" :value="editForm.content" @on-change="handleChange"/>
						<!-- <Input clearable v-model="editForm.content" placeholder="请填写获奖公布内容"/> -->
					</FormItem>
					<!--<FormItem label="发布时间：" prop="release_time">-->
						<!--<DatePicker  type="datetime"  placeholder="请选择发布时间"   v-model="editForm.release_time"-->
						            <!--@on-change="v=>{editForm.release_time=v}"-->
						<!--&gt;</DatePicker>-->
					<!--</FormItem>-->
				</Card>
			</Form>
			<!--自定义页脚-->
			<div slot="footer">
				<Button type="text" @click="cancelEditModal">取消</Button>
				<Button type="primary" @click="editList">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import {getList,addList,delList,editList,getMatchList} from '@/api/grade/award'
	import Editor from '_c/editor'
	export default {
		components: {
			Editor
		},
		data () {
			return {
				searchByPhone:'',
				searchByName:'',
				matchList:[], // 赛事下拉列表
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '赛事名称',
						align: 'center',
						key: 'match_name',
					},
					{
						title: '获奖公布标题',
						align: 'center',
						key: 'title',
					},
					{
						title: '操作',
						align: 'center',
						key: 'handle',
						width: 155,
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
											this.formCopy = Object.assign({}, data)
											delete data.password
											this.openEditModal(data)
										}
									}
								}, '编辑'),
								// h('Button', {
								// 	props: {
								// 		type: 'success'
								// 	},
								// 	style: {
								// 		marginRight: '5px',
								// 		color:'#1890FF',
								// 		background: '#ECF6FF'
								// 	},
								// 	on: {
								// 		click: () => {
								// 			let id = {id: params.row.id}
								// 			this.openDetail(id)
								// 		}
								// 	}
								// }, '详情'),
								h('Button', {
									props: {
										type: 'error',
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '请确认删除',
												// content: `<p>删除数据: ${params.row.name} 后无法恢复,确认删除?</p>`,
												content: `<p>删除数据后无法恢复,确认删除?</p>`,
												okText: '确认',
												onOk: () => {
													let id = {id: params.row.id}
													// console.log(id)
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
				isAdd: false,
				isEdit: false,
				addForm: {
					device_type_id:''
				},
				editForm: {},
				formCopy:{},
				detailData: {},
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
					match_id: [ { required: true, message: '赛事名称不能为空' }],
					title: [ { required: true, message: '获奖公布标题不能为空' , trigger: 'blur' }]
				},
				editRules: {
					match_name: [ { required: true, message: '赛事名称不能为空', trigger: 'blur'  }],
					title: [ { required: true, message: '获奖公布标题不能为空' , trigger: 'blur' }]
				}
			}
		},
		created () {
			this.getList({})
			this.getMatchList()
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
			// 添加
			async addList () {
				this.$refs.addForm.validate(async (valid) => { // 表单校验
					if (valid) { // 表单验证成功
						let form = Object.assign({}, this.addForm)
						// console.log(form)
						// form.match_id = 1
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
						let form = Object.assign({}, this.editForm)
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
			openAddModal() {
				this.addForm = {}
				this.$refs.addEditor.setHtml('')
				this.isAdd = true
			},
			cancelAddModal () {
				this.$refs.addForm.resetFields()// 重置表单
				this.addForm = {}
				this.isAdd = false
			},
			// 编辑modal打开
			openEditModal (params) {
				this.editForm = params
				this.$refs.editEditor.setHtml('')
				this.$refs.editEditor.setHtml(params.content)
				setTimeout(()=>{
					this.isEdit = true
				},300)
			},
			cancelEditModal () {
				this.$refs.editForm.resetFields()// 重置表单
				this.editForm = {}
				this.isEdit = false
			},
			// 页面翻页
			handlePageTurn (page) {
				this.searchOption.page = page
				this.getList(this.searchOption)
			},
			// 富文本内容的修改
			handleChange(html) {
				this.addForm.content = html
				this.editForm.content = html
				// console.log(html, text)
			}
		}
	}
</script>

<style scoped>

</style>
