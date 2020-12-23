import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '首页',
		component: home
	},
	{
		path: '/award-announcement',
		name: '获奖公布',
		component: () => import('@/views/game-service/award-announcement/award-announcement.vue')
	},
	{
		path: '/award-announcement-details',
		name: '获奖公布详情',
		component: () => import('@/views/game-service/award-announcement/award-announcement-details.vue')
	},
	{
		path: '/score-query',
		name: '成绩查询',
		component: () => import('@/views/game-service/score-query/score-query.vue')

	},
	{
		path: '/score-query-content',
		name: '成绩查询详情',
		component: () => import('@/views/game-service/score-query/score-query-content.vue')
	},
	{
		path: '/game-introduction',
		name: '大赛简介',
		component: () => import('@/views/game-related/game-introduction.vue')
	},
	
	// {
	// 	path: '/game-announcement',
	// 	name: '赛事通知',
	// 	component: () => import('@/views/game-related/game-announcement.vue')
	// },
	{
		path: '/game-announcementv2',
		name: '赛事通知',
		component: () => import('@/views/game-related/game-announcementv2.vue')
	},
	{
		path:'/game-announcement-detail',
		name: '赛事通知详情',
		component: () => import('@/views/game-related/game-announcement-detail.vue')
	},
	{
		path: '/game-news',
		name: '赛事动态',
		component: () => import('@/views/game-related/game-news.vue')
	},
	{
		path: '/online-registration',
		name: '在线报名2',
		component: () => import('@/views/online-registration/online-registration.vue')
	},
	{
		path: '/registration',
		name: '在线报名',
		component: () => import('@/views/online-registration/registration.vue')
	},
	{
		path:'/registration-inquiry',
		name: '报名查询',
		component: () => import('@/views/online-registration/registration-inquiry.vue')
	},
	{
		path:'/registration-inquiry-detail',
		name:'报名查询详情',
		component: () => import('@/views/online-registration/registration-inquiry-detail.vue')
	},
	{
		// 编辑器
		path: '/write',
		name: 'Write',
		meta: { keepAlive: true },
		component: (resolve) => require(['@/components/write/write.vue'], resolve),
	},
]

const router = new VueRouter({
	routes
})

export default router
