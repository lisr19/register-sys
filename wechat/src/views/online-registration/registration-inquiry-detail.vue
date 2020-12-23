<template>
	<div class="page" >
		<head-bar title="报名查询"></head-bar>
		<div class="content">
            <div class="game">
	            <h2 >赛事名称: {{registInfo.match_name}}</h2>
                <!--<p class="item">报名编号：{{data[0].id}}</p>-->
                <p class="item" style="margin-top: 10px">地区：{{registInfo.area}}</p>
                 <!--<p class="item">地址：{{registInfo.address}}</p>-->
                <!-- <p class="item">学校：{{school_name}}</p> -->

            </div>
            <div class="box">
                <div class="banner">指导老师</div>
                <div class="card">
                    <ol>
                        <li>姓名：{{teacherInfo.name}}</li>
                        <li>身份证：{{teacherInfo.IDcard_code}} </li>
                        <li>手机号码：{{teacherInfo.phone}} </li>
	                    <li>身份证：
		                    <img :src="teacherInfo.IDcard_img1" alt="">
		                    <img :src="teacherInfo.IDcard_img2" alt="">
	                    </li>
                    </ol>
                </div>
            </div>
            <div class="box" v-for="item in studentInfo">
                <div class="banner">参赛学员</div>
                <div class="card">
	                <img :src="item.avator" alt="">
                    <ol>
	                    <li>姓名：{{item.name}}</li>
                         <li>身份证：{{item.IDcard_code}}</li>
                         <li>所在学校：{{item.school_name}}</li>
                         <li>所在地区：{{item.area}}</li>
	                    <li>身份证：
		                    <img :src="item.IDcard_img1" alt="">
		                    <img :src="item.IDcard_img2" alt="">
	                    </li>
                    </ol>
                </div>
                 
            </div>
		</div>
	</div>
</template>

<script>
 	import headBar from '@/components/header/head-bar'
	import { Toast } from 'vant';
	export default {
		name: 'registration-inquiry-detail',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
                data:[],
				teacherInfo:'',
				studentInfo:[],
				registInfo:'',

			};
		},
		created() {
            this.recvData();

		},
		methods: {
            recvData() {
                this.data = this.$route.query.data[0]
	            this.teacherInfo = this.data.teacher_list
	            this.registInfo = this.data.regist_info
	            this.studentInfo = this.data.student_list
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
	.content {
        margin-top: 96px;
        margin-bottom: 30px;
	}
	.game {
		width: 662px;
		padding: 20px 0;
        background: #FFFFFF;
        margin: 20px 0 20px 0;
        padding-left: 42px;
        border-radius: 20px;
        text-align: left;
        font-size: 32px;
        font-family: AlibabaPuHuiTiM;
        color: #333333;
        line-height: 44px;
		h2{
			font-size: 42px;
			font-weight: 400;
		}
        .item {
            margin-top: 10px;
            height: 36px;
            font-size: 26px;
            font-family: AlibabaPuHuiTiR;
            color: #8A8A8A;
            line-height: 39px;

        }
    }
    
    .content .box {
        width: 662px;
        background: #FFFFFF;
        border-radius: 15px;
        display: flex;
		flex-direction: column;
		align-items: center;
	    margin-top: 30px;
	    overflow: hidden;
    }
    .banner {
        text-align: left;
        padding-left: 42px;
        width: 662px;
        height: 56px;
	    line-height: 56px;
        background: #EBF5FF;
    }
    .card {
        width: 618px;
        background: #F9F9F9;
        border-radius: 16px;
        margin: 20px 0 20px 0;
	    padding: 10px 0;
	    position: relative;
	    img{
		    width: 110px;
		    position: absolute;
		    right: 0;
		    top: 0;
	    }
	    li {
		    margin: 10px 0;
		    font-size: 30px;
		    font-family: AlibabaPuHuiTiR;
		    color: #929292;
		    line-height: 42px;
		    text-align: left;
		    padding-left:20px;
		    display: flex;
		    align-items: center;
		    img{
			    position: relative;
			    margin-right: 20px;
			    width: 180px;
		    }
	    }
    }

     /*ol li:nth-child(2) {*/
         /*padding-left: 22px;*/
    /*}*/
</style>