import goods from '../../models/goods'

Page({

  data: {
    listType: 1, // 1为1个商品一行，2为2个商品一行    
    keyword: '', // 搜索关键词
    sort: 0, // 排序规则：0-综合 1-新品 2-销量 3-价格
    curPage: 0,
    pageSize: 10,
    goods: [],
    loadingMoreHidden: true,
    categoryId: 0
  },
  onLoad: function (options) {
    this.setData({
      keyword: options.k || '',
      categoryId: options.categoryId
    })
    this.search()
  },
  async search(){
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    const curPage = this.data.curPage + 1
    let goodsList = this.data.goods
    const res = await goods.getGoodsList(this.data.keyword, this.data.sort, this.data.categoryId, curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      wx.hideLoading()
      return
    }
    if (curPage === 1) {
      goodsList = res.list
    } else {
      goodsList = goodsList.concat(res.list)
    }
    this.setData({
      curPage: curPage,
      goods: goodsList,
      loadingMoreHidden: res.list.length === this.data.pageSize
    })
    wx.hideLoading()
  },
  // 上拉加载更多
  async onReachBottom() {
    if (!this.data.loadingMoreHidden) {
      return
    }
    this.search()   
  },
  changeShowType(){
    if (this.data.listType == 1) {
      this.setData({
        listType: 2
      })
    } else {
      this.setData({
        listType: 1
      })
    }
  },
  bindinput(e){
    this.setData({
      keyword: e.detail.value
    })
  },
  bindconfirm(e){
    this.setData({
      curPage: 0,
      categoryId: 0,
      keyword: e.detail.value,
    })
    this.search()
  },
  filter(e){
    this.setData({
      sort: parseInt(e.currentTarget.dataset.val, 10),
      curPage: 0,
    })
    this.search()
  },
})