var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui");
Page({
  data: {
    icons: t.requirejs("icons"),
    success: 0,
    successData: {}

  },
  onLoad: function (e) {
    this.setData({
      options: e
    }),
      console.log(this);
      t.url(e)
  },
  onShow: function () {
    console.log(this);
    this.get_list()
  },
  get_list: function () {
    var t = this;
    e.get("groups/pay/main", t.data.options, function (i) {
      console.log(i);
      if (50018 == i.error)
        return void wx.navigateTo({
          url: "/pages/order/detail/index?id=" + t.data.options.id
        });
      !i.wechat.success && "0.00" != i.order.price && i.wechat.payinfo && e.alert(i.wechat.payinfo.message + "\n不能使用微信支付!"),
        t.setData({
          list: i,
          show: !0
        })
    })
  },
  pay: function (t) {
    var i = e.pdata(t).type,
      o = this,
      a = this.data.list.wechat;
    "wechat" == i ? e.pay(a.payinfo, function (t) {
      "requestPayment:ok" == t.errMsg && o.complete(i)
    }) : "credit" == i ? e.confirm("确认要支付吗?", function () {
      o.complete(i)
    }, function () { }) : "cash" == i ? e.confirm("确认要使用货到付款吗?", function () {
      o.complete(i)
    }, function () { }) : o.complete(i)
  },
  complete: function (t) {
    var o = this;
    e.post("/groups/pay/complete", {
      orderid: o.data.options.orderid,
      teamid:o.data.options.teamid,
      isteam: o.data.options.isteam,
      type: t
    }, function (t) {
      if (0 == t.error)
        return wx.setNavigationBarTitle({
          title: "支付成功"
        }),
        o.setData({
          success: 1,
          successData: t
        });
        
      i.toast(o, t.result.message),wx.navigateTo({
        url: '/application/pages/groups/orders/index'
      })
    }, !0, !0)
  },
  shop: function (t) {
    0 == e.pdata(t).id ? this.setData({
      shop: 1
    }) : this.setData({
      shop: 0
    })
  },
  phone: function (t) {
    e.phone(t)
  },
  //cc_zhong 全付通支付
  swiftpay: function (t) {
    var t = this;
    e.get("changce/swift/dopay", t.data.options, function (a) {
      if (!a.token) {
        return void e.alert(a.message);
        //return void wx.navigateBack();
      } else {
        var result = JSON.parse(a.pay_info);
        wx.requestPayment({
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success': function (res) {
            //t.complete('swift');
            wx.showModal({
              title: '支付成功',
              content: '如订单状态未变更，可耐心等待片刻！',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                return void wx.navigateTo({
                  url: "/pages/order/detail/index?id=" + t.data.options.id
                });
              }
            })
          },
          'fail': function (res) {
            e.alert('支付失败！');
          }
        })
      }
    })
  }
})
