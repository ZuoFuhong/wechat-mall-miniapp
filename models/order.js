import { get, post } from '../utils/request'

class Order {

  async placeOrder(addressId, couponLogId, dispatchAmount, expectAmount, goodsList) {
    return post('/api/placeorder', {
      addressId, couponLogId, dispatchAmount, expectAmount, goodsList
    })
  }
}

export default new Order()
