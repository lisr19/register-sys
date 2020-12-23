<template>
	<div class="page" >
		<head-bar title="赛事简介"></head-bar>
		<div class="head-box">
			<img src="@/assets/icon/PK.png" alt="">
		</div>
		<div class="content">
			<p class="title" v-if="!dataInfo">暂无赛事</p>
			<p class="title">{{dataInfo.name}}</p>
			<div>
				<div class="time">
					<p class="area">发布时间：{{dataInfo.add_time}}</p>
					<p class="phone">更新时间：{{dataInfo.update_time}}</p>
				</div>
				<h2 style="margin-top: 20px">{{dataInfo.title}}</h2>
				<div v-html="dataInfo.content" class="txt"></div>
			</div>
		</div>

	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	import { Form } from 'vant';
	import { introduction_get } from "@/lib/API/introduction"
	export default {
		name: 'game-introduction',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				dataInfo:{},
			};
		},
		created() {
			this.introduction_get()
		},
		methods: {
			async introduction_get(params){
				let res = await introduction_get(params)
				if (res.errno === 0) {
					this.dataInfo = res.data
				} else {
					this.$toast(res.errmsg)
				}
			},
 	},
		
		
	}
</script>
<style>
	#article_content img{
		width: 100%;
	}
</style>
<style lang="less" scoped>
	.page {
		width: 750px;
		height: 1334px;
		background: #F6F7FA;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.head-box {
		margin-top: 96px;
	}
	.content {
		display: flex;
		flex-direction: column;;
		align-items: center;
		padding-top: 56px;
		margin-top: -98px;
		width: 688px;
		height: 998px;
		background: #FFFFFF;
		border-radius: 24px;
		.title {
            margin: -30px 0 30px 0;
            height: 56px;
            font-size: 42px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #333333;
            line-height: 56px;
        }
        .time {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 590px;
            background: #F8F8F8;
            border-radius: 10px;
            font-weight: 400;
            font-family: PingFangSC-Regular, PingFang SC;
            font-size: 26px;
	        padding: 20px;
            .area {
                color: #666666;
            }
            .phone {
                color: #017AFF;
	            margin-top: 10px;
            }
        }
        // .text {
        //     width: 602px;
        //     font-size: 30px;
        //     font-family: PingFangSC-Regular, PingFang SC;
        //     font-weight: 400;
        //     color: #828282;
        //     line-height: 42px;
        //     text-align: left;
        // }
		.txt {
			width: 602px;
			min-height: 576px;
			font-family: AlibabaPuHuiTiR;
			color: #3B4450;
		}
		
	}
</style>