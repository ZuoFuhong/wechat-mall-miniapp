import { get } from '../utils/request'

class Coupon {

  async getCouponList(page, size) {
    return get(`/api/coupon/list?page=${page}&size=${size}`)
  }
}

export default new Coupon()
