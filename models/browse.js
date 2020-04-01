import { get, post } from '../utils/request'

class Browse {

  async getBrowseHistory(page, size) {
    return get(`/api/browse/list?page=${page}&size=${size}`)
  }

  async clearBrowseHistory(ids) {
    return post('/api/browse/clear', ids)
  }
}

export default new Browse()
