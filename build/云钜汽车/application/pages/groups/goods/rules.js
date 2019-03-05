var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), o = t.requirejs("biz/diyform"), i = t.requirejs("jquery"), s = t.requirejs("wxParse/wxParse");
Page({
  data: {
    rules:[]
  },

  get_rules: function () {
    var t = this;
    e.get("groups/goods/get_rules",{}, function (a) {
      console.log(a);
      s.wxParse("wxParseData", "html", a.set.rules, t, "5")
      t.setData({
        rules: a.set
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var t = this;
    t.get_rules();
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})