// pages/details/cart-item/cart-item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    tips:{//头部提示
      lowestQuotation: "36.58",
      city: "广东省佛山市",
    },
    cart:{
      id:1,
      imgUrl:"https://qiche.kemanduo.cc/attachment//car_show_image/A/奥迪/一汽-大众奥迪/奥迪A6L.jpg",
      title:"2019 款 E 200L",
      oldPrice:"43.58",
      floorPrice:"36.98"
    },
    merchantList:[
      {
        name:"4S 锦星行",
        adress:"广州市天河区科林路18号（广电运通对面）",
        price:"37.38",//价格
        preferential:"6.20",//直降
        distance:"4.6",//距离
        salesArea:"售本省"//销售区域
      },
      {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }, {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      },{
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }, {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }
    ]
  },
  onTabble(e){
    this.setData({
      active: e.currentTarget.dataset.active
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})