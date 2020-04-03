import { get } from './utils/request'
import { saveToken } from './utils/token'
import user from './models/user'
App({
  onLaunch() {
    const that = this
    wx.login({
      async success(res) {
        const data = await get(`/api/wxapp/login?code=${res.code}`)
        let { error_code, msg } = data
        if (error_code !== undefined) {
          console.log(msg)
        } else {
          saveToken(data.token)
        }
        await that.getUserInfo()
      }
    })
  },
  // 加载用户信息
  async getUserInfo () {
    const res = await user.getUserInfo()
    let { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
    } else {
      wx.setStorageSync("user", res)
    }
  },
})