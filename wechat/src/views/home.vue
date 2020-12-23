<template>

	<div class="items">
		<van-button type="info" class="item" v-for="item in typeList" @click="openPage(item)">{{item.name}}</van-button>
	</div>
	
</template>

<script>
	import areaFile from '@/plugins/area.js'
		export default {
		data() {
			return {
				items : [],
				text : 0,
				typeList:[
					{name:'大赛简介'},
					{name:'赛事动态'},
					{name:'赛事通知'},
					{name:'获奖公布'},
					{name:'成绩查询'},			
					{name:'在线报名'},
					{name:'报名查询'}
				],//跳转页面
				show: false,
				msg: '',
				colNum: '3' ,//省市区显示列数，3-省市区，2-省市，1-省
				city:'请选择',
				county:'请选择',
				areaList:areaFile
			}
		},
		
		methods: {
			openPage(item){
				this.$router.push({name:item.name})
			},
			addTest : function(){
					this.items.push(this.text++)
			},
			deleteTest : function(){
				this.items.pop(this.text)
			},
				result : function(){
					for(var i=0 ; i<vm.items.length; i++){
						console.log($("#name"+i).val() + "  " + $("#age"+i).val() + "  " + $("#sex"+i).val())
					}
				}
				
		}
	}
</script>

<style scoped lang="less">
	.items{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.item{
			margin: 20px;
			width: 100%;
			border-radius: 15px;
		}
	}
</style>