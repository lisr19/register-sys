import { fetch, post, patch, del } from '../http'

export function getGame (params) {
	return fetch('match_regist/get_match_info',params)
}

export function registAdd(params) {
    return post('match_regist/add',params)
}

export function regist_find(params) {
    return post('match_regist/find_info',params)
}

export function match_arena(params) {
    return fetch('match_regist/match_arena',params)
}
