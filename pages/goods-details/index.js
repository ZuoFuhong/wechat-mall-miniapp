import goods from '../../models/goods'
import coupon from '../../models/coupon'
import cart from '../../models/cart'

Page({
  data: {
    cartNum: 10,  // 购物车商品数量
    goodsDetail: {},
    hideShopPopup: true,
    coupons: [],
    selectGoodsSku: {
      picture: '',
      price: '',
      stock: '',
      stockName: ''
    },
    selectSpecs: {},
    selectReady: false, // 规格选择就绪
    operationType: 1,   // 操作类型：1-加购物车 2-立即购买
    buyNum: 1,          // 一次最多购买99件
    selectSkuId: 0,
    selectSpecAttr: {}, // 是否可选的状态
    outofStockStatus: false  // 缺货状态
  },
  async onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    }) 
    this.data.goodsId = e.id
    wx.removeStorageSync("goods")
    await this.loadGoodsInfo()
    await this.loadCouponList()
  },
  onShow() {
    this.loadCartGoodsNum()
  },
  async loadGoodsInfo() {
    const data = await goods.getGoodsDetails(this.data.goodsId)
    const {error_code, msg} = data
    if (error_code !== undefined) {
      console.log(msg)
      this.setData({
        goodsDetail: {}
      })
      return
    }
    const price = this.calcGoodsPriceInterval(data.price, data.skuList)
    // 商品详情
    const detailPicture = JSON.parse(data.detailPicture)
    let content = "<p>"
    for (let i = 0; i < detailPicture.length; i++) {
      content += "<img class=\"img-ks-lazyload\" src=\"" + detailPicture[i] + "\" width=\"790\" align=\"absmiddle\" />"
    }
    content += "</p>"
    // 滚动的商品图
    const bannerPicture = JSON.parse(data.bannerPicture)
    bannerPicture.unshift(data.picture)
    data.bannerPicture = bannerPicture
    data.content = content
    data.price = price
    this.setData({
      goodsDetail: data
    })
    this.initSelectGoodsSku(data)
    this.initSpecAttrOptionalStatus(data)
  },
  // 计算商品价格区间
  calcGoodsPriceInterval (price, skuList) {
    let min = 0
    let max = 0
    for (let i = 0; i < skuList.length; i++) {
      const sku = skuList[i]
      const skuPrice = parseFloat(sku.price, 10)
      if (min === 0 || min > skuPrice) {
        min = skuPrice
      }
      if (max === 0 || max < skuPrice) {
        max = skuPrice
      }
    }
    if (min === max) {
      if (min > 0) {
        price = min
      }
    } else {
      price = min + '-' + max
    }
    return price
  },
  // 初始化预选商品
  initSelectGoodsSku({picture, price, skuList, specList}) {
    if (skuList.length === 0) {
      this.setData({
        selectGoodsSku: {
          picture: picture,
          price: price,
          stock: 0,
          stockName: ''
        },
        outofStockStatus: true
      })
      return
    }
    let stock = 0
    for (let i = 0; i < skuList.length; i++) {
      const sku = skuList[i]
      stock += sku.stock
    }
    let selectSpecs = {}
    for (let i = 0; i < specList.length; i++) {
      const spec = specList[i]
      selectSpecs[spec.specId] = 0
    }
    this.setData({
      selectSpecs: selectSpecs,
      selectGoodsSku: {
        picture: picture,
        price: price,
        stock: stock,
        stockName: ''
      }
    })
    this.calcSelectStockName()
  },
  // 计算-已经选择的规格组合
  calcSelectStockName () {
    const selectSpecs = this.data.selectSpecs
    const specList = this.data.goodsDetail.specList
    const selectGoodsSku = this.data.selectGoodsSku
    let skipCount = 0
    let stockName = ""
    let tmpSpecs = ""
    for (let i = 0; i < specList.length; i++) {
      const spec = specList[i]
      const attrList = spec.attrList
      const curAttrId = selectSpecs[spec.specId]
      if (curAttrId !== 0) {
        skipCount += 1
        for (let j = 0; j < attrList.length; j++) {
          const attr = attrList[j]
          if (attr.attrId === curAttrId) {
            tmpSpecs += '"' + attr.value + '"'
          }
        }
        continue
      }
      stockName += spec.name + ','
    }
    let selectReady = false
    if (skipCount < specList.length) {
      stockName = '请选择：' + stockName.substring(0, stockName.length - 1)
      
    } else {
      selectReady = true
      stockName = '已选：' + tmpSpecs
    }
    selectGoodsSku.stockName = stockName
    this.setData({
      selectReady: selectReady,
      selectGoodsSku: selectGoodsSku
    })
  },
  // 初始化规格选项状态
  initSpecAttrOptionalStatus({specList}) {
    // spec属性矩阵（K => specId-attrId，V => true）
    const selectSpecAttr = {}
    for (let i = 0; i < specList.length; i++) {
      const spec = specList[i]
      const attrList = spec.attrList
      for (let j = 0; j < attrList.length; j++) {
        const attr = attrList[j]
        const key = spec.specId + '-' + attr.attrId
        selectSpecAttr[key] = true
      }
    }
    this.setData({
      selectSpecAttr: selectSpecAttr
    })
    this.updateOptionalSpecAttr()
  },
  // 选择规格
  doSwitchSpec(e) {
    const specId = e.currentTarget.dataset.specId
    const attrId = e.currentTarget.dataset.attrId
    const selectSpecAttr = this.data.selectSpecAttr
    const selectSpecs = this.data.selectSpecs
    const curAttrId = selectSpecs[specId]
    const key = specId + '-' + attrId
    if (!selectSpecAttr[key]) {
      return
    }
    if (curAttrId === attrId) {
      selectSpecs[specId] = 0
    } else {
      selectSpecs[specId] = attrId
    }
    this.setData({
      selectSpecs: selectSpecs
    })
    this.calcSelectStockName()
    this.updateOptionalSpecAttr()
    this.updateOptionalSpec()
  },
  // 更新所选的规格
  updateOptionalSpec() {
    const goodsDetail = this.data.goodsDetail
    const selectGoodsSku = this.data.selectGoodsSku
    const skuList = this.data.goodsDetail.skuList
    const selectSpecs = this.data.selectSpecs
    let selectSkuId = 0
    if (this.data.selectReady) {
      let matchSku = null
      for (let i = 0; i < skuList.length; i++) {
        const sku = skuList[i]
        const specs = JSON.parse(sku.specs)
        const match = true
        for (let j = 0; j < specs.length; j++) {
          const skuSpec = specs[j]
          if (selectSpecs[skuSpec.keyId] !== skuSpec.valueId) {
            match = false
          }
        }
        if (match) {
          matchSku = sku
        }
      }
      selectGoodsSku.picture = matchSku.picture
      selectGoodsSku.price = matchSku.price
      selectSkuId = matchSku.id
    } else {
      selectGoodsSku.picture = goodsDetail.picture
      selectGoodsSku.price = goodsDetail.price
    }
    this.setData({
      selectGoodsSku: selectGoodsSku,
      selectSkuId: selectSkuId
    })
  },
  // 无库存的选项置灰
  updateOptionalSpecAttr() {
    const selectSpecs = this.data.selectSpecs
    // 提取匹配的SKU
    const matchSkuList = []
    const skuList = this.data.goodsDetail.skuList
    for (let i = 0; i < skuList.length; i++) {
      const sku = skuList[i]
      const specs = JSON.parse(sku.specs)
      let match = true
      if (sku.stock <= 0) {
        match = false
      }
      for (let j = 0; j < specs.length; j++) {
        const skuSpec = specs[j]
        if (selectSpecs[skuSpec.keyId] === 0) {
          continue
        }
        if (selectSpecs[skuSpec.keyId] !== skuSpec.valueId) {
          match = false
        }
      }
      if (sku.stock <= 0) {
        match = false
      }
      if (match) {
        matchSkuList.push(sku)
      }
    }
    // 计算选项的状态
    const selectSpecAttr = this.data.selectSpecAttr
    for (let i in selectSpecAttr) {
      selectSpecAttr[i] = false
    }
    for (let i = 0; i < matchSkuList.length; i++) {
      const specs = JSON.parse(matchSkuList[i].specs)
      for (let j = 0; j < specs.length; j++) {
        const key = specs[j].keyId + '-' + specs[j].valueId
        selectSpecAttr[key] = true
      }
    }
    this.setData({
      selectSpecAttr: selectSpecAttr
    })
  },
  // 加载优惠券
  async loadCouponList() {
    const data = await coupon.getCouponList(1, 2)
    const {error_code, msg} = data
    if (error_code !== undefined) {
      console.log(msg)
      this.setData({
        coupons: []
      })
      return
    }
    this.setData({
      coupons: data.list
    })
  },
  async loadCartGoodsNum() {
    const res = await cart.getCartGoodsNum()
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      cartNum: res.num
    })
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
  async addShopCar() {
    if (!this.checkUserLogin()) {
      return
    }
    this.setData({
      hideShopPopup: false,
      operationType: 1
    })
  },
  async toAddShopCar() {
    if (this.checkGoodsSelectAndStock()) {
      const res = await cart.addCart(parseInt(this.data.goodsId, 10), this.data.selectSkuId, this.data.buyNum)
      const { error_code, msg } = res
      if (error_code !== undefined) {
        console.log(msg)
        return
      }
      wx.showToast({
        title: '添加成功'
      })
      this.closePopupTap()
      this.loadCartGoodsNum()
    }
  },
  buyNow: function(e) {
    if (!this.checkUserLogin()) {
      return
    }
    this.setData({
      hideShopPopup: false,
      operationType: 2
    })
  },
  toBuyNow () {
    if (this.checkGoodsSelectAndStock()) {
      const curSkuId = this.data.selectSkuId
      const goodsDetail = this.data.goodsDetail
      const skuList = goodsDetail.skuList
      let skuInst = {}
      let specs = ''
      for (let i = 0; i < skuList.length; i++) {
        const sku = skuList[i]
        if (sku.id === curSkuId) {
          const specList = JSON.parse(sku.specs)
          
          for (let j = 0; j < specList.length; j++) {
            const spec = specList[j]
            specs += spec.value + '; '
          }
          if (specs.length < 2) {
            continue
          }
          specs = specs.substring(0, specs.length - 2)
          skuInst = sku
        }
      }
      const goodsInfo = {
        goodsId: goodsDetail.id,
        skuId: skuInst.id,
        title: goodsDetail.title,
        price: skuInst.price,
        picture: skuInst.picture,
        specs: specs,
        num: this.data.buyNum
      }
      // 直接购买，通过缓存传递
      wx.setStorageSync("goods", [goodsInfo])
      wx.navigateTo({
        url: '/pages/settlement/index'
      })
    }
  },
  // 检查选择规格的状态和库存
  checkGoodsSelectAndStock () {
    if (this.data.outofStockStatus) {
      return
    }
    if (!this.data.selectReady) {
      wx.showToast({
        title: this.data.selectGoodsSku.stockName,
        icon: 'none'
      })
      return false
    }
    return true
  },
  doAdd() {
    if (this.data.outofStockStatus) {
      return
    }
    let buyNum = this.data.buyNum
    if (buyNum >= 99) {
      wx.showToast({
        title: '不能超过99件',
        icon: 'none'
      })
      return
    }
    this.setData({
      buyNum: buyNum + 1
    })
  },
  doReduce() {
    if (this.data.outofStockStatus) {
      return
    }
    let buyNum = this.data.buyNum
    if (buyNum <= 1) {
      return
    }
    this.setData({
      buyNum: buyNum - 1
    })
  },
  closePopupTap() {
    this.setData({
      hideShopPopup: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: this.data.goodsDetail.title,
      path: `/pages/goods-details/index?id=${this.data.goodsId}`
    }
  },
  // 检查用户登录
  checkUserLogin() {
    const userInfo = wx.getStorageSync('user')
    if (userInfo.avatar === '') {
      wx.showToast({
        icon: 'none',
        title: '您暂未登录，请先登录',
      })
      return false
    }
    return true
  }
})