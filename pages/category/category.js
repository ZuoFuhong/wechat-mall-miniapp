import category from '../../models/category'
import goods from '../../models/goods'

Page({
  data: {
    categories: [],
    selectCategoryId: 0,
    currentGoods: [],
    scrolltop: 0,
    curPage: 0,
    pageSize: 10,
    loadingMoreHidden: true
  },
  onLoad: function() {
    this.categories();
  },
  async categories() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await category.getCategoryList()
    let { error_code, msg } = res
    if (error_code !== undefined) {
      wx.hideLoading()
      return
    }
    this.setData({
      categories: res,
      selectCategoryId: res[0].id
    })
    wx.hideLoading()
    this.getGoodsList();
  },
  async getGoodsList() {
    if (!this.data.loadingMoreHidden) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    let curPage = this.data.curPage + 1
    const res = await goods.getGoodsList('', 0, this.data.selectCategoryId, curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      wx.hideLoading()
      return
    }
    let currentGoods = this.data.currentGoods
    currentGoods = currentGoods.concat(res.list)
    wx.hideLoading()
    this.setData({
      curPage: curPage,
      currentGoods: currentGoods,
      loadingMoreHidden: res.list.length === this.data.pageSize
    });
  },
  async doScrolltoupper() {
    this.getGoodsList()
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onCategoryClick: function(e) {
    var id = e.target.dataset.id;
    if (id === this.data.selectCategoryId) {
      this.setData({
        scrolltop: 0,
      })
    } else {
      this.setData({
        selectCategoryId: id,
        scrolltop: 0,
        curPage: 0,
        currentGoods: [],
        loadingMoreHidden: true
      });
      this.getGoodsList();
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
      url: '/pages/goods/list?k=' + this.data.inputVal,
    })
  },
})