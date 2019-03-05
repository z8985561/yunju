var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    approot: t.globalData.approot
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    var sid=options.sid;
    var orderid=options.orderid;
    var ident=options.ident;
    t.setData({
      sid:sid,
      orderid:orderid,
      ident:ident
    })
    a.get('sale/coupon/share/enjoy',{'sid':sid,'orderid':orderid,'ident':ident},function(res){
      if(res.error==0){
        t.setData({
          newCoupon: res.newCoupon,
          firendlist: res.firendlist,
          credittext:res.credittext
        })
      }

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
  jumptocoupon: function () {
    wx.redirectTo({
      url: '/pages/sale/coupon/my/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var userinfo = t.getCache("userinfo");
    var that = this;
    var shareMessage = a.onShareAppMessage();
    var sid = that.data.sid;
    var ident = that.data.ident;
    var orderid = that.data.orderid;
    var path = "/pages/sale/coupon/shareCoupon/index?sid=" + sid + "&ident=" + ident+"&shareopenid="+ userinfo.openid;
    return {
      'title': shareMessage.title,
      'path': path,
      success: function (e) {
        wx.redirectTo({
          url: '/pages/sale/coupon/enjoy/index?sid=' + sid + "&ident=" + ident + "&orderid=" + orderid,
        })
      }
    }
  }
})