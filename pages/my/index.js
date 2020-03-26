Page({
	data: {

  },
  
  goMyCoupon() {
    console.log('我的优惠券')
    wx.navigateTo({
      url: "/pages/my/coupon/index"
    })
  }
})