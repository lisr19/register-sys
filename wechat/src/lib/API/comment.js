import { fetch, post } from '../http'
// 上传图片
// export function uploadImg (params) {
//     return post('file/upload', params)
// }

// 获取赛事信息、赛场、赛事类型下拉列表
export function getMatchList (params) {
	return fetch('match_regist/match_arena', params)
}






















