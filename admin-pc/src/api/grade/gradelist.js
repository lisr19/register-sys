import { fetch, post, patch, del } from '../../libs/http'

// 获取成绩列表
export function getList (params) {
	return fetch('home/match_grade/list', params)
}

// 获取下拉列表
export function getMatchList (params) {
	return fetch('home/match/ids', params)
}

// 获取人物信息
export function getInfo (params) {
	return fetch('home/match_grade/regist_info', params)
}

// 添加详细信息
export function getDetail (params) {
	return fetch('home/match_grade/detail', params)
}

// 添加成绩信息
export function addList (params) {
	return post('home/match_grade/add', params)
}

// 编辑成绩信息
export function editList (params) {
	return post('home/match_grade/update', params)
}

// 删除成绩信息
export function delList (params) {
	return fetch('home/match_grade/delete', params)
}

// 删除成绩信息
export function getTypeList (params) {
	return fetch('home/match_type/ids', params)
}





