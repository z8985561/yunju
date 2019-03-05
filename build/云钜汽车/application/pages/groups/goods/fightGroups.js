var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");
Page({
  data: {
    icons: t.requirejs("icons"),
    teams: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0
  },
  onLoad: function (options) {
    var t = this;
    t.setData({
      options: options
    }),
      t.get_list();
  },

  get_list: function () {
    var t = this;
    a.get("groups/goods/fightGroups", t.data.options, function (e) {
      console.log(e.goods);
      t.setData({
        goods:e.goods,
        teams:e.teams,
        empty: !0
      })
    })
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