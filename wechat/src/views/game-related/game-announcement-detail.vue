<template>
	<div class="page" >
		<head-bar title="赛事通知"></head-bar>
        <div class="content">
          <p class="title">
              {{title}}
          </p>
          <!-- <p class="time">
              {{time}}
              </p> -->
          <div class="banner">
              <p class="area">发布时间：{{add_time}}</p>
              <p class="phone">更新时间：{{update_time}}</p>
          </div>
          <div class="txt" v-html="content"></div>
	        <p>地址：{{dataInfo.address}}</p>
	        <p>电话{{dataInfo.phone}}</p>
        </div>

	</div>
</template>

<script>
     import headBar from '@/components/header/head-bar'
	import {Toast } from 'vant';
	export default {
		name: 'award-annuncement-detail',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
                title:'',
                // time:'',
                content:'',
                add_time:'',
                update_time:'',
				dataInfo:{}
			}
		},
		created() {
			this.dataInfo = this.$route.params
            this.getParams();
		},
		methods: {
          getParams() {
	            this.title = this.$route.params.title;
                this.time = this.$route.params.time;
                this.content = this.$route.params.content;
                this.add_time = this.$route.params.add_time;
                this.update_time = this.$route.params.update_time;
            }
    
		}
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
	.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 126px;
        margin-bottom: 30px;
		padding-bottom: 30px;
        width: 662px;
        background: #FFFFFF;
        border-radius: 20px;
        .title {
            margin: 40px 0 8px 0;
            height: 56px;
            font-size: 40px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 56px;

        }
        .time {
            height: 34px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #828386;
            line-height: 34px;
        }
        .banner {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 590px;
            height: 132px;
            background: #F8F8F8;
            border-radius: 10px;
            font-weight: 400;
            font-family: PingFangSC-Regular, PingFang SC;
            font-size: 30px;
            line-height: 42px;
            margin: 28px 0 28px 0;
            .area {
                margin: 18px 0 12px 30px;
                color: #666666;
                height: 42px;

            }
            .phone {
                margin-left: 30px;
                color: #017AFF;
                height: 42px;



            }
        }
        .txt {
            width: 602px;
            font-size: 30px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #828282;
            line-height: 42px;
            text-align: left;
        }
    }
</style>