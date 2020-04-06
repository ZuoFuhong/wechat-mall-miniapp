import browse from '../../models/browse'

Page({
  data: {
    editStatus: false,
    history: [],
    curPage: 1,
    pageSize: 10,
    loadingMoreHidden: true,
    selectRecord: {}, // 单选
    selectAll: false
  },
  onShow() {
    this.setData({
      history: [],
      curPage: 1,
      editStatus: false,
      loadingMoreHidden: true
    })
    this.loadBrowseHistory()
    this.clearSelect()
  },
  async loadBrowseHistory() {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    const selectRecord = this.data.selectRecord
    let curPage = this.data.curPage
    const res = await browse.getBrowseHistory(curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      wx.hideLoading()
      return
    }
    const history = this.data.history
    for (let i = 0; i < res.list.length; i++) {
      const record = res.list[i]
      const tmpArr = record.browseTime.split(' ')[0].split('-')
      const date = tmpArr[1] + '月' + tmpArr[2] + '日'

      const goodsList = []
      for (let j = 0; j < history.length; j++) {
        const dayHistory = history[j]
        if (dayHistory.date === date) {
          goodsList = dayHistory.goodsList
        }
      }
      if (goodsList.length === 0) {
        history.push({
          date: date,
          goodsList
        })
      }
      goodsList.push(record)
      // 单选框
      selectRecord[record.id] = false
    }
    this.setData({
      curPage: curPage + 1,
      history: history,
      loadingMoreHidden: res.list.length === this.data.pageSize,
      selectRecord: selectRecord
    })
    wx.hideLoading()
  },
  // 单选
  doSelectRecord(e) {
    const id = e.currentTarget.dataset.id
    const selectRecord = this.data.selectRecord
    selectRecord[id] = !selectRecord[id]
    
    let selectAll = true
    for (let i in selectRecord) {
      if (!selectRecord[i]) {
        selectAll = false
      }
    }
    this.setData({
      selectRecord: selectRecord,
      selectAll: selectAll
    })
  },
  // 全选
  doSelectAll() {
    const selectAll = this.data.selectAll
    const selectRecord = this.data.selectRecord
    for (let i in selectRecord) {
      selectRecord[i] = !selectAll
    }
    this.setData({
      selectAll: !selectAll,
      selectRecord: selectRecord
    })
  },
  // 清理-选择项
  clearSelect() {
    const selectRecord = this.data.selectRecord
    for (let i in selectRecord) {
      selectRecord[i] = false
    }
    this.setData({
      selectAll: false,
      selectRecord: selectRecord
    })
  },
  close() {
    this.setData({
      editStatus: false
    })
    this.clearSelect()
  },
  edit() {
    this.setData({
      editStatus: true
    })
  },
  // 上拉加载更多
  onReachBottom() {
    if (this.data.loadingMoreHidden) {
      this.loadBrowseHistory()
    }
  },
  // 清理-记录
  async deleteRecord() {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    const selectRecord = this.data.selectRecord
    const ids = []
    for (let i in selectRecord) {
      if (selectRecord[i]) {
        ids.push(parseInt(i, 10))
      }
    }
    const res = await browse.clearBrowseHistory(ids)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      wx.hideLoading()
      console.log(msg)
      return
    }
    this.onShow()
    wx.hideLoading()
  }
})