import { get, post, put, _delete } from '../utils/request'

class Order {

  async placeOrder(addressId, couponLogId, dispatchAmount, expectAmount, goodsList) {
    return post('/api/placeorder', {
      addressId, couponLogId, dispatchAmount, expectAmount, goodsList
    })
  }

  // 状态: -1 已取消 0-待付款 1-待发货 2-待收货 3-已完成 4-（待发货）退款申请 5-已退款
  async getOrderList(status, page, size) {
    return get(`/api/order/list?status=${status}&page=${page}&size=${size}`)
  }

  async getOrderDetail(orderNo) {
    return get(`/api/order/detail?orderNo=${orderNo}`)
  }

  async deleteOrder(id) {
    return _delete(`/api/order?id=${id}`)
  }

  async cancelOrder(id) {
    return put(`/api/order/cancel?id=${id}`)
  }

  async confirmTakeGoods(id) {
    return put(`/api/order/confirm_goods?id=${id}`)
  }

  async refundApply(orderNo, reason) {
    return put('/api/order/refund_apply', {
      orderNo, reason
    })
  }

  async refundDetail(refundNo) {
    return get(`/api/order/refund_detail?refundNo=${refundNo}`)
  }

  async undoOrderRefund(refundNo) {
    return put(`/api/order/refund_undo?refundNo=${refundNo}`)
  }
}

export default new Order()
