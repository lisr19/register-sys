<template>
	<div class="page" >
		<head-bar title="成绩查询"></head-bar>
		<div class="content">
			<van-form @submit="onSubmit">
				<van-field
					v-model="name"
					name="选手姓名"
					required
					label="选手姓名"
					placeholder="请输入参赛选手姓名"
					:rules="[{ required: true, message: '请填写用户名' }]"
				/>
				<van-field
					v-model="ID"
					type="身份证号"
					name="身份证号"
					required
					label="身份证号"
					placeholder="请输入参赛选手的身份证号"
					maxlength="18"
					:rules="[{ required: true, message: '请填写身份证号' }]"
				/>
				<van-field
					v-model="phone"
					type="number"
					name="指导老师手机"
					required
					label="老师手机"
					placeholder="请输入指导老师的手机号码"
					maxlength="11"
					:rules="[{ required: true, message: '请输入指导老师的手机号码' }]"
				/>
				<van-button  class="btn" native-type="submit">
					<img src="@/assets/icon/search.png" alt="" >
					查询
				</van-button>
			</van-form>
		</div>
	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
    import {match_grade} from '@/lib/API/grade'
	import {Toast } from 'vant';
	export default {
		name: 'score-query',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				name: '',
				ID: '',
				phone: '',
				scoreDetail: [
					{
						id: '120',
						teacher_name: "李四",
						regist_info: {
								match_name: '',
								area: '广州',
								match_id: '12348',
								arena_id: '28'
							},
							grade: '95'
					}
				]
      			
			}
		},
		created() {


		},
		methods: {
			async match_grade(){
				let params = {
					name:this.name,
					phone:this.phone,
					ID:this.ID,
				}
				let res = await match_grade(params)
				if (res.errno === 0) {
					let scoreDetail = res.data
					this.$router.push({name:'成绩查询详情',query:{scoreDetail:scoreDetail}})
				} else {
					this.$toast(res.errmsg)
				}
			},
			onSubmit(values) {
			 console.log('submit', values);
				if (this.name === '' || this.phone === '' || this.ID === '') {
					this.$toast("请输入完整信息")
				} else {
					this.match_grade()
				}
			
			
			}
  		},
		

	}
</script>

<style lang="less" scoped>
	.page {
		width: 750px;
		height: 1334px;
		background: #F8F9FB;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content{
		width: 686px;
		height: 448px;
		background: #FFFFFF;
		border-radius: 20px;
		margin-top: 140px;
		overflow: hidden;
		.btn{
			position: absolute;
			top: 650px;
			left: 40px;
		}
	}
	.content .van-button {
		width: 666px;
		height: 96px;
		background: #2EADFB;
		border-radius: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36px;
		font-family: AlibabaPuHuiTiM;
		color: #FFFFFF;
		line-height: 50px;

	}
</style>