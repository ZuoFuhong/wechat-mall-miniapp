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
  }
})