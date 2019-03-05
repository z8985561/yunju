var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");;
Page({
  data: {
    merchid: 0,
    merch: [],
    cateid: 0,
    page: 1,
    isnew:0,
    isrecommand:0,
    loading: false,
    loaded: false,
    list: [],
    approot: t.globalData.approot
  },
  onLoad: function (t) {
    console.log(t);
    this.setData({
      merchid: t.id
    }),
      this.getMerch(),
      this.getList()
  },
  getMerch: function () {
    var t = this;
    console.log(t.data.merchid);
    a.get("changce/merch/get_detail", { id: t.data.merchid}, function (a) {
      t.setData({
        merch: a.merch
      })
      wx.setNavigationBarTitle({
        title: a.merch.merchname
      })

    })
  },
  getList: function () {
    var t = this;
    console.log(this.data);
    a.loading(),
      this.setData({
        loading: true
      }),
      a.get("changce/merch/goods_list", {
        page: this.data.page,
        cateid: this.data.cateid,
        id: t.data.merchid,
        isnew: this.data.isnew,
        isrecommand: this.data.isrecommand,
      }, function (e) {
        var i = {
          loading: false,
          total: e.total,
          pagesize: e.pagesize
        };
        e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (i.loaded = true), t.setSpeed(e.list)),
          t.setData(i),
          a.hideLoading()
      })
  },
  clickrec: function () {
    this.setData({
      isrecommand: 1,
      isnew: 0,
      page:1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  clicknew: function () {
    this.setData({
      isrecommand: 0,
      isnew: 1,
      page: 1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  clickall: function () {
    this.setData({
      isrecommand: 0,
      isnew: 0,
      page: 1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  setSpeed: function (t) {
    if (t && !(t.length < 1))
      for (var a in t) {
        var e = t[a];
        if (!isNaN(e.lastratio)) {
          var i = e.lastratio / 100 * 2.5,
            s = wx.createContext();
          s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("rgba(0,0,0,0.2)"),
            s.setLineWidth(4),
            s.stroke(),
            s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("#ffffff"),
            s.setLineWidth(4),
            s.setLineCap("round"),
            s.stroke();
          var o = "coupon-" + e.id;
          wx.drawCanvas({
            canvasId: o,
            actions: s.getActions()
          })
        }
      }
  },
  bindTab: function (t) {
    var e = a.pdata(t).cateid;
    this.setData({
      cateid: e,
      page: 1,
      list: []
    }),
      this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    })
  },
  onShareAppMessage: function () {
    var that = this;
    var appmessage = a.onShareAppMessage("pages/changce/merch/detail?id=" + that.data.merchid);
   
    return {
      title: that.data.merch.merchname,
      desc:"",
      path:appmessage.path,
      success: function (a) { },
      fail: function (a) { }
    }
  },
  imgTap: function (e) {
    var that = this;
    var nowImgUrl = e.target.dataset.src;
    var wxcode = new Array(nowImgUrl);
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: wxcode // 需要预览的图片http链接列表
    })
  },
})