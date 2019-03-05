// pages/offered/offered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:0,
    //全部参团汽车列表
    allCartList:[
      {
        startTime: "2019-2-26 00:00:00", //开团时间
        endTime: "2019-2-28 00:00:00",
        duration: 3, //开团时间3天
        imgUrl: "/img/car-1.jpg",
        cartName: "本田INSPIRE1111",
        floorPrice: "10.00", //最低假
        topPrice: "25.00", //最高价
        url: "/pages/offered/detail", //地址
        subsidy: "2000", //补贴
        peopleNum: 102
      },
      {
        startTime: "2019-2-26 00:00:00", //开团时间
        endTime: "2019-3-1 00:00:00",
        duration: 3, //开团时间3天
        imgUrl: "/img/car-1.jpg",
        cartName: "本田INSPIRE2222",
        floorPrice: "10.00", //最低假
        topPrice: "25.00", //最高价
        url: "/pages/offered/detail", //地址
        subsidy: "2000", //补贴
        peopleNum: 102
      },
      {
        startTime: "2019-2-26 00:00:00", //开团时间
        endTime: "2019-2-28 11:00:00",
        duration: 3, //开团时间3天
        imgUrl: "/img/car-1.jpg",
        cartName: "本田INSPIRE3333",
        floorPrice: "10.00", //最低假
        topPrice: "25.00", //最高价
        url: "/pages/offered/detail", //地址
        subsidy: "", //补贴
        peopleNum: 102
      },
      {
        startTime: "2019-2-26 00:00:00", //开团时间
        endTime: "2019-2-28 13:00:00",
        duration: 3, //开团时间3天
        imgUrl: "/img/car-1.jpg",
        cartName: "本田INSPIRE4444",
        floorPrice: "10.00", //最低假
        topPrice: "25.00", //最高价
        url: "/pages/offered/detail", //地址
        subsidy: "2000", //补贴
        peopleNum: 102
      },
      {
        startTime: "2019-2-26 00:00:00", //开团时间
        endTime: "2019-2-28 20:00:00",
        duration: 3, //开团时间3天
        imgUrl: "/img/car-1.jpg",
        cartName: "本田INSPIRE5555",
        floorPrice: "10.00", //最低假
        topPrice: "25.00", //最高价
        url: "/pages/offered/detail", //地址
        subsidy: "", //补贴
        peopleNum: 102
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight:res.windowHeight - 130
        })
      },
    })
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