import order from '../../models/order'

Page({
  data: {
    orderNo: '',
    origin: 0,
    refundPopup: false,
    selectReason: 0,
    orderDetail: {},
    refundReason: [
      {
        id: 1,
        reason: '我不想买了'
      },
      {
        id: 2,
        reason: '信息填写错误，重新拍'
      },
      {
        id: 3,
        reason: '卖家缺货'
      },
      {
        id: 4,
        reason: '同城见面交易'
      },
      {
        id: 5,
        reason: '其它原因'
      }
    ],
    refundAllow: false  // 是否允许退款
  },
  onLoad(e) {
    console.log(e)
    this.setData({
      origin: parseInt(e.origin, 10) || 0,
      orderNo: e.orderNo || ''
    })
  },
  onShow() {
    this.closePopup()
    this.loadOrderDetail()
  },
  // 加载订单
  async loadOrderDetail() {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    const res = await order.getOrderDetail(this.data.orderNo)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      wx.hideLoading()
      return
    }
    this.setData({
      orderDetail: res,
      refundAllow: res.status === 1 && res.refundApply.refundNo === ''
    })
    wx.hideLoading()
  },
  // 退款申请
  orderRefund(e) {
    const orderId = e.currentTarget.dataset.id
    wx.setNavigationBarTitle({
      title: '退款申请'
    })
    this.setData({
      refundPopup: true
    })
  },
  // 确认退款
  async confirmRefund() {
    const reasonId = this.data.selectReason
    if (reasonId === 0) {
      wx.showToast({
        title: '请选择退款原因',
        icon: 'none'
      })
      return
    }
    const refundReason = this.data.refundReason
    let reason = ''
    for (let i = 0; i < refundReason.length; i++) {
      if (refundReason[i].id === reasonId) {
        reason = refundReason[i].reason
      }
    }
    const res = await order.refundApply(this.data.orderNo, reason)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return      
    }
    wx.navigateTo({
      url: '/pages/refund-details/index?refundNo=' + res.refundNo
    })
  },
  stopPropagation() {
    // 阻止冒泡
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
  // 取消订单
  async cancelOrder(e) {
    const that = this
    wx.showModal({
      title: '取消订单',
      content: '确认取消订单？',
      success(res) {
        if (res.confirm) {
          const orderId = e.currentTarget.dataset.id
          order.cancelOrder(orderId).then(res => {
            const { error_code, msg } = res
            if (error_code !== undefined) {
              console.log(msg)
              return
            }
            that.loadOrderDetail()
          })
        }
      }
    })
  },
  // 删除订单
  async deleteOrderRecord(e) {
    const that = this
    wx.showModal({
      title: '删除订单',
      content: '确认删除订单？',
      success(res) {
        if (res.confirm) {
          const orderId = e.currentTarget.dataset.id
          order.deleteOrder(orderId).then(res => {
            const { error_code, msg } = res
            if (error_code !== undefined) {
              console.log(msg)
              return
            }
            wx.navigateBack()
          })
        }
      }
    })
  },
  // 确认收货
  async confirmTakeGoods(e) {
    const that = this
    wx.showModal({
      title: "确认收货",
      content: '确认已经收到商品？',
      success(res) {
        if (res.confirm) {
          const orderId = e.currentTarget.dataset.id
          order.confirmTakeGoods(orderId).then(res => {
            const { error_code, msg } = res
            if (error_code !== undefined) {
              console.log(msg)
              return
            }
            that.loadOrderDetail()
          })
        }
      }
    })
  },
  // 支付窗口
  async orderPay(e) {
    console.log(e.currentTarget.dataset.id)
    wx.showToast({
      icon: 'none',
      title: '演示环境，不支持微信支付'
    })
  },
  // 退款详情
  goRefundDetail() {
    wx.navigateTo({
      url: '/pages/refund-details/index?refundNo=' + this.data.orderDetail.refundApply.refundNo
    })
  },
  // 复制订单号
  copyOrderNo() {
    wx.setClipboardData({
      data: this.data.orderDetail.orderNo
    })
  },
  // 订单支付成功的回退页
  onUnload(){
    const origin = this.data.origin
    if (origin === 1) {
      wx.reLaunch({
        url: '/pages/my/index'
      })
    }
  }
})