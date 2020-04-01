import address from '../../models/address'

Page({
  data: {
    addressList: [],
    curPage: 1,
    pageSize: 500
  },
  onShow() {
    this.loadAddressList()
  },
  async loadAddressList() {
    const res = await address.getAddressList(this.data.curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    for (let i = 0; i < res.list.length; i++) {
      const address = res.list[i]
      const detailAddress = address.provinceStr + ' ' + address.cityStr + ' ' + address.areaStr + ' ' + address.address
      res.list[i].detail = detailAddress
    }
    this.setData({
      addressList: res.list
    })
  },
  deleteAddress(e) {
    const addressId = e.currentTarget.dataset.id
    const that = this
    wx.showModal({
      content: '确定要删除该地址吗？',
      success (res) {
        if (res.confirm) {
          address.deleteAddress(addressId).then(res => {
            const { error_code, msg } = res
            if (error_code !== undefined) {
              wx.showToast({
                icon: 'none',
                title: msg
              })
              return
            }
            wx.showToast({
              title: '删除成功'
            })
            that.loadAddressList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  editAddress(e) {
    const addressId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/address/edit/index?id=' + addressId
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/address/edit/index'
    })
  },
  // 设置-默认收货地址
  defaultAddress(e) {
    const addressId = e.currentTarget.dataset.id
    const addressList = this.data.addressList
    const that = this
    for (let i = 0; i <  addressList.length; i++) {
      const addressDO = addressList[i]
      if (addressDO.id === addressId) {
        addressDO.isDefault = 1
        address.editAddress(addressDO).then(res => {
          const { error_code, msg } = res
          if (error_code !== undefined) {
            console.log(msg)
            return
          }
          that.loadAddressList()
        })
        break
      }
    }
  }
})