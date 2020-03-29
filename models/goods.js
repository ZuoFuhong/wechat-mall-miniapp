import { get } from '../utils/request'

class Goods {

  async getGoodsList(keyword, categoryId, page, size) {
    return get(`/api/goods/list?k=${keyword}&c=${categoryId}&page=${page}&size=${size}`)
  }
}

export default new Goods()
