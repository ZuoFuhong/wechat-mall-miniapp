import config from '../../config'
import banner from '../../models/banner'
import grid from '../../models/grid'
import goods from '../../models/goods'

Page({
  data: {
    inputVal: "", // 搜索框内容

    loadingHidden: false, // loading
    scrollTop: 0,
    loadingMoreHidden: true,

    banners: [],
    categories: [],
    goodsList: [],
    curPage: 1,
    pageSize: 10,
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
  async onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    }) 
    wx.setNavigationBarTitle({
      title: config.shopName
    })
    await this.loadHomeBanner()
    await this.loadHomeGrid()
    await this.getGoodsList(this.data.curPage, this.data.pageSize)
  },
  async loadHomeBanner() {
    const banners = await banner.getHomeBanner(1, 3)
    this.setData({
      banners: banners
    });
  },
  async loadHomeGrid(){
    const data = await grid.getGridList(1, 8)
    const { error_code, msg } = data
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      categories: data,
      curPage: 1
    });
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  async getGoodsList(page, size) {
    wx.showLoading({
      "mask": true
    })
    const res = await goods.getGoodsList('', 0, page, size)
    const {error_code, msg} = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    const curPage = this.data.curPage
    let goodsList = this.data.goodsList
    if (curPage === 1) {
      goodsList = res.list
    } else {
      goodsList = goodsList.concat(res.list)
    }
    const loadingMoreHidden = res.list.length === this.data.pageSize
    this.setData({
      loadingMoreHidden: loadingMoreHidden,
      goodsList: goodsList
    });
    wx.hideLoading()
  },
  onShareAppMessage: function() {    
    return {
      title: config.shareProfile,
      path: '/pages/index/index'
    }
  },
  onReachBottom: function() {
    if (!this.data.loadingMoreHidden) {
      return
    }
    const page = this.data.curPage + 1
    this.setData({
      curPage: page
    });
    this.getGoodsList(page, this.data.pageSize)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(1, this.data.pageSize)
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