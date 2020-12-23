<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="赛事类型"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="赛事类型"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import {getData} from '@/api/comment'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      statistics:{},
      inforCardData: [],
      pieData: [{value: 3, name: '小学组'},
      {value: 3, name: '初中组'},
      {value: 3, name: '高中组'}
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  created () {
    this.createData()
  },
  methods: {
      async createData (params){
        let res = await getData(params)
				if (res.errno === 0) {
          this.statistics = res.data
          // console.log(this.statistics);
				} else {
					this.$Message.error(res.data)
        }
        console.log(this.statistics.type_info[0].count)
        this.inforCardData.push({ title: '关注人数', icon: 'md-person-add', count: this.statistics.concerned_num, color: '#2d8cf0' })
        this.inforCardData.push({ title: '报名人数', icon: 'md-person-add', count: this.statistics.regist_num, color: '#19be6b' })
        this.inforCardData.push({ title: '赛事数量', icon: 'md-map', count: this.statistics.match_num, color: '#ff9900' })
        this.inforCardData.push({ title: '赛场数量', icon: 'md-locate', count: this.statistics.arena_num, color: '#ed3f14' })
        // this.pieData.push({ value: 123123, name: '学组' })
        // this.pieData.push({ value: this.statistics.type_info[1].count, name: '初中组' })
        // this.pieData.push({ value: this.statistics.type_info[2].count, name: '高中组' })
      }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
