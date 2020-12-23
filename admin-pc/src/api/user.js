import { fetch, post } from '../libs/http'
// 管理员登录
export function login (params) {
	return post('home/login/login', params)
}
