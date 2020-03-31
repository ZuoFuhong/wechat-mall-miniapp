import { get, post } from '../utils/request'

class Coupon {

  async getCouponList(page, size) {
    return get(`/api/coupon/list?page=${page}&size=${size}`)
  }

  async takeCoupon(couponId) {
    return post('/api/coupon/take', {
      couponId
    })
  }
}

export default new Coupon()
