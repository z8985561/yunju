function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
// pages/offered/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checked: false,
    cartInfo: {
      startTime: "2019-2-26 00:00:00", //开团时间
      endTime: "2019-2-28 00:00:00",
      duration: 3, //开团时间3天
      imgUrl: "/img/car-1.jpg",
      cartName: "本田凌派",
      floorPrice: "10.00", //最低假
      topPrice: "25.00", //最高价
      url: "/pages/offered/detail", //地址
      subsidy: "2000", //补贴
      peopleNum: 1115
    },
    time: {
      days: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  // 倒计时函数
  countDown: function(endTime) {
    var that = this;
    var timeDiff = new Date(endTime).getTime() - new Date().getTime() ;
    if (timeDiff > 0) {
      var timeJson = {
        days: checkTime(parseInt(timeDiff / 1000 / 60 / 60 / 24, 10)),
        hour: checkTime(parseInt(timeDiff / 1000 / 60 / 60 % 24, 10)),
        minute: checkTime(parseInt(timeDiff / 1000 / 60 % 60, 10)),
        second: checkTime(parseInt(timeDiff / 1000 % 60, 10))
      }
      that.setData({
        time: timeJson
      })
      setTimeout(() => {
        that.countDown(that.data.cartInfo.endTime)
      }, 1000)
    } else {
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.countDown(this.data.cartInfo.endTime)
  },
  showOfferd() {
    this.setData({
      show: true
    })
  },
  consulting() {
    wx.makePhoneCall({
      phoneNumber: '020-8888888',
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onChange(e) {
    this.setData({
      checked: e.detail
    });
  },
  submitForm() {
    wx.reLaunch({
      url: '/pages/offered/success'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPageScroll:function(){
    return;
  }
})