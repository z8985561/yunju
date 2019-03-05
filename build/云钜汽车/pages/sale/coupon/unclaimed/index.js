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
    var orderid =options.orderid;
    a.get('sale/coupon/share/unclaimed',{'sid':sid,'orderid':orderid},function(res){
      if(res.error==0){
        t.setData({
          ident:res.ident,
          num:res.num,
          sid:res.sid,
          orderid:res.orderid
        })
      }else{
        if(res.status==-1){
          wx.redirectTo({
            url: '/pages/sale/coupon/sharePage/index?shareident='+res.message.shareident+"&close="+res.messsage.close
          })
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     var that= this;
     var userinfo = t.getCache("userinfo");
     var shareMessage = a.onShareAppMessage();
     var sid = that.data.sid;
     var ident = that.data.ident;
     var orderid = that.data.orderid ;
     var paths = "/pages/sale/coupon/shareCoupon/index?sid=" + sid+"&ident="+ident+"&shareopenid="+userinfo.openid;
    return {
       'title': shareMessage.title,
       'path': paths,
        success:function(e){
          wx.redirectTo({
            url: '/pages/sale/coupon/enjoy/index?sid='+sid+"&ident="+ident+"&orderid="+orderid,
          })
        }
     }
  }
})