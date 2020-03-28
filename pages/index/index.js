import config from '../../config'
Page({
  data: {
    inputVal: "", // 搜索框内容

    loadingHidden: false, // loading
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    
    scrollTop: 0,
    loadingMoreHidden: true,

    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0
  },

  tabClick: function(e) {
    wx.navigateTo({
      url: '/pages/goods/list?categoryId=' + e.currentTarget.id,
    })
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onLoad: function(e) {   
    wx.showShareMenu({
      withShareTicket: true
    }) 
    const that = this
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene)
      if (scene) {        
        wx.setStorageSync('referrer', scene.substring(11))
      }
    }
    wx.setNavigationBarTitle({
      title: '商城首页'
    })
    // Mock: Banner数据
    that.setData({
      banners: [
        {
          id: 1,
          picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png'
        },
        {
          id: 2,
          picture: 'https://dcdn.it120.cc/2019/12/29/daca65ee-4347-4792-a490-ccbac4b3c1d7.png'
        },
        {
          id: 3,
          picture: 'https://dcdn.it120.cc/2019/12/29/8396f65d-d615-46d8-b2e5-aa41820b9fe5.png'
        }
      ]
    });
    this.categories()
  },
  onShow: function(e){
  },
  async categories(){
    const categories = [
      {
        id: 92642,
        name: '上装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png',
      },
      {
        id: 92642,
        name: '裤装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/5bfffd6ad0d4483870f024a3ed936528.png',
      },
      {
        id: 92642,
        name: '特价区',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/8d32c254e2cb86d2d42c99b768d136b6.png',
      },
      {
        id: 92642,
        name: '裙装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/d800327091f216e2c83db8af7b6be306.png',
      },
      {
        id: 92642,
        name: '套装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/cfee29650d6ae58a4bb1f84a3d899450.png',
      },
      {
        id: 692642,
        name: '上装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png',
      },
      {
        id: 692642,
        name: '上装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png',
      },
      {
        id: 692642,
        name: '上装',
        icon: 'https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png',
      }
    ];
    // Todo: 加载宫格（8个）
    this.setData({
      categories: categories,
      activeCategoryId: 0,
      curPage: 1
    });
    this.getGoodsList(0);
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  async getGoodsList(categoryId, append) {
    if (categoryId == 0) {
      categoryId = "";
    }
    wx.showLoading({
      "mask": true
    })
    const goods = [
      {
        id: 277082,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 10000.99,
        saleNum: 10
      },
      {
        id: 277082,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },
      {
        id: 277082,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },
      {
        id: 277082,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },
      {
        id: 277082,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },
      {
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      },{
        id: 1,
        name: '兔毛马甲',
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        price: 100.99,
        saleNum: 10
      }
    ]
    // Todo: 加载商品
    this.setData({
      loadingMoreHidden: true,
      goods: goods,
    });
    wx.hideLoading()
  },
  onShareAppMessage: function() {    
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + config.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId)
    wx.stopPullDownRefresh()
  },
  bindinput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  bindconfirm(e) {
    this.setData({
      inputVal: e.detail.value
    })
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  },
})