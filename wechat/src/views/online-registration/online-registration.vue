<template>
	<div class="page" >
		<head-bar title="在线报名"></head-bar>
    <div class="content">
            <div class="game">
                <!-- <div class="area">
                    所在地区：
                    <button class="block" is-link @click="showArea">{{province}} {{city}} {{county}}</button>
                    <van-popup v-model="showarea" round position="bottom" :style="{ height: '40%' }" >
                    <van-area :area-list="areaList" 
                        :columns-num='colNum' 
                        :item-height='38' 
                        @confirm='confirmFn' 
                        @change="changeFn" 
                        @cancel="cancelFn" />
                    </van-popup>  
                </div> -->
                <div class="area">
                    比赛名称：
                    <button class="block">{{match_name}}</button>
                </div>
                <div class="area">    
                    比赛场次：
                    <button class="block" is-link @click="showSessions">{{session}}</button> 
                    <van-popup v-model="showsessions" round  position="bottom" :style="{height: '415px'}" >
                        <van-picker  
                            show-toolbar
                            :columns="arena_list"
                            @confirm="onConfirm_arena"
                            @cancel="onCancel_arena"
                            >
                            <template v-slot:columns-top>
                                <div class="banner">
                                    <span>参赛地址</span>
                                    <!-- <span>报名开始</span> -->
                                    <span>截至日期</span>
                                </div>
                            </template>
                            <template v-slot:option="value">
                                <div class="pos">{{value.area}} {{value.address}}</div>
                                 <!-- <div class="pos">{{value.start_time}}</div> -->
                                 <div class="pos">{{value.end_time}}</div>
                               
                               
                            </template>
                        </van-picker>
                    </van-popup>
                </div>
                <div class="area">    
                    赛事类型：
                    <button class="block" is-link @click="showTypes">{{type}}</button> 
                    <van-popup v-model="showtypes" round  position="bottom" :style="{height: '415px'}" >
                        <van-picker  
                            show-toolbar
                            :columns="type_list"
                            @confirm="onConfirm_type"
                            @cancel="onCancel_type"
                            value-key="name"
                        >
                            
                        </van-picker>
                    </van-popup>
                </div>
                <div class="area">    
                    单位名称：
                      <input class="block" type="text" v-model="unit_name" placeholder="请输入单位名称" />
                </div>
            </div>
            <div class="people"> 
                <van-field
					v-model="teacher.name"
					name="teacher_name"
					required
					label="指导老师："
					placeholder="输入老师姓名"
					:rules="[{ required: true, message: '请输入老师姓名' }]"
				/>
                <van-field
					v-model="teacher.phone"
                    type="number"
					name="teacher_phone"
					required
                    maxlength="11"
					label="手机号码："
					placeholder="输入老师手机号码"
					:rules="[{ required: true, message: '请输入老师手机号码' }]"
				/>
                <van-field
					v-model="teacher.ID"
					name="teacher_id"
					maxlength="18"
					label="身份证号："
					placeholder="输入身份证号码"
					:rules="[{ required: true, message: '请输入身份证号码' }]"
				/>
                <div class="number">
                    身份证照(正反）：
                    <div class="add">
                        <van-uploader v-model="teacher_id_photo" multiple :max-count="2"/>
                    </div>
                </div>
            </div>
            <div class="people"  v-for="(item,index) in student_info">             
                <van-field
					v-model="student_info[index].name"
					name="name"
					required
					label="选手姓名："
					placeholder="输入选手姓名"
					:rules="[{ required: true, message: '请输入选手姓名' }]"
				/>
                <van-field
					v-model="student_info[index].area"
					name="name"
					required
					label="所在地区"
					placeholder="输入所在地区"
					:rules="[{ required: true, message: '请输入所在地区' }]"
				/>
                <van-field
					v-model="student_info[index].school_name"
					name="name"
					required
					label="所在学校："
					placeholder="输入学校名称"
					:rules="[{ required: true, message: '请输入学校名称' }]"
				/>
                <div class="number">
                    上传头像：
                    <div class="add">
                        <van-uploader v-model="student_info[index].avator" multiple :max-count="1"/>
                    </div>
                </div>
                <van-field
					v-model="student_info[index].IDcard_code"
					name="name"
					required
                    maxlength="18"
					label="身份证号："
					placeholder="输入身份证号"
					:rules="[{ required: true, message: '请输入身份证号' }]"
				/>
                 <div class="number">
                    身份证照(正反）：
                    <div class="add">
                        <van-uploader v-model="student_info[index].ID_img" multiple :max-count="2"/>
                    </div>
                </div>
            </div>
    </div>
            
        <button class="addPlayer" v-on:click="addplayer">
                    <div class="icon">
                        <van-icon name="plus" color="#ffffff" size=12px />
                    </div>
                    添加选手
        </button>  
        
        <van-button type="primary" block v-on:click="submit">确定</van-button>
	</div>
</template>

<script>
    import headBar from '@/components/header/head-bar'
    import areaFile from "@/plugins/area.js";
    import {Toast } from 'vant';
    import {Field} from 'vant'
    import {match_arena} from '@/lib/API/regist'
    import {register_add} from '@/lib/API/regist'
    import {uploadImg} from '@/lib/API/comment'

	export default {
		name: 'award-annuncement',
		components:{
			Toast,
			headBar,
		},
		data() {
			return {
                match_id:'12345',
                match_name:'人工智能大赛',
                type_list:[
                    {
                    id: '1',
                        name: '小学组',
                        add_time: '2020-10-27 17:10:00',
                        update_time: '2020-10-27 17:10:00'
                    },
                    {
                        id: '2',
                        name: '初中组',
                        add_time: '2020-10-27 17:10:00',
                        update_time: '2020-10-27 17:10:00'
                    },
                    {
                        id: '3',
                        name: '高中组',
                        add_time: '2020-10-27 17:10:00',
                        update_time: '2020-10-27 17:10:00'
                    }
                ],
                arena_list:[
                    {
                        id: '28',
                        match_id: '12348',
                        area: '广州',
                        address: '番禺大学城',
                        end_time: '2020-11-30 12:00:00',
                        add_time: '2020-12-05 11:02:54',
                        update_time: '2020-12-05 11:02:54'
                    },
                    {
                        id: '29',
                        match_id: '12348',
                        area:'中山',
                        address: '东区孙文公园',
                        end_time: '2020-11-30 12:00:00',
                        add_time: '2020-12-05 11:04:52',
                        update_time: '2020-12-05 11:04:52'
                    }
                ],



                arena_id:'',
                type_id:'',
                unit_name:'',
                student_info:[{
                    name:'',
                    area:'',
                    school_name:'',
                    avator:[],
                    IDcard_code:'',
                    ID_img:[]
                    // IDcard_img1:'',
                    // IDcard_img2:''
                }
                    

                ],
                teacher_info:[],

                
                // showarea: false,
                // msg: '',
                // colNum: '3' ,//省市区显示列数，3-省市区，2-省市，1-省
                // province:'选择地区',
                // city:'',
                // county:'',
                // areaList:areaFile,

                showsessions: false,
                value:'',
                session:'选择场次',
               
               showtypes: false,
               typevalue:'',
               type:'选择类型',

                teacher: {
                    name:'',
                    ID:'',
                    ID_img:[],
                    phone:''
                },
               
                text: 0,
                name:[],
                school:[],
                id:[],
                teacher_id_photo: [
                        // Uploader 根据文件后缀来判断是否为图片文件
                        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                    //  { url: 'https://cloud-image', isImage: true },
                    ],
                
			}
		},
		created() {
           // this.match_arena()
        },
        
		methods: {
           async match_arena(params) {
                let res = await match_arena(params) 
                if (res.errno === 0) {
                    this.match_id = res.data.match_id
                    this.match_name = res.data.match_name
                    this.arena_list = res.data.arena_list
                    this.type_list = res.data.type_list
                } else {
                    this.$toast(res.errmsg)
                }
            },
            async regist_add() {
                let params = {
                    match_id:this.match_id,
                    arena_id:this.arena_id,
                    type_id:this.type_id,
                    unit_name:this.unit_name,
                    student_info:[],
                    teacher_info:[]
                }
                let res = await register_add(params) 
                if (res.errno === 0) {
					this.$toast("报名成功")
                } else {
                    this.$toast(res.errmsg)
                }
            },
            // showArea() {
            //     this.showarea = true;
            // },
            // cancelFn() {
            //     this.showarea = flase;
            //     console.log('取消');
            // },
            // changeFn(event) {
            //     console.log('改变',event);
            // },
            // confirmFn(event){
            //     this.showarea = false;
            //     let arr,SelectProvinceName,SelectCityName,SelectCountyName;
            //     arr = event;
            //     SelectProvinceName = arr[0].name;   // 省
            //     SelectCityName = arr[1].name;   // 市
            //     SelectCountyName = arr[2].name;  // 区
            //     this.province = SelectProvinceName;
            //     this.city = SelectCityName;
            //     this.county = SelectCountyName;
            //     this.$emit('ProCityCountyVal',[SelectProvinceName,SelectCityName,SelectCountyName])
            //     console.log('点击了确定按钮',SelectProvinceName,SelectCityName,SelectCountyName)
            // },
            // cancelFn(){
            //     this.showarea = false;
            //     console.log('点击了取消按钮');
            // },

            showSessions() {
                this.showsessions = true;
            },
            
            onConfirm_arena(event) {
                this.showsessions = false;
                let arr;
                arr = event;
                this.session = arr.area + ' ' + arr.address ;
                this.arena_id = arr.id;
                console.log('设置了arena_id为'+this.arena_id);
                console.log('unitname = '+ this.unit_name);
            },
            onCancel_arena() {
                this.showsessions = false;
            },
            showTypes() {
                this.showtypes = true;
            },
            onCancel_type() {
                this.showtypes = false;
            },
            onConfirm_type(event) {
                this.showtypes = false;
                let ar;
                ar = event;
                this.type = ar.name;
                this.type_id = ar.id;
                console.log('设置了type_id为'+this.type_id);
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                this.$refs.goodsImg.src = file.content;
                this.form.orgCodePath = file.content;
            },
            addplayer : function () {
                this.student_info.push( {
                    name:'',
                    area:'',
                    school_name:'',
                    avator:[],
                    IDcard_code:'',
                    // IDcard_img1:'',
                    // IDcard_img2:''
                    ID_img:[]

                }
                );
                this.text++;
            },

          
            submit() {
                this.regist_add()
            }
        }
	}
</script>



<style lang="less" scoped>
	.page {
		width: 750px;
		height: 1334px;
        background-color: #F8F9FB;
        display: flex;
        flex-direction: column;
        align-items: center;
	}
	.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 96px;
    }
    .game {
        margin: 14px 0 20px 0;
        //padding: 14px 0 0 0px;
        
        width: 678px;
        //height: 212px;
        background-color: #FFFFFF;
        box-shadow: 0px 4px 8px 0px rgba(21, 29, 96, 0.06);
        border-radius: 10px;


        font-size: 28px;
        font-family: AlibabaPuHuiTiR;
        color: #7B7B7B;
        line-height: 40px;
        .area {
            margin: 24px 0 40px 0;
            display: flex;
            padding-left: 28px;
            .banner {
                width: 750px;
                height: 78px;
                background: #F8F8F8;
                color: #333333;
                display: flex;
                justify-content: space-around;
                align-items: center;
                
            }
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
    .people {
        margin-top: 20px;
        width: 678px;
        // height: 494px;
        background-color: #FFFFFF;
        border-radius: 10px;

        font-size: 28px;
        font-family: AlibabaPuHuiTiR;
        color: #7B7B7B;
        line-height:40px;
        
        
        
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
    .number {
            display: flex;
            margin : 10px;
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
        
</style>
<style>
.add .van-uploader__upload {
    background-color: #F1F1F1;
    width: 148px;
    height: 148px;
}   
.van-button--primary {
    width: 666px;
    height: 96px;
    background: #2EADFB;
    border-radius: 28px;

    font-size: 36px;
    font-family: AlibabaPuHuiTiM;
    color: #FFFFFF;
    line-height: 50px;
    border: none;
    margin-top: 350px; 
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
    width: 50%;
   /* // overflow:hidden; */
                white-space: nowrap;
				/* text-overflow: ellipsis; */
}
.van-picker-column__item--selected {
     background: #E3F4FF;
}
.van-field__label {
    margin-right: 0px;
    width: 30;
}
.van-field__control {
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
</style>

