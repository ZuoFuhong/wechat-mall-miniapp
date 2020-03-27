Page({
	data: {

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