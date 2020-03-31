import { post } from '../utils/request'

class Cart {

  async editCart(goodsId, skuId, num) {
    return post(`/api/cart/edit`, {
      goodsId, skuId, num
    })
  }
}

export default new Cart()
