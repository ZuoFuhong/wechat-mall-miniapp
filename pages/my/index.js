import user from '../../models/user'
Page({
	data: {
    authStatus: false,
    userInfo: {}
  },
  async onLoad() {
    await this.getUserInfo()
  },
  async getUserInfo () {
    const res = await user.getUserInfo()
    let { error_code, msg } = res // eslint-disable-line
    if (error_code !== undefined) {
      console.log(msg)
    } else {
      this.setData({
        authStatus: res.nickname !== undefined,
        userInfo: res
      })
    }
  },
  doAuthInfo() {
    console.log('授权操作')
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