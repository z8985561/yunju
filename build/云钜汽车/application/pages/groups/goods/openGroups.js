var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), o = t.requirejs("biz/diyform"), i = t.requirejs("jquery"), s = t.requirejs("wxParse/wxParse");
Page({
  data: {
    icons: t.requirejs("icons"),
    goods:[],
    teams:[]
  },

  openGroups: function (options) {
    var t = this;
    console.log(options);
    e.get("groups/goods/openGroups", { id: options.id }, function (a) {
      console.log(a);
      s.wxParse("wxParseData", "html", a.goods.content, t, "5"),
        t.setData({
          goods: a.goods,
          teams:a.teams
        })
    })
  },

  goodsCheckGroups:function(options){
    var a = this,
    goodsid=a.data.goods.id,
    type = 'groups';
    e.get("groups/goods/goodsCheck", { id: goodsid, type: 'groups'},function(data){
    if(data.status==1){
      wx.navigateTo({
        url: "/application/pages/groups/orders/confirm?id=" +goodsid + "&type=groups&heads=1"
      })

    }
    })
  },
  
  onLoad: function (options) {
    var t = this;
    t.openGroups(options);
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