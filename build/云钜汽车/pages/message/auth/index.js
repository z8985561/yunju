var t = getApp();

Page({
  data: {},
  onLoad: function (t) {
    console.log(t), this.setData({
      close: t.close,
      text: t.text
    });
  },
  onShow: function () {
    var e = t.getCache("sysset").shopname;
    wx.setNavigationBarTitle({
      title: e || "提示"
    });
  },
  bind: function () {
    var t = this, e = setInterval(function () {
      wx.getSetting({
        success: function (n) {
          var a = n.authSetting["scope.userInfo"];
          a && (wx.reLaunch({
            url: "/pages/index/index"
          }), clearInterval(e), t.setData({
            userInfo: a
          }));
        }
      });
    }, 1e3);
  }
});