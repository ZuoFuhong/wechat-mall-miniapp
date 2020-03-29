import { get } from '../utils/request'

class Grid {

  async getGridList(page, size) {
    return get(`/api/home/grid?page=${page}&size=${size}`)
  }
}

export default new Grid()
