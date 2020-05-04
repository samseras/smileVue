import axios from 'axios'
// import store from './store'

// 此处为axios配置请求头，
axios.interceptors.request.use(
  config => {
    // 此处做请求拦截，如果有需要
    // let token = localStorage.getItem('token') || ''
    // if (!config.url.includes('login') || !config.url.includes('register')) {
    //   config.headers = {
    //     'content-type': 'application/json',
    //     'Authorization': token
    //   }
    // }
    if (config.url.includes('logout')) {
      config.headers = {
        'content-type': 'application/x-www-form-urlencoded'
        // 'Authorization': token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.request.status === 200) {
      // if (response.data) {
      return response.data
    }
    return response
  },
  error => { // 失败判断
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (!error.response.config.url.includes('login')) {
            // store.dispatch('logout').then(() => location.reload())
          }
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
