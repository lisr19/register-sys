import { fetch, post, patch, del } from '../../libs/http'

// 获取报名列表
export function getList (params) {
	return fetch('home/match_regist/list', params)
}

// 获取详情
export function getDetail (params) {
	return fetch('home/match_regist/detail', params)
}

// 添加报名信息
export function addList (params) {
	return post('home/match_regist/add', params)
}

// 编辑报名信息
export function editList (params) {
	return post('home/match_regist/update', params)
}

// 删除报名信息
export function delList (params) {
	return fetch('home/match_regist/delete', params)
}

// 获取赛事下拉列表
export function getMatchList (params) {
	return fetch('home/match/ids', params)
}

// 获取赛场赛事类型下拉列表
export function getTypeAndArea (params) {
	return fetch('home/match_regist/arena_ids', params)
}

// 上传照片
export function uploadPic (params) {
	return post('file/upload', params)
}

// 获取详情
export function getDetailForEdit (params) {
	return fetch('home/match_regist/detail', params)
}
