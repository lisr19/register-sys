<template>
	<div class="page" >
		<head-bar title="赛事动态"></head-bar>
        <div class="content">
	        <div class="tip" v-if="newsList.length===0">暂无动态</div>
            <div class="items">
                <div class="item" v-for="item in newsList">
                    <div class="title">{{item.title}}</div>
                    <div class="time">
                        <div class="blue">更新时间：{{item.update_time}}</div>
                        发布时间：{{item.add_time}}
                    </div>
	                <div v-html="item.content"></div>
                </div>
            </div>
        </div>

	</div>
</template>

<script>
     import headBar from '@/components/header/head-bar'
     import {news_get} from "@/lib/API/introduction"
	import {Toast } from 'vant';
	export default {
		name: 'award-annuncement',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				newsList:[]
			}
		},
		created() {
            this.news_get()
		},
		methods: {
            async news_get(params) {
                let res = await news_get(params)
                if (res.errno === 0) {
                    this.newsList = res.data;
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
	.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 96px;
		.tip{
			margin-top: 60px;
			font-size: 38px;
		}
    }
	.items{
		margin-top: 20px;
		.item {
            width: 708px;
            font-size: 28px;
            font-family: AlibabaPuHuiTiR;
            color: #585858;
            line-height: 40px;
            border-radius: 20px;
			text-align: left;
			margin-bottom:20px;
			background-color: #ffffff;
			padding: 24px;
            .title {
                height: 50px;
                font-size: 36px;
                font-family: AlibabaPuHuiTiM;
                color: #333333;
                line-height: 50px;
                font-weight: 500;

            }

			.time {
                margin: 10px 0 10px 0;
                font-size: 24px;
                font-family: AlibabaPuHuiTiR;
                color: #888888;
                line-height: 34px;
                .blue {
                    color: #017AFF;
                    height: 32px;
                }
			}
		}
	}
</style>