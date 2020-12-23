import { fetch, post, patch, del } from '../../libs/http'

// 获取赛事类型列表
export function getList (params) {
	return fetch('home/match_type/list', params)
}

// 添加赛事类型
export function addList (params) {
	return post('home/match_type/add', params)
}

// 编辑赛事类型
export function editList (params) {
	return post('home/match_type/update', params)
}

// 删除赛事类型
export function delList (params) {
	return fetch('home/match_type/delete', params)
}






