<template>
	<div class="page" >
		<head-bar title="在线报名"></head-bar>
		<div class="content">
			<van-form @submit="formConfirm">
				<div class="game">
					<!--<img src="http://192.168.1.81:8363/static/upload_img/1607348165140pamcwwbwnm9.png" alt="" style="width: 50px;height: 50px;">-->
					<van-field required v-model="sessionTxt" label="参加赛事："  placeholder="请选择参加的赛事"
					           :rules="[{ required: true, message: '请选择参加的赛事' }]"
					           @click="showSessions" />
					<van-popup v-model="showsessions" round  position="bottom" :style="{height: '305px'}" >
						<van-picker
								show-toolbar
								:columns="columns"
								@confirm="onConfirm"
								@cancel="onCancel"
						>
							<template v-slot:columns-top>
								<div class="banner">
									<span>比赛场次</span>
									<span>报名截止</span>
									<span>比赛日期</span>
								</div>
							</template>
							<template v-slot:option="value">
								<div class="pos">{{value.area}}</div>
								<div class="pos">{{value.end_time}}</div>
								<div class="pos">{{value.match_time}}</div>
							</template>
						</van-picker>
					</van-popup>

					<van-field required v-model="typeName" label="参加组别："  placeholder="请选择参加的赛事组别"
					           :rules="[{ required: true, message: '请选择参加的赛事组别' }]"
					           @click="showType" />
					<van-popup v-model="typeShow" round  position="bottom" :style="{height: '305px'}" >
						<van-picker
								show-toolbar
								:columns="columns2"
								@confirm="onConfirm2"
								@cancel="onCancel"
						>
							<template v-slot:columns2-top>
								<div class="banner">
									<span>组别</span>
								</div>
							</template>
							<template v-slot:option="value">
								<div class="pos">{{value.name}}</div>
							</template>
						</van-picker>
					</van-popup>
					<van-field v-model="unit_name" required label="单位名称："  placeholder="请输入单位名称"
					           :rules="[{ required: true, message: '请填写单位名称' }]" maxlength="30"
					/>
					<div class="teacher" v-for="(item,index) in teacherList">
						<van-field v-model="item.name"  required label="指导老师："   placeholder="请输入指导老师"
						           :rules="[{ required: true, message: '请输入指导老师' }]"
						           maxlength="10"
						/>
						<van-field v-model="item.IDcard_code" label="老师身份证："
						           required
						           placeholder="请输入老师身份证号码"
						           maxlength="18"
						           :rules="[{ required: true, message: '请输入老师身份证号码' }]"
						/>
						<van-field v-model="item.phone"  label="手机号码："  required   placeholder="请输入手机号码"
						           :rules="[{ required: true, message: '请输入输入手机号码' }]"
						           maxlength="11"
						/>
						<div class="img-box">
							<van-field name="uploader" label="身份证照片："
							           required   :rules="[{ required: true, message: '请上传身份证照片正反面' }]"
							>
								<template #input>
									<van-uploader   v-model="item.teacherIDcardImgs" multiple :max-count="2" :after-read="afterRead" />
								</template>
							</van-field>
						</div>
					</div>
					<div class="student" v-for="(item,index) in studentList">
						<div class="line"></div>
						<van-field required v-model="item.name"  label="选手姓名："  placeholder="请输入选手姓名"
						           :rules="[{ required: true, message: '请输入选手姓名' }]"
						           maxlength="10"
						/>
						<van-field required v-model="item.area"  label="所在地区：" readonly  @click="showArea(index)"
						           placeholder="请选择选手所在地区"
						           :rules="[{ required: true, message: '请选择选手所在地区' }]"
						/>
						<van-field required v-model="item.school_name"  label="所在学校："
						           placeholder="请输入选手所在学校"
						           :rules="[{ required: true, message: '请输入选手所在学校' }]"
						           maxlength="30"
						/>
						<van-field required v-model="item.IDcard_code"  label="选手身份证："   placeholder="请输入选手身份证"
						           :rules="[{ required: true, message: '请输入选手选手身份证' }]"
						           maxlength="18"
						/>
						<div class="img-box">
							<van-field name="uploader" label="选手照片："
							           required   :rules="[{ required: true, message: '请上传选手照片' }]"
							>
								<template #input>
									<van-uploader  v-model="item.avatorImg" :max-count="1" :after-read="afterRead2"/>
								</template>
							</van-field>
						</div>
						<div class="img-box">
							<van-field name="uploader" label="身份证照片："
							           required   :rules="[{ required: true, message: '请上传选手身份证照片正反面' }]"
							>
								<template #input>
									<van-uploader  v-model="item.studentIDcardImgs" multiple :max-count="2" :after-read="afterRead3"/>
								</template>
							</van-field>
						</div>
						<!--<div class="img-box">-->
							<!--<span ><em style="color: #ee0a24">*</em>选手照片：</span>-->
							<!--<van-uploader  v-model="item.avatorImg" :max-count="1" :after-read="afterRead2"/>-->
						<!--</div>-->
						<!--<div class="img-box">-->
							<!--<span ><em style="color: #ee0a24">*</em>身份证照片：</span>-->
							<!--<van-uploader  v-model="item.studentIDcardImgs" multiple :max-count="2" :after-read="afterRead3"/>-->
						<!--</div>-->
						<!--<button class="addPlayer" @click="look">查看</button>-->
						<van-icon name="cross" size="20" class="del-btn" @click="delplayer(item,index)"/>
					</div>
				</div>
				<button class="addPlayer" @click="addplayer">
					<div class="icon"><van-icon name="plus" color="#ffffff" size=12px /></div>
					添加选手
				</button>
				<van-button  type="primary" block  native-type="submit">确定</van-button>
			</van-form>
		</div>
		<van-popup v-model="showarea" round position="bottom" :style="{ height: '40%' }" >
			<van-area :area-list="areaList"
			          :columns-num='colNum'
			          :item-height='38'
			          @confirm='confirmFn'
			          @change="changeFn"
			          @cancel="cancelFn" />
		</van-popup>

	</div>
