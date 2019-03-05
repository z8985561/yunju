var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), o = t.requirejs("biz/diyform"), i = t.requirejs("jquery"), s = t.requirejs("wxParse/wxParse");
Page({
  data: {
    icons: t.requirejs("icons"),
    goods:[],
    rules:"",
  },

  get_detail: function (options) {
    var t = this;
    e.get("groups/goods/get_detail", { id: options.id }, function (a) {
      s.wxParse("wxParseData", "html", a.goods.content, t, "5"),
        t.setData({
          goods: a.goods
        })
    })
  },
  get_rules: function () {
    var t = this;
    e.get("groups/goods/get_rules", {}, function (a) {
      console.log(a);
      s.wxParse("ruleData", "html", a.set.rules, t, "5")
    })
  },
  goodsCheckSingle: function (options) {
    var a = this,
      goodsid = a.data.goods.id,
      type = 'single';
    e.get("groups/goods/goodsCheck", { id: goodsid, type: 'single' }, function (data) {
      console.log(data);
      if (data.status == 1) {
        wx.navigateTo({
          url: "/application/pages/groups/orders/confirm?id=" + goodsid + "&type=single&heads=0"
        })
      }else{
        e.alert(data.result.message);
      }
    })
  },
  onLoad: function (options) {
    var a = this;
    console.log(options);
    a.get_detail(options);
    a.get_rules();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
  
  },
})