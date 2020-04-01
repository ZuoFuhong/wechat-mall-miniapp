import { get, post } from '../utils/request'

class Coupon {

  // 查询店铺优惠券
  async getCouponList(page, size) {
    return get(`/api/coupon/list?page=${page}&size=${size}`)
  }

  async takeCoupon(couponId) {
    return post('/api/coupon/take', {
      couponId
    })
  }

  // 查询-用户领取的优惠券
  async getUserCouponList(status, page, size) {
    return get(`/api/user/coupon/list?status=${status}&page=${page}&size=${size}`)
  }
}

export default new Coupon()
