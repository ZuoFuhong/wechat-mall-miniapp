import order from '../../models/order'

Page({
  data: {
    status: 0,
    curPage: 0,
    pageSize: 10,
    orderList: [],
    loadingMoreHidden: true
  },
  onLoad(res) {
    this.setData({
      status: parseInt(res.status, 10) || 0
    })
  },
  onShow() {
    this.setData({
      curPage: 0
    })
    this.loadOrderList()
  },
  // 加载订单列表
  async loadOrderList() {
    const curPage = this.data.curPage + 1
    const res = await order.getOrderList(this.data.status, curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return      
    }
    let orderList = this.data.orderList
    if (curPage === 1) {
      orderList = res.list
    } else {
      orderList = orderList.concat(res.list)
    }
    this.setData({
      orderList: orderList,
      curPage: curPage,
      loadingMoreHidden: res.list.length === this.data.pageSize
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
            that.setData({
              curPage: 0
            })
            that.loadOrderList()
          })
        }
      }
    })
  },
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
            that.setData({
              curPage: 0
            })
            that.loadOrderList()
          })
        }
      }
    })
  },
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
            that.setData({
              curPage: 0
            })
            that.loadOrderList()
          })
        }
      }
    })
  },
  // 切换状态
  switchStatus(e) {
    const status = e.currentTarget.dataset.status
    if (parseInt(status) === this.data.status) {
      return
    }
    this.setData({
      curPage: 0,
      status: parseInt(status, 10)
    })
    this.loadOrderList()
  },
  onReachBottom: function() {
    if (!this.data.loadingMoreHidden) {
      return
    }
    this.loadOrderList()
  },
})