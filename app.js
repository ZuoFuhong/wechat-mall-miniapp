import { get } from './utils/request'
import { saveToken } from './utils/token'
import user from './models/user'
App({
  onLaunch() {
    wx.login({
      async success(res) {
        const data = await get(`/api/wxapp/login?code=${res.code}`)
        let { error_code, msg } = data
        if (error_code !== undefined) {
          console.log(msg)
        } else {
          saveToken(data.token)
        }
      }
    })
  }
})