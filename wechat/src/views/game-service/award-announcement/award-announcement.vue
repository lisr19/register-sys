<template>
	<div class="page" >
		<head-bar title=""></head-bar>
		<div class="banner">
			<img src="@/assets/icon/award_banner.png" alt="">
		</div>
		<div class="items">
			<div class="item" v-for="item in list" @click="checkDetail(item)"> 
				
				<p class="title">
					{{item.title}}
				</p>
				<img class="item-img" src="@/assets/icon/go.png" >
				<div class="content">
					{{item.update_time}}
				</div>
		</div>
			<div class="tip" v-if="list.length===0">暂无获奖信息公布</div>
		</div>
	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	import { publish_get } from '@/lib/API/award_anounce'
	export default {
		name: 'award-annuncement',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				list:[
					// {title:'广州市人工智能机器人大赛 ',time:'2020-12-22 14:30'},
					// {title:'广州市人工智能机器人大赛  ',time:'2020-12-22 14:30'},
					// {title:'广州市人工智能机器人大赛   ',time:'2020-12-22 14:30'},
					// {title:'广州市人工智能机器人大赛    ',time:'2020-12-22 14:30'}
				]
			}
		},
		created() {
			this.publish_get()
		},
		methods: {

			checkDetail(item){
				this.$router.push({
					name:'获奖公布详情',
					params: {
						title: item.title,
						content: item.content,
						update_time: item.update_time,
						add_time: item.add_time,
					}
				})
			},
			async publish_get(params) {
				let res = await publish_get(params)
				if (res.errno === 0) {
					this.list = res.data
				} else {
					this.$toast(res.errmsg)
				}
			} 
		}
	}
</script>

<style lang="less" scoped>
	.page {
		width: 750px;
		background: #F8F9FB;
	}
	.banner {
		margin-top: 96px;
	}
	.items{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 26px;
		background: #F8F9FB;
		flex-direction: column;
		.item{
			width: 698px;
			height: 152px;
			background: #FFFFFF;
			border-radius: 20px;
			padding: 24px 40px;
			text-align: left;
			margin: 10px 0;
			.title {
				overflow:hidden;
                white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 36px;
				font-family: AlibabaPuHuiTiR;
				color: #333333;
			}
			.item-img {
				float:right;
				margin-top: -15px;
			}

			.content{
				font-size: 26px;
				margin-top: 8px;
				font-family: AlibabaPuHuiTiR;
				color: #999999;
			}
		}
	}
</style>