import { fetch, post, patch, del } from '../http'

// 上传图片
export function publish_get (params) {
    return post('match_publish/info', params)
}

