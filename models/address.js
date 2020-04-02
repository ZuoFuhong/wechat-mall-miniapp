import { get, _delete, post } from '../utils/request'

class Address {

  async getAddressList(page, size) {
    return get(`/api/user/address/list?page=${page}&size=${size}`)
  }

  async getAddressById(id) {
    return get(`/api/user/address?id=${id}`)
  }

  async deleteAddress(id) {
    return _delete(`/api/user/address?id=${id}`)
  }

  async editAddress({id, contacts, mobile, provinceId, cityId, areaId, provinceStr, cityStr, areaStr, address, isDefault}) {
    return post('/api/user/address/edit', {
      id, contacts, mobile, provinceId, cityId, areaId, provinceStr, cityStr, areaStr, address, isDefault
    })
  }

  async getDefaultAddress() {
    return get('/api/user/default_address')
  }
}

export default new Address()
