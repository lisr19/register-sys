import { fetch, post, patch, del } from '../http'

export function match_grade (params) {
	return post('match_grade/info',params)
}

export function registFind (params) {
	return post('match_regist/info',params)
}