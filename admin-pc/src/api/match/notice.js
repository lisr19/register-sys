import { fetch, post, patch, del } from '../../libs/http'

// 获取赛事通知列表
export function getList (params) {
	return fetch('home/match_notice/list', params)
}

// 添加赛事通知
export function addList (params) {
	return post('home/match_notice/add', params)
}

// 编辑赛事通知
export function editList (params) {
	return post('home/match_notice/update', params)
}

// 删除赛事通知
export function delList (params) {
	return fetch('home/match_notice/delete', params)
}






