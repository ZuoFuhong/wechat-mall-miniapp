Page({
  data: {
    addressId: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  onLoad(res) {
    this.setData({
      addressId: res.id
    })
  },
  bindRegionChange(e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  saveAddress() {
    // todo: 添加/更新 地址
  }
})