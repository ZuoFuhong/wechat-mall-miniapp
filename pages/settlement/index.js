import coupon from '../../models/coupon'
import address from '../../models/address'

Page({
  data: {
    curPage: 0,
    pageSize: 10,
    hasMoreCoupon: true,
    address: {},  // 收货地址
    goodsList: [],
    couponList: [], // 优惠券
    selectedCoupon: {}, // 使用的优惠券
    amount: 0  // 结算金额
  },
  async onLoad() {
    this.setData({
      curPage: 0
    })
    this.loadCouponList()
    this.loadDefaultAddress()
    this.setData({
      goodsList: wx.getStorageSync("goods")
    })
  },
  onShow() {
    this.calcOrderAmount()
  },
  // 加载默认收货地址
  async loadDefaultAddress() {
    const res = await address.getDefaultAddress()
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      address: res
    })
  },
  // 加载优惠券列表
  async loadCouponList() { 
    const curPage = this.data.curPage + 1
    const res = await coupon.getUserCouponList(0, curPage, this.data.pageSize)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    const coupons = []
    for (let i = 0; i < res.list.length; i++) {
      const couponDO = res.list[i]
      // 券类型：1-满减券 2-折扣券 3-代金券 4-满金额折扣券
      let title
      switch(couponDO.type) {
        case 1:
          title = '满' + parseFloat(couponDO.fullMoney, 10) + '减' + parseFloat(couponDO.minus, 10)
          break;
        case 2:
          title = couponDO.rate * 10 + '折券'
          break;
        case 3:
          title = parseFloat(couponDO.minus, 10) + '元代金券'
          break;
        case 4:
          title = '满' + parseFloat(couponDO.fullMoney, 10) + '享' + couponDO.rate * 10 + '折'
          break;
        default:
          title = ''
      }
      const startDateArr = couponDO.startTime.split(' ')[0].split('-')
      const endDateArr = couponDO.endTime.split(' ')[0].split('-')
      coupons.push({
        cLogId: couponDO.CLogId,
        couponId: couponDO.couponId,
        title: title,
        type: couponDO.type,
        fullMoney: parseFloat(couponDO.fullMoney, 10),
        minus: parseFloat(couponDO.minus, 10),
        rate: parseFloat(couponDO.rate, 10),
        period: startDateArr[0] + '/' + startDateArr[1] + '/' + startDateArr[2] + '-' + endDateArr[0] + '/' + endDateArr[1] + '/' + endDateArr[2]
      })
    }
    let couponList = this.data.couponList
    if (curPage === 1) {
      couponList = coupons
    } else {
      couponList = couponList.concat(coupons)
    }
    this.setData({
      curPage: curPage,
      couponList: couponList,
      hasMoreCoupon: res.list.length === this.data.pageSize
    })
  },
  selectAddress(e) {
    const addressId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/option-address/index?id=' + addressId
    })
  },
  // 选择券
  selectCoupon(e) {
    let couponLogId = e.currentTarget.dataset.id
    let selectedCoupon = this.data.selectedCoupon

    if (couponLogId === selectedCoupon.cLogId) {
      selectedCoupon = {}
    } else {
      const couponList = this.data.couponList
      for (let i = 0; i < couponList.length; i++) {
        const coupon = couponList[i]
        if (coupon.cLogId === couponLogId) {
          selectedCoupon = coupon
          break
        }
      }
    }
    this.setData({
      selectedCoupon: selectedCoupon
    })
    this.calcOrderAmount()
  },
  // 计算结算的金额
  calcOrderAmount() {
    const goodsList = this.data.goodsList
    let amount = 0
    for (let i = 0; i < goodsList.length; i++) {
      const goods = goodsList[i]
      amount += goods.price * goods.num
    }
    const discountAmount = this.calcDiscountAmount(amount)
    amount = amount - discountAmount
    this.setData({
      amount: parseFloat(amount.toFixed(2), 10)
    })
  },
  // 计算优惠金额
  calcDiscountAmount(goodsAmount) {
    goodsAmount = parseFloat(goodsAmount.toFixed(2), 10)
    const selectedCoupon = this.data.selectedCoupon
    let discountAmount = 0
    if (selectedCoupon.cLogId !== undefined) {
      switch(selectedCoupon.type) {
        case 1:
          if (goodsAmount >= selectedCoupon.fullMoney) {
            discountAmount = selectedCoupon.minus
          }
          break;
        case 2:
          discountAmount = (goodsAmount - goodsAmount * selectedCoupon.rate).toFixed(2)
          break;
        case 3:
          discountAmount = selectedCoupon.minus
          break;
        case 4:
          if (goodsAmount >= selectedCoupon.fullMoney) {
            discountAmount = (goodsAmount - goodsAmount * selectedCoupon.rate).toFixed(2)
          }
          break;
        default:
          discountAmount = 0
      }
    }
    return parseFloat(discountAmount, 10)
  },
  submitOrder() {
    // todo: 此处暂时未处理运费
    console.log('提交订单')
  },
  scrolltolowerEvent() {
    if (!this.data.hasMoreCoupon) {
      return
    }
    this.loadCouponList()
  }
})