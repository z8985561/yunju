// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    productItem:{},
    show: false,
    carTypeList: [{
      name: '2019款 180Turbo 手动舒适版',
      imgUrls: ['/img/car-2.jpg', '/img/car-1.jpg', '/img/car-3.jpg']
    }, {
      name: '2019款 180Turbo CVT舒适版',
      imgUrls: ['/img/car-3.jpg', '/img/car-1.jpg', '/img/car-2.jpg']
    }, {
      name: '2019款 180Turbo CVT豪华版',
      imgUrls: ['/img/car-1.jpg', '/img/car-3.jpg', '/img/car-2.jpg']
    }, {
      name: '2019款 180Turbo CVT领先版',
      imgUrls: ['/img/car-2.jpg', '/img/car-1.jpg', '/img/car-3.jpg']
    }, {
      name: '2019款 180Turbo CVT旗舰版',
      imgUrls: ['/img/car-2.jpg', '/img/car-1.jpg', '/img/car-3.jpg']
    }]
  },
  toggleActionSheet() {
    this.setData({
      show: !this.data.show
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    //console.log(event.detail);
    this.setData({
      show: false,
      productItem: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productItem: this.data.carTypeList[0]
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

  }
})