</template>

<script>
	import headBar from '@/components/header/head-bar'
	import areaFile from "@/plugins/area";
	import {Toast,Dialog } from 'vant';
	import {getGame,registAdd } from '@/lib/API/regist'
	import {getMatchList} from '@/lib/API/comment'
	import Config from '@/Config'
	import axios from 'axios';
	export default {
		name: 'award-annuncement',
		components:{
			Toast,
			headBar,
			Dialog
		},
		data() {
			return {
				showTip:false,
				teacherList:[
					{
						name:'',
						IDcard_code:'',
						IDcard_img1:'',
						phone:''
					}
				],//老师信息列表
				teacherIDcardImgs:[],//老师身份证
				avatorImg:[],//学生照片
				studentIDcardImgs:[],//学生身份证照片
				unit_name:'',//单位
				typeName:'',//参加组别
				typeShow:false,//参加组别
				type_id:'',
				studentList:[
					{
						name:'',
						area:'',
						school_name:'',
						avator:'',
						IDcard_code:'',
						IDcard_img1:'',
					}
				],//学生信息初始化
				showarea: false,
				msg: '',
				colNum: '3' ,//省市区显示列数，3-省市区，2-省市，1-省
				province:'选择地区',
				city:'',
				county:'',
				areaList:areaFile,

				showsessions: false,
				value:'',
				sessionTxt:'',
				columns: [],
				columns2:[],
				items: [],
				text: 0,
				name:[],
				school:[],
				id:[],
				fileList: [
					// Uploader 根据文件后缀来判断是否为图片文件
					// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
					//  { url: 'https://cloud-image', isImage: true },
				],
				currentIndex:0,
				match_name:''

			}
		},
		created() {
			this.getMatchList()
		},

		methods: {
			showType(){
			 this.typeShow =true
			},
			//添加
			async registAdd(){
				let res = await registAdd()
				if (res.errno === 0) {

				}else {
					this.$toast('报名失败')
				}
			},
			//获取下拉列表
			async getMatchList(){
				let res = await getMatchList()
				if (res.errno === 0) {
					this.match_name =res.data.match_name
					this.columns =res.data.arena_list
					this.columns2 =res.data.type_list
				}
			},
			look(){

				console.log(this.studentList);
			},
			showArea(index) {
				console.log(index);
				this.currentIndex = index
				this.showarea = true;
			},
			cancelFn() {
				this.showarea = false;
				console.log('取消');
			},
			changeFn(event) {
				console.log('改变',event);
			},
			confirmFn(event){
				this.showarea = false;
				let arr,SelectProvinceName,SelectCityName,SelectCountyName;
				arr = event;
				SelectProvinceName = arr[0].name;   // 省
				SelectCityName = arr[1].name;   // 市
				SelectCountyName = arr[2].name;  // 区
				this.province = SelectProvinceName;
				this.city = SelectCityName;
				this.county = SelectCountyName;
				this.$emit('ProCityCountyVal',[SelectProvinceName,SelectCityName,SelectCountyName])
				this.studentList[this.currentIndex].area = SelectProvinceName+SelectCityName+SelectCountyName
				console.log('点击了确定按钮',SelectProvinceName,SelectCityName,SelectCountyName)
			},
			cancelFn(){
				this.showarea = false;
				console.log('点击了取消按钮');
			},

			showSessions() {
				this.showsessions = true;
			},

			onConfirm(event) {
				console.log(event);
				this.showsessions = false;
				this.sessionTxt = this.match_name+'--'+ event.area
				this.match_id = event.match_id
				this.arena_id = event.id
			},
			onConfirm2(event) {
				this.typeShow = false;
				this.typeName = event.name
				this.type_id =  event.id
			},
			onCancel() {
				this.showsessions = false;
				this.typeShow = false;
			},

			addplayer(){
				let student={
						name:'',
						area:'',
						school:'',
						ID:'',
						ID_img1:'',
						ID_img2:'',
					}
				this.studentList.push(student)
				console.log(this.studentList);
			},

			delplayer(item,index){
				console.log(index);
				this.studentList.splice(index,1)
			},

			async getGame(params) {
				let res = await getGame()
				if (res.errno === 0) {
					this.columns = res.data
				} else {
					this.$toast(res.errmsg)
				}
			},

			async registAdd(params) {
				let res = await registAdd(params)
				if (res.errno === 0) {
					// this.$toast('报名成功')
					Dialog({
						title: '报名成功',
						message: '您的报名编号为：'+res.data
					}).then(() => {
						this.$router.back()
					})
				} else {
					this.$toast(res.errmsg)
				}
			},
			formConfirm() {
				let params = {
					match_id:this.match_id,
					arena_id:this.arena_id,
					type_id:this.type_id,
					unit_name:this.unit_name,
					student_info:JSON.stringify(this.studentList),
					teacher_info:JSON.stringify(this.teacherList),
				}
				console.log(params);
				this.registAdd(params)
			},
			afterRead(file) {
				this.uploadImg(file,'teacherIDcardImgs')
			},
			afterRead2(file){
				this.uploadImg(file,'avator')
			},
			afterRead3(file){
				this.uploadImg(file,'studentIDcardImgs')
			},
			async uploadImg(file,type){
				console.log(type);
				let fd = new FormData()
				fd.append('file', file.file)
				let url = Config.imgBaseUrl
				await axios.post(url, fd, {headers: {
						'Content-Type': 'multipart/form-data'
					}}).then(res => {
						if(type==='teacherIDcardImgs'){
							this.teacherList.forEach((item,index)=>{
								if(item.teacherIDcardImgs.length===1){
									this.teacherList[index].IDcard_img1 = res.url
								}else if(item.teacherIDcardImgs.length===2){
									this.teacherList[index].IDcard_img2=res.url
								}else {
									this.teacherList[index].IDcard_img1 =''
									this.teacherList[index].IDcard_img2 =''
								}
							})
						}else if(type==='avator'){
							this.studentList.forEach((item,index)=>{
								this.studentList[index].avator = res.url
							})
						}else if(type==='studentIDcardImgs'){
							this.studentList.forEach((item,index)=>{
								if(item.studentIDcardImgs.length===1){
									this.studentList[index].IDcard_img1 = res.url
								}else if(item.studentIDcardImgs.length===2){
									this.studentList[index].IDcard_img2=res.url
								}else {
									this.studentList[index].IDcard_img1 =''
									this.studentList[index].IDcard_img2 =''
								}
							})
						}
					console.log(this.studentList);
				}).catch(err => {

				})
				// let res = await uploadImg({
				// 	file:params
				// })
				// if(res.code === 200){
				// 	this.imgUrl = res.data.url
				// }
			},
		}
	}
