import address from '../../../models/address'

Page({
  data: {
    addressId: 0,
    region: ['湖北省', '武汉市', '新洲区'],
    customItem: '全部',
    addressDetail: {
      id: 0,
      contacts: '',
      mobile: '',
      address: '',
      provinceStr: '湖北省',
      provinceId: '420000',
      cityStr: '武汉市',
      cityId: '420100',
      areaStr: '新洲区',
      areaId: '420115',
      isDefault: 0
    },
  },
  onLoad(res) {
    this.setData({
      addressId: res.id
    })
  },
  onShow() {
    this.loadAddress()
  },
  bindRegionChange(e) {
    const addressDetail = this.data.addressDetail
    addressDetail.provinceStr = e.detail.value[0]
    addressDetail.cityStr = e.detail.value[1]
    addressDetail.areaStr = e.detail.value[2]
    addressDetail.provinceId = e.detail.code[0]
    addressDetail.cityId = e.detail.code[1]
    addressDetail.areaId = e.detail.code[2]
    this.setData({
      region: e.detail.value
    })
  },
  async saveAddress() {
    const addressDetail = this.data.addressDetail
    if (addressDetail.contacts === '') {
      wx.showToast({
        icon: 'none',
        title: '请填写收件人！'
      })
      return
    }
    if (addressDetail.mobile === '') {
      wx.showToast({
        icon: 'none',
        title: '请填写联系电话！'
      })
      return
    }
    const reg = new RegExp(/^1[358]\d{9}$/)
    if (!reg.test(addressDetail.mobile)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确手机号'
      })
      return
    }
    if (addressDetail.address === '') {
      wx.showToast({
        icon: 'none',
        title: '请填写详细地址！'
      })
      return
    }
    if (addressDetail.provinceId === undefined || addressDetail.cityId === undefined || addressDetail.areaId === undefined) {
      wx.showToast({
        icon: 'none',
        title: '请选择地区！'
      })
      return
    }
    const res = await address.editAddress(addressDetail)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    wx.showToast({
      title: '保存成功'
    })
    wx.navigateBack()
  },
  async loadAddress() {
    const res = await address.getAddressById(this.data.addressId)
    const { error_code, msg } = res
    if (error_code !== undefined) {
      console.log(msg)
      return
    }
    this.setData({
      addressDetail: res,
      region: [res.provinceStr, res.cityStr, res.areaStr]
    })
  },
  bindContacts(e) {
    const addressDetail = this.data.addressDetail
    addressDetail.contacts = e.detail.value
    this.setData({
      addressDetail: addressDetail
    })
  },
  bindMobile(e) {
    const addressDetail = this.data.addressDetail
    addressDetail.mobile = e.detail.value
    this.setData({
      addressDetail: addressDetail
    })
  },
  bindAddress(e) {
    const addressDetail = this.data.addressDetail
    addressDetail.address = e.detail.value
    this.setData({
      addressDetail: addressDetail
    })
  },
})