import CONFIG from '../config'
import { getToken, saveToken } from '../utils/token'
const baseURL = CONFIG.baseURL

// Add a request interceptor
function requestIntercepter (originConfig) {
  if (!originConfig.url) {
    console.error('request need url')
    throw new Error({
      source: 'requestInterceptors',
      message: 'request need url',
    })
  }
  const reqConfig = {...originConfig}
  reqConfig.header = {
    'content-type': 'application/json;charset=utf-8;',
  }
  const token = getToken()
  if (token) {
    reqConfig.header.Authorization = token
  }
  return reqConfig
}

// Add a response interceptor
function responseIntercepter (res, config) {
  let { error_code, msg } = res.data // eslint-disable-line
  if (res.statusCode === 200 ) {
    return res.data
  }
  return new Promise(async (resolve, reject) => {
    if (error_code === 10008) {
      // 重新登录
      wx.login({
        async success(res) {
          const data = await get(`/api/wxapp/login?code=${res.code}`)
          let { error_code, msg } = data
          if (error_code !== undefined) {
            console.log(msg)
          } else {
            saveToken(data.token)
            // 将上次失败请求重发
            const result = await request(config)
            resolve(result)
          }
        }
      })
      return
    }
    reject()
  })
}

function request (config) {
  const reqConfig = requestIntercepter(config)
  return new Promise((resolve, reject) => {
    wx.request({
      method: reqConfig.method,
      url: baseURL + reqConfig.url,
      data: reqConfig.data,
      timeout: 5 * 1000,
      header: reqConfig.header,
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })
  }).then(res => {
    return responseIntercepter(res, reqConfig)
  })
}

export function get (url, params = {}) {
  return request({
    method: 'get',
    url,
    params,
  })
}

export function post (url, data = {}, params = {}) {
  return request({
    method: 'post',
    url,
    data,
    params
  })
}

export function put(url, data = {}, params) {
  return request({
    method: 'put',
    url,
    data,
    params,
  })
}

export function _delete (url, params) {
  return request({
    method: 'delete',
    url,
    params
  })
}
