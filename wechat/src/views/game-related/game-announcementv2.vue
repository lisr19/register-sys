<template>
	<div class="page" >
		<head-bar title="赛事通知"></head-bar>
        <div class="content">
            <div class="items">
                <div class="item" v-for="item in list" @click="checkDetail(item)" >                    
                    <div class="banner">
                        <span class="name">{{item.title}}</span>
                        <span class="time">{{item.update_time}}</span>
                    </div>
                    <div class="details">
	                    <article v-html="item.content"></article>
                        <!--<div  class="title" v-text="item.content"></div>-->
                        <p class="add-time">地址：{{item.address}}</p>
                        <p>电话：{{item.phone}}</p>
                    </div>
                </div>
            </div>
	        <div class="null" v-if="list.length===0">暂无通知</div>
        </div>

	</div>
</template>

<script>
    import headBar from '@/components/header/head-bar'
    import {notice_get} from "@/lib/API/introduction"
	import {Toast } from 'vant';
	export default {
		name: 'award-annuncement',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
				list:[]
			}
		},
		created() {
          //  this.list=[]
            this.notice_get()
		},
		methods: {
            async notice_get(params) {
                let res = await notice_get(params)
                if (res.errno === 0) {
                    this.list=res.data;
                } else {
                    this.$toast(errmsg)
                }
            },

            checkDetail(item) {
                this.$router.push({
                    name:'赛事通知详情',
                    params: {
                        title: item.title,
                        update_time: item.update_time,
                        add_time: item.add_time,
                        content: item.content,
                       address: item.address,
                       phone: item.phone
                    }
                })
            }
            
		}
	}
</script>

<style lang="less" scoped>
	.page {
		width: 750px;
        background: #F6F7FA;
	}
	.content {
        display: flex;
        flex-direction: column;
        align-items: center;
		justify-content: center;
        margin-top: 96px;
		background-color: #F6F7FA;
    }
	.items{
        margin-top: 26px;
		.item {
			margin: 15px 0 40px 0;
            width: 668px;
            height: 278px;
            font-family: PingFangSC-Regular, PingFang SC;            
			text-align: left;
			.banner {
                width: 688px;
                height: 82px;
				line-height: 82px;
                background: #1C78B0;
                border-radius: 5px;
				display: flex;
				justify-content: space-between;
				align-items: center;
                .name {
                    margin: 0 30px 0 24px;
	                flex: 2;
	                box-sizing: content-box;
	                overflow: hidden;
                    height: 44px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 32px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    color: #FFFFFF;
                    line-height: 44px;
                    text-shadow: 0px 4px 8px #0E6488;
                }
                .time {
                    font-size: 28px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 40px;
                    margin-right: 24px;
                }
            }
            .details {
                width: 688px;
                background: #FFFFFF;
                border-radius: 24px;
                display: flex;
                flex-direction: column;
                padding: 28px 24px;
                .title {
                    font-size: 32px;
                    color: #333333;
	                font-weight: 600;
	                text-overflow: -o-ellipsis-lastline;
	                overflow: hidden;
	                text-overflow: ellipsis;
	                display: -webkit-box;
	                -webkit-line-clamp: 2;
	                line-clamp: 2;
	                -webkit-box-orient: vertical;
                }
	            .add-time{
		            margin-top: 10px;
	            }
	            article{
		            font-size: 32px;
		            color: #333333;
		            font-weight: 600;
		            text-overflow: -o-ellipsis-lastline;
		            overflow: hidden;
		            text-overflow: ellipsis;
		            display: -webkit-box;
		            -webkit-line-clamp: 2;
		            line-clamp: 2;
		            -webkit-box-orient: vertical;
	            }
            }


		}
	}
</style>