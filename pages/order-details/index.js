Page({
  data: {
    refundPopup: false,
    selectReason: 0,
    goodsList: [
      {
        goodsId: 1,
        picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
        title: '北欧简约立式台灯北欧简约立式',
        specs: '3m;黑色;可调节',
        price: '289',
        num: 1
      },
      {
        goodsId: 1,
        picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
        title: '北欧简约立式台灯北欧简约立式',
        specs: '3m;黑色;可调节',
        price: '289',
        num: 1
      }
    ]
  },
  onShow() {
    this.closePopup()
    console.log('刷新订单详情')
  },
  refund() {
    wx.setNavigationBarTitle({
      title: '退款申请'
    })
    this.setData({
      refundPopup: true
    })
  },
  stopPropagation() {
    // nothing to do
  },
  closePopup() {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      refundPopup: false,
      selectReason: 0
    })
  },
  selectReason(e) {
    this.setData({
      selectReason: parseInt(e.currentTarget.dataset.id, 10)
    })
  },
  confirmRefund() {
    const reason = this.data.selectReason
    if (reason === 0) {
      wx.showToast({
        title: '请选择退款原因',
        icon: 'none'
      })
    } else {
      // todo: 发起退款，退款成功跳转
      wx.navigateTo({
        url: '/pages/refund-details/index?orderNo=23423'
      })
    }
  }
})