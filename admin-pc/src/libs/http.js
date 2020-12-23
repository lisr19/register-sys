import axios from 'axios'
import qs from 'qs'
import Config from '@/config'
const baseUrl = Config.baseUrl.dev
// const baseUrl =
// process.env.NODE_ENV === 'development'
//   ? Config.baseUrl.dev
//   : Config.baseUrl.pro
axios.defaults.timeout = 30000
axios.defaults.baseURL = baseUrl

// http request 拦截器
axios.interceptors.request.use(
	(config) => {
		// 若是有token , 就给头部授权带上token
		if (localStorage.token) {
			config.headers.authorization = localStorage.token
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		return Promise.reject(error)
	}
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, data) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, { params: data })
			.then((response) => {
				resolve(response)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del (url, data) {
	return new Promise((resolve, reject) => {
		axios
			.delete(url, { params: data })
			.then((response) => {
				resolve(response)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data) {
	let formData = new FormData()
	for (let key in data) {
		formData.append(key, data[key])
	}
	return new Promise((resolve, reject) => {
		axios.post(url, formData).then(
			(response) => {
				resolve(response)
			},
			(err) => {
				reject(err)
			}
		)
	})
}

/**
 * 封装post请求(JSON)
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post4JSON (url, data) {
	let config = {
		data: '',
		headers: {}
	}
	// 序列化
	config.data = qs.stringify(data)
	// 设置请求头的content-type
	config.headers = {
		'Content-Type': 'application/json'
	}
	return new Promise((resolve, reject) => {
		axios.post(url, data, config).then(
			(response) => {
				resolve(response)
			},
			(err) => {
				reject(err)
			}
		)
	})
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data) {
	let formData = new FormData()
	for (let key in data) {
		formData.append(key, data[key])
	}
	return new Promise((resolve, reject) => {
		axios.patch(url, formData).then(
			(response) => {
				resolve(response)
			},
			(err) => {
				reject(err)
			}
		)
	})
}
