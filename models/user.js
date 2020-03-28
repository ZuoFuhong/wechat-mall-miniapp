import { get, post } from '../utils/request'

class User {

  async getUserInfo () {
    return get('/api/wxapp/user-info')
  }

  async updateUserInfo ({nickName, avatarUrl, gender, country, province, city}) {
    return post('/api/wxapp/auth-info', {
      nickName, avatarUrl, gender, country, province, city
    })
  }
}

export default new User()