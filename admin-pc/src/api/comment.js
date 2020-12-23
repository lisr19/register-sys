import { fetch, post } from '../libs/http'

// 管理员登录
export function login (params) {
	return post('home/login/login', params)
}

// 赛事类型下拉列表
export function getTypeList (params) {
	return fetch('home/match_type/ids', params)
}

// 获取主页数据
export function getData (params) {
	return fetch('home/statistics/statistics', params)
}