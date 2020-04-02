import address from '../../models/address'

Page({
  data: {
    selectAddressId: 0,
    addressList: []
  },
  onLoad(e) {
    this.setData({
      selectAddressId: parseInt(e.id, 10)
    })
  },
  onShow() {
    this.loadAddressList()
  },
  // 加载所有地址
  async loadAddressList() {
    const res = await address.getAddressList(1, 500)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      addressList: res.list
    })
  },
  // 选择地址
  selectAddress(e) {
    let addressId = e.currentTarget.dataset.id
    const selectAddressId = this.data.selectAddressId
    if (selectAddressId === addressId) {
      addressId = 0
    }
    this.setData({
      selectAddressId: addressId
    })
  },
  // 添加地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/address/edit/index'
    })
  },
  confirmAddress() {
    const addressList = this.data.addressList
    const selectAddressId = this.data.selectAddressId
    let curAddress = {}
    for (let i = 0; i < addressList.length; i++) {
      const address = addressList[i]
      if (address.id === selectAddressId) {
        curAddress = address
        break
      }
    }
    let pages = getCurrentPages();
    let prevPage = pages[ pages.length - 2 ]; 
    // 为上一个页面赋值
    prevPage.setData({
      address: curAddress
    })
    wx.navigateBack({
      delta: 1
    })
  }
})