</script>


<style scoped>
	.page >>>.van-field__body{
		border-radius: 5px;
		border: 1px #EDEDED solid;
		background:#FCFCFC ;
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
	}
	.page >>>.van-cell{
		font-size: 28px;
		display: flex;
		align-items: center;
	}
	.page>>>.van-field__label{
		width: 168px;
	}
	.page>>>.van-cell::after{
		border-bottom: none;
	}
	.page>>>.banner {
		width: 750px;
		height: 78px;
		background: #F8F8F8;
		color: #333333;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.page>>>.van-picker-column__item{
		font-size: 20px;
	}
	.img-box>>>.van-field__body{
		height: auto;
		border: none;
		background-color: #ffffff;
	}
</style>
<style lang="less" scoped>
	.page {
		width: 750px;
		background-color: #F8F9FB;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 96px;
		margin-bottom: 50px;
		/*.img-box{*/
			/*text-align: left;*/
			/*padding-left: 15px;*/
			/*margin-top: 10px;*/
			/*display: flex;*/
			/*align-items: center;*/
			/*span{*/
				/*margin-right: 20px;*/
			/*}*/
		/*}*/
	}
	.game {
		margin: 14px 0 20px 0;
		width: 678px;
		background-color: #FFFFFF;
		box-shadow: 0px 4px 8px 0px rgba(21, 29, 96, 0.06);
		border-radius: 10px;
		font-size: 28px;
		font-family: AlibabaPuHuiTiR;
		color: #7B7B7B;
		.area {
			margin: 24px 0 40px 0;
			display: flex;
			padding-left: 28px;
		}
		.session {
			padding-left: 28px;
			display: flex;
		}
		.block {
			display: flex;
			align-items: center;
			padding-left: 44px;
			width: 408px;
			height: 60px;
			background: #FCFCFC;
			border-radius: 8px;
			border: 2px solid #E5E5E5;

			color: #A0A0A0;

		}
	}
	.line{
		background: #F8F9FB;
		height: 30px;
	}
	.student{
		border-radius: 10px;
		position: relative;
		.van-icon-cross{
			position: absolute;
			right:-15px;
			top: 15px;
			display: inline-block;
			background-color: #fff;
			border-radius: 50%;
		}
	}
	.player {
		margin-top: 20px;
		width: 678px;
		height: 494px;
		background-color: #FFFFFF;
		border-radius: 10px;
		font-size: 28px;
		font-family: AlibabaPuHuiTiR;
		color: #7B7B7B;
		line-height:40px;
		.number {
			display: flex;
			margin : 30px;
			align-items: flex-start;
			.add {
				margin-left: 10px;
			}
		}
		.block {
			display: flex;
			align-items: center;
			padding-left: 44px;;
			width: 408px;
			height: 60px;
			border-radius: 8px;
			color: #333333;
			background: #FCFCFC;
			border: 2px solid #EDEDED;
		}
	}
	.addPlayer {
		width: 214px;
		height: 54px;
		margin:40px 446px 0 0;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 28px;
		border: 2px solid #ECECEC;
		font-size: 28px;
		font-family: AlibabaPuHuiTiM;
		color: #298DF7;
		line-height: 40px;
	}
	.icon {
		margin: 26px;
		width: 28px;
		height: 28px;
		background: #298DF7;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

</style>
<style>
	.add .van-uploader__upload {
		background-color: #F1F1F1;
		width: 148px;
		height: 148px;
	}
	.van-button--primary {
		width: 666px;
		background: #2EADFB;
		border-radius: 28px;
		font-size: 36px;
		font-family: AlibabaPuHuiTiM;
		color: #FFFFFF;
		line-height: 50px;
		border: none;
		margin-top: 150px;
	}
	.area .van-picker__confirm {
		color: #017AFF;
	}

	.area .van-picker-column__item {
		height: 78px;
		background: #E3F4FF;

		font-size: 28px;
		font-family: AlibabaPuHuiTiR;
		color: #666666;
		line-height: 40px;
	}

	.pos {
		width: 33.33%;
	}
	.van-picker-column__item--selected {
		background: #d6f7ff;
		color: red;
	}
</style>