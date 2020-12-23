import { fetch, post, patch, del } from '../../libs/http'

// 获取用户列表
export function getList (params) {
	return fetch('home/account/list', params)
}

// 添加用户数据
export function addList (params) {
	return post('home/account/add', params)
}

// 编辑用户数据
export function editList (params) {
	return post('home/account/update_password', params)
}

// 删除用户数据
export function delList (params) {
	return fetch('home/account/delete', params)
}






