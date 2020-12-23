<template>
	<div class="page" >
		<head-bar title="获奖公布"></head-bar>
		<div class="content">
			<p>{{title}}</p>
			<div class="time">
				发布时间：{{add_time}}
				<br>
				<div class="blue">更新时间：{{update_time}}</div>
			</div>
			<div v-html="content" class="txt">
				{{content}}
			</div>
		</div>
	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	export default {
		name: 'award-announcement-details',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				title:'',
				content: '',
				update_time:'',
				add_time:'',
			};
		},
		created() {
			this.getInfo()

		},
		methods: {
			getInfo (){
				this.title = this.$route.params.title;
				this.content = this.$route.params.content
				this.update_time = this.$route.params.update_time
				this.add_time = this.$route.params.add_time
			}
  },


	}
</script>

<style lang="less" scoped>
	.page {
		width: 750px;
		background: #F6F7FA;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content{
		width: 662px;
		border-radius: 20px;
		background: #FFFFFF;
		margin-top: 126px;
		margin-bottom: 30px;
		overflow: hidden;
		padding-bottom:20px;
	}
	p {
		margin-top: 20px;
		width: 100%;
		font-size: 40px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 56px;

	}
	.time {
		margin:32px 0 52px 44px;
		text-align: left;
		height: 56px;
		font-size: 28px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #ADADAD;
		line-height: 42px;
		.blue {
			color: #017AFF;
		}
	}                
	

	.txt {
		width: 596px;
		background: #FFFFFF;
		/*border: 2px solid #E7E7E7;*/
	}

</style>