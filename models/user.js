import { get } from '../utils/request'

class User {

  async getUserInfo () {
    return get('/api/wxapp/user-info')
  }
}

export default new User()