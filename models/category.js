import { get } from '../utils/request'

class Category {

  async getCategoryList() {
    return get('/api/category/list')
  }
}

export default new Category()
