import { fetch, post, patch, del } from '../../libs/http'

// 获取用户列表
export function getList (params) {
	return fetch('home/user/list', params)
}




