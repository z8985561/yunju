var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("biz/order");
Page({
  data: {
    icons: t.requirejs("icons"),
    status: 0,
    list: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0
  },
  onLoad: function(a) {
    this.setData({
        options: a,
        status: a.status || 0
      }),
      this.get_list()
  },
  get_list: function() {
    var t = this;
    t.setData({
        loading: !0
      }),
      a.get("groups/orders/get_list", {
        page: t.data.page,
        status: t.data.status,
        merchid: 0
      }, function(e) {
        console.log(e);
        1 == e.status ? (t.setData({
          loading: !1,
          show: !0,
          total: e.result.total,
          empty: !0
        }), e.result.list.length > 0 && t.setData({
          page: t.data.page + 1,
          list: t.data.list.concat(e.result.list)
        }), e.result.list.length < e.pagesize && t.setData({
          loaded: !0
        })) : a.toast("出错了", "loading")
      }, this.data.show)
  },
  selected: function(t) {
    var e = a.data(t).type;
    this.setData({
        list: [],
        page: 1,
        status: e,
        empty: !1
      }),
      this.get_list()
  },
  onReachBottom: function() {
    console.log(this.data.loaded);
    console.log(this.data.list.length);
    console.log(this.data.total);
    this.data.loaded || this.data.list.length == this.data.total || this.get_list()
  },
  code: function(t) {
    var e = this,
      s = a.data(t).orderid;
    a.post("verify/qrcode", {
      id: s
    }, function(t) {
      0 == t.error ? e.setData({
        code: !0,
        qrcode: t.url
      }) : a.alert(t.message)
    }, !0)
  },
  close: function() {
    this.setData({
      code: !1
    })
  },
  cancel: function(t) {
    var i = this,
      s = a.data(t).orderid,
      n = i.data.cancel[t.detail.value],
      url = "/application/pages/groups/orders/index?status=" + this.data.status;
    a.post("/groups/orders/cancel", {
        id: s,
        remark: n
      },
      function(r) {
        console.log(r);
        0 == r.error && i.url(url)
      }, !0)
    wx.reLaunch({
      url: '/application/pages/groups/orders/index',
    })
  },
  delete: function(t) {
    var s = a.data(t).type,
      i = a.data(t).orderid;
    a.get('/groups/orders/delete', {
      id: i
    }, function(t) {
      a.alert(t.message);

    })
  },
  finish: function(t) {
    var s = (a.data(t).type, a.data(t).orderid);
    a.get('/groups/orders/finish', {
      id: s
    }, function(t) {
      a.alert(t.message);
      if (t.error == 0) {
        wx.redirectTo({
          url: 'application/pages/groups/orders/index',
        })
      }
    })
  },
  onShareAppMessage: function() {
    return a.onShareAppMessage()
  }
})