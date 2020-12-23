import { fetch, post, patch, del } from '../../libs/http'

// 获取赛事动态列表
export function getList (params) {
	return fetch('home/match_news/list', params)
}

// 添加赛事动态
export function addList (params) {
	return post('home/match_news/add', params)
}

// 编辑赛事动态
export function editList (params) {
	return post('home/match_news/update', params)
}

// 删除赛事动态
export function delList (params) {
	return fetch('home/match_news/delete', params)
}

// 获取赛事下拉列表
export function getMatchList (params) {
	return fetch('home/match/ids', params)
}




