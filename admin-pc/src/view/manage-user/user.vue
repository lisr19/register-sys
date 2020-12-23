<template>
	<div>
		<!--按钮部分-->
		<Card>
			<p slot="title">公众号用户</p>
			<Row>
				<!-- <Col span="4">
				<Button  type="primary"  @click="isAdd=true" style="margin-right: 20px ">新增</Button>
				<!--<Button type="error" ghost @click="">批量删除</Button>-->
				<!-- </Col> -->

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
	</div>
</template>

<script>
	import {getList} from '@/api/system/user'
	export default {
		components: {

		},
		data () {
			return {
				searchByPhone:'',
				searchByName:'',
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '用户名',
						align: 'center',
						key: 'nickname',
					},
					{
						title: '用户类型',
						align: 'center',
						key: 'type',
						render: (h, params) => {
							return h('span', [
								'公众号用户'
							])
						}
					}
					// {
					// 	title: '操作',
					// 	align: 'center',
					// 	key: 'handle',
					// 	width: 155,
					// 	render: (h, params) => {
					// 		return h('div', [
					// 			h('Button', {
					// 				props: {
					// 					type: 'primary',
					// 				},
					// 				style: {
					// 					marginRight: '5px',					
					// 				},
					// 				on: {
					// 					click: () => {
					// 						let data = Object.assign({}, params.row)
					// 						data.type = String(data.type)
					// 						this.formCopy = Object.assign({}, data)
					// 						delete data.password
					// 						this.openEditModal(data)
					// 					}
					// 				}
					// 			}, '编辑')
					// 			// h('Button', {
					// 			// 	props: {
					// 			// 		type: 'success'
					// 			// 	},
					// 			// 	style: {
					// 			// 		marginRight: '5px',
					// 			// 		color:'#1890FF',
					// 			// 		background: '#ECF6FF'
					// 			// 	},
					// 			// 	on: {
					// 			// 		click: () => {
					// 			// 			let id = {id: params.row.id}
					// 			// 			this.openDetail(id)
					// 			// 		}
					// 			// 	}
					// 			// }, '详情'),
					// 			// h('Button', {
					// 			// 	props: {
					// 			// 		type: 'error',
					// 			// 	},
					// 			// 	on: {
					// 			// 		click: () => {
					// 			// 			this.$Modal.confirm({
					// 			// 				title: '请确认删除',
					// 			// 				// content: `<p>删除数据: ${params.row.name} 后无法恢复,确认删除?</p>`,
					// 			// 				content: `<p>删除数据后无法恢复,确认删除?</p>`,
					// 			// 				okText: '确认',
					// 			// 				onOk: () => {
					// 			// 					let id = {id: params.row.id}
					// 			// 					this.delList(id)
					// 			// 				},
					// 			// 				// 取消删除
					// 			// 				onCancel: () => {
					// 			// 					this.$Message.info('取消删除！')
					// 			// 				}
					// 			// 			})
					// 			// 		}
					// 			// 	}
					// 			// }, '删除')
					// 		])
					// 	}
					// }
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
				searchOption: {} // 查询用参数
			}
		},
		created () {
			this.getList({})
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
			cancelAddModal () {
				this.$refs.addForm.resetFields()// 重置表单
				this.addForm = {}
				this.isAdd = false
			},
			// 编辑modal打开
			openEditModal (params) {
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
			// 页面翻页
			handlePageTurn (page) {
				this.searchOption.page = page
				this.getList(this.searchOption)
			}
		}
	}
</script>

<style scoped>

</style>
