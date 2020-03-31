import { get } from '../utils/request'

class Goods {

  // sort: 排序：0-综合 1-新品 2-销量 3-价格
  async getGoodsList(keyword, sort, categoryId, page, size) {
    return get(`/api/goods/list?k=${keyword}&s=${sort}&c=${categoryId}&page=${page}&size=${size}`)
  }

  async getGoodsDetails(id) {
    return get(`/api/goods/detail?id=${id}`)
  }
}

export default new Goods()
