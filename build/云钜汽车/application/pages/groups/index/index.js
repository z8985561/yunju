var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    icons: t.requirejs("icons"),
  },

  onLoad: function (a) {
    t.url(a)
  },
  onShow: function () {
    var a = t.getCache("sysset");
    wx.setNavigationBarTitle({
      title: a.shopname || "团购首页"
    }),
      this.getGroups()
  },

  onReady: function () {
  
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
  
  },
  getGroups: function () {
    var t = this;
    a.get("groups/index/get_groupsindex", {}, function (a) {
      e.wxParse("wxParseData", "html", a.copyright, t, "5"),
        t.setData({
          shop: a
        })
    })
  },
})