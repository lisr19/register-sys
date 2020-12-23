<template>
	<div class="page" >
		<head-bar title="成绩查询"></head-bar>

		<div class="head-box">
			<h2 class="title">{{data[0].regist_info.match_name}}</h2>
			<img src="@/assets/icon/blue.png" alt="">
			<span class="score">
				{{data[0].grade}}
			</span>
			<span class="text">最终得分</span>
		</div>
		<div class="content">

			<span class="teacher">指导老师：{{data[0].teacher_name}} </span>
			<span class="addr">参赛地区：{{data[0].regist_info.area}}</span>
			<div class="ranking">
				<div class="area">
					<img src="@/assets/icon/local.png" alt="">
					<span class="item">{{data[0].regist_info.area}}排名：第 <em>{{data[0].a_rank}} </em>名</span>
				</div>
				<div class="country">
					<img src="@/assets/icon/ranking.png" alt="">
					<span class="item">全国排名：第 <em> {{data[0].n_rank}}</em> 名</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	export default {
		name: 'score-query-content',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				data:[],
				
			};
		},
		created() {
			this.recvGrade();

		},
		methods: {
			recvGrade() {
				this.data = this.$route.query.scoreDetail;
				console.log(this.data);
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
	.head-box {
		margin-top: 150px;
		width: 336px;
		display: block;
		position: relative;
		.title{
			font-size: 45px;
			margin-bottom: 50px;
		}
	}
	.score {
		position: absolute;
		width: 100%;
		left: 0px;
		font-size: 138px;
		font-family: AlibabaPuHuiTiM;
		color: #2CAEFC;
		line-height: 188px;
    	top: 156px;
	}
	.text {
		position: absolute;
		left: 0px;
		bottom: 66px;
		width: 100%;
		font-size: 28px;
		font-family: AlibabaPuHuiTiR;
		color: #999999;
		line-height: 40px;
	}

	.content {
		margin-top: -138px;
		width: 686px;
		height: 534px;
		//background-color: aqua;
		background: #FFFFFF;
		border-radius: 20px;
		display: flex;
		.teacher {
			margin-top: 168px;
			margin-left: 82px;
			text-align: left;
			width: 50%;
			height: 40px;
			font-size: 28px;
			font-family: AlibabaPuHuiTiR;
			color: #2CAEFC;
			line-height: 40px;
		}
		.addr {
			text-align: right;
			width: 50%;
			margin-right: 82px;
			margin-top: 172px;
			height: 34px;
			font-size: 24px;
			font-family: AlibabaPuHuiTiR;
			color: #A8A8A8;
			line-height: 34px;
		}
		.ranking {
			display: flex;
			flex-direction: column;
			justify-content: center;
			position:absolute;
			margin-left: 56px;
			margin-top: 228px; 
			width: 560px;
			height: 244px;
			background: #F2F9FF;
			border-radius: 18px;
			.country {
				padding-left: 16px;
				padding-top: 32px;
			}
			.item {
				height: 66px;
				font-size: 32px;
				font-family: AlibabaPuHuiTiR;
				color: #012E49;
				line-height: 44px;
				padding-left: 20px;
			}
			em{
				font-size: 48px;
				font-weight: 600;
				font-family: AlibabaPuHuiTiR;
				color: #012E49;
			}
		}
	}
</style>