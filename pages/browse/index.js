Page({
  data: {
    editStatus: false,
    list: [
      {
        date: '02月15日',
        goodsList: [
          {
            id: 277082,
            name: '兔毛马甲',
            picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
            price: 10000.99,
            saleNum: 10
          }
        ]
      },
      {
        date: '02月11日',
        goodsList: [
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
          }
        ]
      }
    ]
  },
  onLoad() {
  },
  close() {
    this.setData({
      editStatus: false
    })
  },
  edit() {
    this.setData({
      editStatus: true
    })
  }
})