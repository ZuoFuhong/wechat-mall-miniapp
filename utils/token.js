const tokenKey = 'token'

/**
 * 存储token
 */
export function saveToken (token) {
  wx.setStorageSync(tokenKey, `Bearer ${token}`)
}

/**
 * 获取token值
 */
export function getToken() {
  return wx.getStorageSync(tokenKey)
}

/**
 * 移除token
 */
export function removeToken() {
  wx.removeStorage({
    key: tokenKey
  })
}

