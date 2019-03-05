var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  data: {
    close:!1,
    approot: t.globalData.approot
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t =this;
    console.log(options);
    t.setData({
      shareopenid:options.shareopenid,
      sid:options.sid,
      ident:options.shareident
    })
    a.get("sale/coupon/share/sharePage",options,function(res){
      console.log(res);
        if(res.error==0){
          t.setData({
            close:res.close,
            newCoupon:res.newCoupon,
            num:res.num,
            firendlist:res.firendlist
          })
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  jumptoindex:function(){
      wx.redirectTo({
        url: '/pages/index/index',
      })
  },
  jumptocoupon: function () {
    wx.redirectTo({
      url: '/pages/sale/coupon/my/index/index',
    })
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
    var that=this;
    var shareMessage = a.onShareAppMessage();
    var sid = that.data.sid;
    var ident = that.data.ident;
    var shareopenid=that.data.shareopenid;
    var path = "/pages/sale/coupon/shareCoupon/index?sid=" + sid + "&ident=" + ident + "&shareopenid=" + shareopenid;
    return {
      'title': shareMessage.title,
      'path': path,

    }
  }
})