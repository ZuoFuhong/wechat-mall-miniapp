import { post, get } from '../utils/request'

class Cart {

  // 购物车-添加商品
  async addCart(goodsId, skuId, num) {
    return post(`/api/cart/add`, {
      goodsId, skuId, num
    })
  }

  // 编辑购物车
  async editCart(id, num) {
    return post(`/api/cart/edit`, {
      id, num
    })
  }

  async getCartList(page, size) {
    return get(`/api/cart/list?page=${page}&size=${size}`)
  }

  async getCartGoodsNum() {
    return get('/api/cart/goods_num')
  }
}

export default new Cart()
