const CONFIG = require('../../config.js')
const SelectSizePrefix = "选择："

Page({
  data: {
    wxlogin: true,
    // 商品-图片
    multipePicture: [
      {
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/ecdec852-d535-4183-b447-47fefa568e43.jpg'
      },
      {
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/ecdec852-d535-4183-b447-47fefa568e43.jpg'
      },
      {
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/ecdec852-d535-4183-b447-47fefa568e43.jpg'
      }
    ],
    // 商品-多规格
    skuList: [
        {
          id: 1,
          title: "爆款-3.5英寸",
          price: "1.20",
          code: "123",
          stock: 7,
          specs: "[{\"keyId\":1,\"key\":\"颜色\",\"valueId\":4,\"value\":\"蓝色\"},{\"keyId\":2,\"key\":\"尺寸\",\"valueId\":6,\"value\":\"3.5英寸\"}]"
        }
    ],
    specList: [
        {
          specId: 1,
          name: "颜色",
          attrList: [
            {
              attrId: 4,
              value: "蓝色"
            }
          ]
        },
        {
          specId: 2,
          name: "尺寸",
          attrList: [
            {
              attrId: 6,
              value: "3.5英寸"
            }
          ]
        }
    ],
    goodsDetail: {
      content: "<p><img class=\"img-ks-lazyload\" src=\"https://img.alicdn.com/imgextra/i2/4134225718/O1CN011s6tA01sL8d3mKD_!!4134225718.jpg\" width=\"790\" align=\"absmiddle\" /><img class=\"img-ks-lazyload\" src=\"https://img.alicdn.com/imgextra/i3/4134225718/O1CN011s6tA1VUrpntRXW_!!4134225718.jpg\" width=\"790\" align=\"absmiddle\" /><img class=\"img-ks-lazyload\" src=\"https://img.alicdn.com/imgextra/i4/4134225718/O1CN011s6tA2H1g9yk8i2_!!4134225718.jpg\" width=\"790\" align=\"absmiddle\" data-spm-anchor-id=\"a220o.1000855.0.i2.591c48abotbO5M\" /></p>"
    },
    hasMoreSelect: false,
    selectSize: SelectSizePrefix,
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,

    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
  },
  async onLoad(e) {
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene) // 处理扫码进商品详情页面的逻辑
      if (scene) {
        e.id = scene.split(',')[0]
        wx.setStorageSync('referrer', scene.split(',')[1])
      }
    }
    this.data.goodsId = e.id
    const that = this
    this.data.kjJoinUid = e.kjJoinUid    
    this.setData({
      goodsDetailSkuShowType: CONFIG.goodsDetailSkuShowType,
      curuid: wx.getStorageSync('uid')
    })
    this.shippingCartInfo()
  },
  async shippingCartInfo(){
    // Todo: 购物车数量
    this.setData({
      shopNum: 10
    })
  },
  onShow (){
  },
  goCoupons() {
    wx.navigateTo({
      url: '/pages/coupons/index'
    })
  },
  goHome() {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  goShopCar() {
    wx.reLaunch({
      url: "/pages/shop-cart/index"
    });
  },
  // 添加-购物车
  toAddShopCar: function() {
    this.setData({
      shopType: "addShopCar"
    })
    this.bindGuiGeTap();
  },
  tobuy: function() {
    this.setData({
      shopType: "tobuy",
      selectSizePrice: this.data.goodsDetail.basicInfo.minPrice
    });
    this.bindGuiGeTap();
  },
  /**
   * 规格选择弹出框
   */
  bindGuiGeTap: function() {
    this.setData({
      hideShopPopup: false
    })
  },
  numJianTap: function() {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function() {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  /**
   * 加入购物车
   */
  async addShopCar() {
  },
  /**
   * 立即购买
   */
  buyNow: function(e) {

  },
  onShareAppMessage: function() {
    
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },
  processLogin(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
      })
      return;
    }
  },
  closePop(){
    this.setData({
      posterShow: false
    })
  },
  closePopupTap() {
    this.setData({
      hideShopPopup: true
    })
  }
})