Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categorySelected: {
      name: '',
      id: ''
    },
    currentGoods: [],
    onLoadStatus: true,
    scrolltop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.categories();
  },
  async categories() {
    wx.showLoading({
      title: '加载中',
    })
    const categories = [
      {
        id: 92642,
        name: '上装'
      },
      {
        id: 1,
        name: '上装1'
      },
      {
        id: 2,
        name: '上装2'
      },
      {
        id: 3,
        name: '上装3'
      },{
        id: 4,
        name: '上装4'
      },{
        id: 5,
        name: '上装5'
      }
    ]
    this.setData({
      categories,
      categorySelected: {
        id: 92642
      }
    });
    wx.hideLoading()

    this.getGoodsList();
  },
  async getGoodsList() {
    wx.showLoading({
      title: '加载中',
    })

    /// 加载商品
    // const res = await WXAPI.goods({
    //   categoryId: this.data.categorySelected.id,
    //   page: 1,
    //   pageSize: 100000
    // })
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
      }
    ]
    wx.hideLoading()
    this.setData({
      currentGoods: goods
    });
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onCategoryClick: function(e) {
    var that = this;
    var id = e.target.dataset.id;
    if (id === that.data.categorySelected.id) {
      that.setData({
        scrolltop: 0,
      })
    } else {
      var categoryName = '';
      for (var i = 0; i < that.data.categories.length; i++) {
        let item = that.data.categories[i];
        if (item.id == id) {
          categoryName = item.name;
          break;
        }
      }
      that.setData({
        categorySelected: {
          name: categoryName,
          id: id
        },
        scrolltop: 0
      });
      that.getGoodsList();
    }
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