import user from '../../models/user'
import order from '../../models/order'
import config from '../../config'

Page({
	data: {
    userInfo: {},
    waitPay: 0,   // 待付款
    notExpress: 0,  // 待发货
    waitReceive: 0  // 待收货
  },
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('user')
    })
  },
  async onShow() {
    this.loadOrderRemind()
  },
  // 加载提醒的订单数量
  async loadOrderRemind() {
    const res = await order.getOrderRemind()
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      waitPay: res.waitPay,
      notExpress: res.notExpress,
      waitReceive: res.waitReceive
    })
  },
  // 获取用户信息
  async doAuthInfo(res) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const userInfo = res.userInfo
        if (userInfo) {
          const result = user.updateUserInfo(userInfo)
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
            wx.setStorageSync('user', originInfo)
          }
        }
      }
    })
  },
  goMyCoupon() {
    if (!this.checkUserLogin()) {
      return
    }
    wx.navigateTo({
      url: "/pages/my/coupon/index"
    })
  },
  goMyOrder(event) {
    if (!this.checkUserLogin()) {
      return
    }
    const status = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/index?status=' + status
    })
  },
  goMyAddress() {
    if (!this.checkUserLogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  goMyBrowse() {
    if (!this.checkUserLogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/browse/index'
    })
  },
  callShopPhone() {
    wx.makePhoneCall({
      phoneNumber: config.phoneNumber
    })
  },
  // 检查用户登录
  checkUserLogin() {
    if (this.data.userInfo.avatar === '') {
      wx.showToast({
        icon: 'none',
        title: '您暂未登录，请先点击“登录”'
      })
      return false
    }
    return true
  }
})