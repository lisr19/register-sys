import { fetch, post, patch, del } from '../../libs/http'

// 获取赛场信息列表
export function getList (params) {
	return fetch('home/match_arena/list', params)
}

// 添加赛场信息
export function addList (params) {
	return post('home/match_arena/add', params)
}

// 编辑赛场信息
export function editList (params) {
	return post('home/match_arena/update', params)
}

// 删除赛场信息
export function delList (params) {
	return fetch('home/match_arena/delete', params)
}

// 获取下拉列表
export function getMatchList (params) {
	return fetch('home/match/ids', params)
}