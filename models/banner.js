import { get } from '../utils/request'

class Banner {

  async getHomeBanner (page, size) {
    return get(`/api/home/banner?page=${page}&size=${size}`)
  }
}

export default new Banner()