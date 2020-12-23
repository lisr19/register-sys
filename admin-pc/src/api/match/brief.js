import { fetch, post, patch, del } from '../../libs/http'

// 获取赛事简介列表
export function getList (params) {
	return fetch('home/match/list', params)
}

// 添加赛事简介
export function addList (params) {
	return post('home/match/add', params)
}

// 编辑赛事简介
export function editList (params) {
	return post('home/match/update', params)
}

// 删除赛事简介
export function delList (params) {
	return fetch('home/match/delete', params)
}







