Page({
  data: {
    goodsList: [
      {
        goodsId: 1,
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        title: '百搭短袖T恤 百搭短袖',
        specs: '黑色；圆领款；M(165)',
        price: '239',
        num: 1
      },
      {
        goodsId: 1,
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        title: '百搭短袖T恤 百搭短袖',
        specs: '黑色；圆领款；M(165)',
        price: '239',
        num: 1
      },
      {
        goodsId: 1,
        picture: 'https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg',
        title: '百搭短袖T恤 百搭短袖',
        specs: '黑色；圆领款；M(165)',
        price: '239',
        num: 1
      }
    ]
  },
  onLoad() {
    
  },
  goCategory() {
    wx.reLaunch({
      url: "/pages/category/category"
    });
  }
})