import { fetch, post, patch, del } from '../http'

export function introduction_get (params) {
	return fetch('match/info',params)
}
export function notice_get (params) {
	return fetch('match_notice/info', params)
}
export function news_get (params) {
	return fetch('match_news/info', params)
}