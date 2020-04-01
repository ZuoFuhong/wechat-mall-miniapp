import coupon from '../../../models/coupon'

Page({
  data: {
    status: 0
  },
  onShow() {
    this.loadUserCoupon()
  },
  async loadUserCoupon() {
    const res = await coupon.getUserCouponList(this.data.status, 1, 500)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    const coupons = []
    for (let i = 0; i < res.list.length; i++) {
      const couponDO = res.list[i]
      // 券类型：1-满减券 2-折扣券 3-代金券 4-满金额折扣券
      let amount
      let title
      switch(couponDO.type) {
        case 1:
          amount = '￥' + parseFloat(couponDO.minus, 10)
          title = '满' + parseFloat(couponDO.fullMoney, 10) + '减' + parseFloat(couponDO.minus, 10)
          break;
        case 2:
          amount = couponDO.rate * 10 + '折'
          title = '折扣券'
          break;
        case 3:
          amount = '￥' + parseFloat(couponDO.minus, 10)
          title = '代金券'
          break;
        case 4:
          amount = couponDO.rate * 10 + '折'
          title = '满' + parseFloat(couponDO.fullMoney, 10) + '享' + couponDO.rate * 10 + '折'
          break;
        default:
          amount = ''
      }
      const startDateArr = couponDO.startTime.split(' ')[0].split('-')
      const endDateArr = couponDO.endTime.split(' ')[0].split('-')
      coupons.push({
        cLogId: couponDO.CLogId,
        couponId: couponDO.couponId,
        amount: amount,
        title: title,
        period: startDateArr[1] + '/' + startDateArr[2] + '-' + endDateArr[1] + '/' + endDateArr[2]
      })
    }
    this.setData({
      coupons: coupons
    })
  },
  switchStatus(e) {
    const status = e.currentTarget.dataset.id
    if (parseInt(status, 10) === this.data.status) {
      return
    }
    wx.showLoading()
    this.setData({
      status: parseInt(status, 10)
    })
    this.loadUserCoupon()
    wx.hideLoading()
  },
  goShopping() {
    wx.navigateTo({
      url: '/pages/goods/list'
    })
  }
})