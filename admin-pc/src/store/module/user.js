import {login} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    token: getToken(),
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
  },
  getters: {

  },
  actions: {
	  // 登录
	  handleLogin ({ commit }, { userName, password }) {
		  userName = userName.trim()
		  let params = {
			  account: userName,
			  password: password
		  }
		  return new Promise((resolve, reject) => {
			  login(params).then((res) => {
				  if (res.errno === 0) {
					  // 登录成功
					  const data = res.data
					  commit('setToken', data.token)
					  // commit('setName', data.account)
					  // commit('setAccountId', data.id)
					  localStorage.setItem('token', data.token)
					  localStorage.setItem('account_name', data.account)
					  localStorage.setItem('account_id', data.id)
				  }
				  resolve(res)
			  }).catch((err) => {
				  reject(err)
			  })
		  })
	  },
	  // 退出登录
	  handleLogOut ({ state, commit }) {
		  //   如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
		  commit('setToken', '')
		  localStorage.clear()
		  // commit('setAccess', [])
		  // resolve()
		  // })
	  },
  }
}
