// pages/insurance/insurance-form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    actions: [{
      name: '不投'
    }, {
      name: '5万'
    }, {
      name: '10万'
    }, {
      name: '20万'
    }, {
      name: '30万'
    }, {
      name: '50万'
    }, {
      name: '100万'
    }]
  },
  onChange(e) {
    console.log(e)
    this.setData({
      checked: !this.data.checked
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onSelect(e) {
    console.log(e.detail);
    this.setData({
      show: false
    });
  },
  showSheet() {
    this.setData({
      show: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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