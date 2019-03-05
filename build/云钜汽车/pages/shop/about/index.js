var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreinfo();
    this.getAboutus();
  },

  getAboutus:function(){
    var t=this;
    a.get('shop/get_aboutus',{},function(res){
        if(res.error==0){
          e.wxParse("htmlcontent", "html",res.content, t, "5")
        }

    })
  },
  getStoreinfo:function(){
    var t = this;
    a.get('shop/getStoreinfo', {}, function (res) {
      if (res.error == 0) {
        t.setData({
          store:res.store
        })
      }
    })

  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var a = t.getCache("sysset");
    var that =this;
    that.setData({
      shoplogo: a.shoplogo
    })
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