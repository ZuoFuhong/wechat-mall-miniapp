Page({
  data: {
    orderList: [
      {
        id: 1,
        orderNo: '234238090984',
        goodsNum: 4,
        payAmount: '139.80',
        goodsList: [
          {
            goodsId: 1,
            picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
            title: '北欧简约立式台灯北欧简约立式',
            specs: '3m;黑色;可调节',
            price: '289',
            num: 1
          },
          {
            goodsId: 1,
            picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
            title: '北欧简约立式台灯北欧简约立式',
            specs: '3m;黑色;可调节',
            price: '289',
            num: 1
          }
        ]
      },
      {
        id: 1,
        orderNo: '234238090984',
        goodsNum: 4,
        payAmount: '139.80',
        goodsList: [
          {
            goodsId: 1,
            picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
            title: '北欧简约立式台灯北欧简约立式',
            specs: '3m;黑色;可调节',
            price: '289',
            num: 1
          },
          {
            goodsId: 1,
            picture: 'https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png',
            title: '北欧简约立式台灯北欧简约立式',
            specs: '3m;黑色;可调节',
            price: '289',
            num: 1
          }
        ]
      }
    ]
  },
  onLoad(res) {
    // 查询全部：{status: "undefined"}
    console.log(res)
  },
  orderPay(e) {
    console.log(e.currentTarget.dataset.orderno)
  },
  deleteOrder(e) {
    console.log(e.currentTarget.dataset.orderno)
  }
})