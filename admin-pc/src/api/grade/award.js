import { fetch, post, patch, del } from '../../libs/http'

// 获取获奖列表
export function getList (params) {
	return fetch('home/match_publish/list', params)
}

// 添加获奖信息
export function addList (params) {
	return post('home/match_publish/add', params)
}

// 编辑获奖信息
export function editList (params) {
	return post('home/match_publish/update', params)
}

// 删除获奖信息
export function delList (params) {
	return fetch('home/match_publish/delete', params)
}

// 获取下拉列表
export function getMatchList (params) {
	return fetch('home/match/ids', params)
}




