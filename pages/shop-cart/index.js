Page({
  data: {
    goodsList: [1]
  },
  goCategory() {
    wx.reLaunch({
      url: "/pages/category/category"
    });
  }
})