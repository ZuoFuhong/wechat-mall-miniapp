import user from '../../models/user'
Page({
	data: {
    userInfo: {}
  },
  async onLoad() {
    await this.getUserInfo()
  },
  async getUserInfo () {
    const res = await user.getUserInfo()
    let { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
    } else {
      this.setData({
        userInfo: res
      })
    }
  },
  // 主动授权用户信息
  async doAuthInfo(res) {
    const userInfo = res.detail.userInfo
    if (userInfo) {
      const result = await user.updateUserInfo(userInfo)
      let { error_code, msg } = result
      if (error_code !== undefined) {
        console.log(msg)
      } else {
        const originInfo = this.data.userInfo
        originInfo.nickName = userInfo.nickName
        originInfo.avatar = userInfo.avatarUrl
        this.setData({
          userInfo: originInfo
        })
      }
    }
  },
  goMyCoupon() {
    wx.navigateTo({
      url: "/pages/my/coupon/index"
    })
  },
  goMyOrder(event) {
    const status = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/index?status=' + status
    })
  },
  goMyAddress() {
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  goMyBrowse() {
    wx.navigateTo({
      url: '/pages/browse/index'
    })
  }
})