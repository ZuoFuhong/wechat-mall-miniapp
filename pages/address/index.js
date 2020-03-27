Page({
  data: {
    addressList: [
      {
        id: 1,
        nickname: '大左',
        mobile: '1887****321',
        detail: '武汉市 东湖高新区1001号',
        isDefault: 1
      },
      {
        id: 2,
        nickname: '大左',
        mobile: '1887****321',
        detail: '武汉市 东湖高新区1001号',
        isDefault: 0
      }
    ]
  },
  onLoad() {
  },
  deleteAddress(e) {
    const addressId = e.currentTarget.dataset.id
    wx.showModal({
      content: '确定要删除该地址吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
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
  }
})